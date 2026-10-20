import nextEnvironment from "@next/env";
import { spawn } from "node:child_process";
import "./export-guide-versions.mjs";

// Use this project's public production configuration when rendering local guide
// sources. Loading it here avoids passing Node-only flags into Next's workers.
nextEnvironment.loadEnvConfig(process.cwd(), false);
const port = process.env.REELCLIP_LOCALIZATION_SOURCE_PORT ?? "3093";
if (!/^\d+$/.test(port) || Number(port) < 1 || Number(port) > 65535) throw new Error("Invalid localization source port");
const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "--hostname", "127.0.0.1", "--port", port], { stdio: "inherit", env: process.env });
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => child.kill(signal));
child.on("exit", code => { process.exitCode = code ?? 1; });
