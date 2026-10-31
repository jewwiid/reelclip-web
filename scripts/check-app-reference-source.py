#!/usr/bin/env python3
"""Local-only catalog/provenance preflight. Never approves new runtime evidence."""
import argparse
import hashlib
import json
from pathlib import Path
import sys


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def require(condition, message):
    if not condition:
        raise ValueError(message)


def main():
    parser = argparse.ArgumentParser(__doc__)
    parser.add_argument("--app-root", required=True, type=Path)
    parser.add_argument("--manifest", type=Path, default=Path("marketing/organic/walkthrough-grounding/equal-clips.json"))
    args = parser.parse_args()
    root = args.app_root.resolve()
    site = Path(__file__).resolve().parent.parent
    sys.dont_write_bytecode = True
    sys.path.insert(0, str(root / "scripts"))
    import reelclip_app_catalog as catalog

    binding = json.loads(args.manifest.read_text())
    require(binding["capture_source_match"] == "not_established_legacy_recording", "Do not upgrade legacy footage to current-build proof")
    public_path = site / binding["public_reference"]["file"]
    require(digest(public_path) == binding["public_reference"]["sha256"], "Public reference changed since catalog/visual review")
    public = json.loads(public_path.read_text())
    require(set(binding["control_refs"]) == {row["id"] for row in public["controls"]}, "Every public control needs its exact catalog binding")
    refs = sorted({ref for values in binding["control_refs"].values() for ref in values})
    knowledge = catalog.resolve(refs, root=root, store=root / "docs/app-catalog")
    require(knowledge["source_tree_sha256"] == binding["catalog_source_tree_sha256"], "App source changed: review the reference before publication")
    require(knowledge["definitions_sha256"] == binding["catalog_definitions_sha256"], "Catalog meanings changed: review the reference before publication")
    # Shared controls need their exact Cut caller, even for a read-only explanation.
    catalog.bind_actions([
        {"app_control_refs": values} for values in binding["control_refs"].values()
    ], dict(knowledge, status="source_meanings_bound"))

    run = root / binding["original_run"]
    review_file = run / "review/output-review.json"
    require(digest(review_file) == binding["original_review_sha256"], "Original visual review changed")
    review = json.loads(review_file.read_text())
    plan = json.loads((run / "plan.json").read_text())
    plan_hash = hashlib.sha256(json.dumps(plan, sort_keys=True).encode()).hexdigest()
    require(review["status"] == "reviewed" and review["plan_sha256"] == plan_hash, "Original recording plan/review is stale")
    require(review["output_sha256"] == public["video"]["sha256"], "Reference points to a different reviewed video")
    require(digest(run / "render/cut-equal-sections-v1.mp4") == public["video"]["sha256"], "Original finished video changed")
    require(digest(site / ("public" + public["video"]["path"])) == public["video"]["sha256"], "Published recording differs from reviewed output")
    require({item["public_id"] for item in binding["frames"]} == {row["id"] for row in public["screenshots"]}, "Every public screenshot needs original review provenance")
    for item in binding["frames"]:
        source = run / item["original"]
        frame = next(row for row in review["frames"] if row["file"] == item["original"])
        public_frame = next(row for row in public["screenshots"] if row["id"] == item["public_id"])
        require(digest(source) == frame["sha256"] == public_frame["sha256"], "Original/public screenshot binding changed")
        require(digest(site / ("public" + public_frame["path"])) == frame["sha256"], "Published screenshot differs from reviewed frame")
        require(abs(frame["time"] - public_frame["video_seconds"]) < 0.00001, "Screenshot timestamp changed")
    print(f"Catalog source meanings resolve for {len(binding['control_refs'])} public controls; exact caller context and original reviewed media match. Legacy capture/build match remains unestablished.")


if __name__ == "__main__":
    main()
