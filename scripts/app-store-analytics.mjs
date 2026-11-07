#!/usr/bin/env node
// Official App Store Connect API only. Credentials and report files stay local.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { sign, createHash } from "node:crypto";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const APP_ID = "6787742864";
const API = "https://api.appstoreconnect.apple.com";
const enable = process.argv.includes("--enable");
const unknown = process.argv.slice(2).filter((arg) => arg !== "--enable");
if (unknown.length) throw new Error("Only --enable is supported");
process.umask(0o077);

async function credentials() {
  const local = JSON.parse(await readFile(join(homedir(), ".config/reelclip-organic/app-store.json"), "utf8"));
  const source = await readFile(local.credentials_file, "utf8");
  const values = {};
  for (const line of source.split(/\r?\n/)) {
    const match = line.match(/^\s*(?:export\s+)?(ASC_KEY_ID|ASC_ISSUER_ID|ASC_KEY_PATH)\s*=\s*(.*?)\s*$/);
    if (!match) continue;
    let value = match[2];
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    values[match[1]] = value;
  }
  if (!values.ASC_KEY_ID || !values.ASC_ISSUER_ID || !values.ASC_KEY_PATH) throw new Error("Existing Apple API configuration is incomplete");
  // Parse literal assignments; never execute a shell credential file.
  const keyPath = values.ASC_KEY_PATH.replaceAll("${HOME}", homedir()).replaceAll("$HOME", homedir());
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const unsigned = encode({ alg: "ES256", kid: values.ASC_KEY_ID, typ: "JWT" }) + "." + encode({ iss: values.ASC_ISSUER_ID, iat: now, exp: now + 600, aud: "appstoreconnect-v1" });
  return unsigned + "." + sign("sha256", Buffer.from(unsigned), { key: await readFile(keyPath), dsaEncoding: "ieee-p1363" }).toString("base64url");
}

function apiUrl(path) {
  const url = new URL(path, API);
  if (url.origin !== API || !url.pathname.startsWith("/v1/")) throw new Error("Refusing an unexpected Apple API destination");
  return url;
}

async function request(token, path, body) {
  const url = apiUrl(path);
  if (body && (!enable || url.pathname !== "/v1/analyticsReportRequests")) throw new Error("Unapproved Apple API write");
  const response = await fetch(url, {
    method: body ? "POST" : "GET", redirect: "error", signal: AbortSignal.timeout(60000),
    headers: { Authorization: `Bearer ${token}`, ...(body ? { "Content-Type": "application/json" } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(`Apple API ${response.status}: ${data.errors?.map((item) => item.code).join(", ") || "request failed"}`);
  return data;
}

async function list(token, path) {
  const rows = [];
  for (let page = 0; path && page < 50; page++) {
    const data = await request(token, path);
    if (!Array.isArray(data.data)) throw new Error("Unexpected Apple list response");
    rows.push(...data.data);
    path = data.links?.next;
  }
  if (path) throw new Error("Apple pagination exceeded 50 pages; narrow the report window");
  return rows;
}

function checksum(bytes, expected) {
  if (!expected) throw new Error("Apple report segment has no checksum");
  const value = expected.trim();
  let algorithm, encoding;
  if (/^[a-f\d]{32}$/i.test(value)) { algorithm = "md5"; encoding = "hex"; }
  else if (/^[a-f\d]{64}$/i.test(value)) { algorithm = "sha256"; encoding = "hex"; }
  else if (/^[A-Za-z\d+/]+={0,2}$/.test(value)) {
    const length = Buffer.from(value, "base64").length;
    algorithm = length === 16 ? "md5" : length === 32 ? "sha256" : null;
    encoding = "base64";
  }
  if (!algorithm) throw new Error("Unsupported Apple report checksum format; inspect its documentation before processing");
  const actual = createHash(algorithm).update(bytes).digest(encoding);
  if (encoding === "hex" ? actual.toLowerCase() !== value.toLowerCase() : actual !== value) throw new Error("Apple report checksum mismatch");
}

async function downloadSegment(segment, folder) {
  const { url: address, checksum: expected, sizeInBytes } = segment.attributes;
  const stem = segment.id.replace(/[^a-z\d_.-]/gi, "_") + "-" + createHash("sha256").update(expected).digest("hex").slice(0, 16);
  for (const extension of [".tsv.gz", ".tsv"]) {
    const path = join(folder, stem + extension);
    try {
      const bytes = await readFile(path);
      if (Number(sizeInBytes) !== bytes.length) throw new Error("Cached Apple report size mismatch");
      checksum(bytes, expected);
      return { id: segment.id, file: path, bytes: bytes.length, verified: true, cached: true, sha256: createHash("sha256").update(bytes).digest("hex") };
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  const url = new URL(address);
  if (url.protocol !== "https:") throw new Error("Refusing an insecure report download");
  // Apple returns pre-signed storage URLs. Never forward an API token to storage.
  const response = await fetch(url, { redirect: "error", signal: AbortSignal.timeout(60000) });
  if (!response.ok) throw new Error(`Apple report download failed (${response.status})`);
  const chunks = [];
  let size = 0;
  for await (const chunk of response.body) {
    size += chunk.length;
    if (size > 100 * 1024 * 1024) throw new Error("Report segment exceeds the 100 MiB download limit");
    chunks.push(chunk);
  }
  const bytes = Buffer.concat(chunks);
  if (Number(sizeInBytes) !== bytes.length) throw new Error("Apple report size mismatch");
  checksum(bytes, expected);
  const gzip = bytes[0] === 0x1f && bytes[1] === 0x8b;
  const name = stem + (gzip ? ".tsv.gz" : ".tsv");
  const path = join(folder, name);
  await writeFile(path, bytes, { mode: 0o600 });
  return { id: segment.id, file: path, bytes: bytes.length, verified: true, sha256: createHash("sha256").update(bytes).digest("hex") };
}

const time = new Date();
const folder = join(ROOT, ".organic-runs", "apple", time.toISOString().replace(/[:.]/g, ""));
await mkdir(folder, { recursive: true, mode: 0o700 });
const cacheFolder = join(ROOT, ".organic-runs", "apple", "cache");
await mkdir(cacheFolder, { recursive: true, mode: 0o700 });
const manifest = { collected_at: time.toISOString(), app_id: APP_ID, status: "pending", reports: [], campaign_metrics: "unknown_until_reported" };
try {
  const token = await credentials();
  const app = (await request(token, `/v1/apps/${APP_ID}?fields[apps]=name,bundleId`)).data;
  if (app.attributes.bundleId !== "app.reelclip.ios") throw new Error("Apple API returned an unexpected app");
  manifest.app_name = app.attributes.name;
  let requests = await list(token, `/v1/apps/${APP_ID}/analyticsReportRequests?filter[accessType]=ONGOING`);
  let active = requests.find((item) => !item.attributes.stoppedDueToInactivity);
  if (!active && enable) {
    active = (await request(token, "/v1/analyticsReportRequests", { data: { type: "analyticsReportRequests", attributes: { accessType: "ONGOING" }, relationships: { app: { data: { type: "apps", id: APP_ID } } } } })).data;
    manifest.created_request = true;
  }
  if (!active) throw new Error("No active ongoing analytics request. Run this collector once with --enable to create it");
  manifest.request_id = active.id;
  manifest.ongoing = true;
  const reports = await list(token, `/v1/analyticsReportRequests/${encodeURIComponent(active.id)}/reports`);
  manifest.available_reports = reports.map(({ id, attributes }) => ({ id, ...attributes }));
  const selected = reports.filter(({ attributes: { name } }) => /^App (?:Store )?Downloads (?:Standard|Detailed)$|^App Store (?:Purchases|Discovery and Engagement) (?:Standard|Detailed)$|^App Store Subscription (?:Event|State) Report (?:Standard|Detailed)$/i.test(name));
  if (!selected.some(({ attributes: { name } }) => /Downloads Detailed$/i.test(name))) throw new Error("Apple's catalog has no detailed download report; inspect available_reports before analysis");
  const cutoff = new Date(time.getTime() - 35 * 86400000).toISOString().slice(0, 10);
  for (const report of selected) {
    const instances = await list(token, `/v1/analyticsReports/${encodeURIComponent(report.id)}/instances?filter[granularity]=DAILY&limit=200`);
    const current = instances.filter((item) => item.attributes.processingDate >= cutoff);
    const record = { id: report.id, name: report.attributes.name, instances: [] };
    for (const instance of current) {
      const segments = await list(token, `/v1/analyticsReportInstances/${encodeURIComponent(instance.id)}/segments?limit=200`);
      const files = [];
      for (const segment of segments) files.push(await downloadSegment(segment, cacheFolder));
      record.instances.push({ id: instance.id, ...instance.attributes, files });
    }
    manifest.reports.push(record);
  }
  const files = manifest.reports.flatMap((report) => report.instances.flatMap((instance) => instance.files));
  manifest.downloaded_files = files.length;
  manifest.status = files.length ? "data_available" : "waiting_for_apple";
  manifest.note = files.length ? "Read verified TSV files by report and processing date. Do not sum overlapping report revisions or mix standard and detailed totals." : "Ongoing reporting is active. Apple can take 1–2 days to generate the first reports. Missing or suppressed campaign metrics are unknown, not zero.";
} catch (error) {
  manifest.status = "blocked";
  manifest.error = error instanceof Error ? error.message : "Apple analytics collection failed";
}
const path = join(folder, "manifest.json");
await writeFile(path, JSON.stringify(manifest, null, 2), { mode: 0o600 });
await writeFile(join(ROOT, ".organic-runs", "apple", "latest.json"), JSON.stringify({ manifest: path, status: manifest.status }, null, 2), { mode: 0o600 });
console.log(JSON.stringify({ status: manifest.status, app_id: APP_ID, manifest: path, ongoing: manifest.ongoing, created_request: manifest.created_request, downloaded_files: manifest.downloaded_files, error: manifest.error }));
if (manifest.status === "blocked") process.exitCode = 1;
