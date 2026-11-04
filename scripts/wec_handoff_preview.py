"""Read-only Cozy catalog preview from an approved WEC handoff ZIP.

Usage: python scripts/wec_handoff_preview.py package.zip
Never writes to the catalog or publishes anything.
"""
import hashlib
import json
import re
import sys
import zipfile
from pathlib import PurePosixPath

COLLECTION = {
    "coloring-book": "coloring-books",
    "storybook": "storybooks",
    "art": "artwork-and-gifts",
    "artwork": "artwork-and-gifts",
    "logbook": "logbooks-journals",
}


def preview(path):
    with zipfile.ZipFile(path) as z:
        info = z.infolist()
        names = [entry.filename for entry in info]
        if len(names) > 100 or len(names) != len(set(names)):
            raise ValueError("Duplicate or excessive entries")
        if sum(entry.file_size for entry in info) > 90 * 1024 * 1024:
            raise ValueError("Package too large")
        for entry in info:
            name = entry.filename
            if (name.startswith("/") or "\\" in name or ".." in PurePosixPath(name).parts
                    or entry.file_size > 42 * 1024 * 1024):
                raise ValueError("Unsafe package entry")
        if "manifest.json" not in names or z.getinfo("manifest.json").file_size > 65536:
            raise ValueError("Missing or oversized manifest")
        data = json.loads(z.read("manifest.json"))
        if not isinstance(data, dict) or data.get("schemaVersion") != "wec-cozy-handoff-v1":
            raise ValueError("Unsupported manifest")
        if data.get("publicationStatus") != "approved":
            raise ValueError("Owner approval required")
        if data.get("purchaseUrl") is not None:
            raise ValueError("Unverified purchase link not accepted")
        slug = data.get("productSlug")
        if not isinstance(slug, str) or not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug):
            raise ValueError("Invalid product slug")
        category = COLLECTION.get(data.get("productType"))
        if not category:
            raise ValueError("Unsupported product type")
        for field in ("title", "description", "creator", "sourceProjectId"):
            value = data.get(field)
            if not isinstance(value, str) or not value.strip() or len(value) > 4000:
                raise ValueError("Invalid " + field)
        assets, kdp, hashes = data.get("assets"), data.get("kdp"), data.get("sha256")
        if not all(isinstance(x, dict) for x in (assets, kdp, hashes)):
            raise ValueError("Missing asset metadata")
        samples = assets.get("previews", [])
        if not isinstance(samples, list) or len(samples) > 40:
            raise ValueError("Invalid previews")
        paths = [assets.get("cover"), *samples, kdp.get("interior"), kdp.get("cover")]
        for filename in paths:
            if filename is None:
                continue
            if not isinstance(filename, str) or filename not in names:
                raise ValueError("Missing referenced file")
            suffix = PurePosixPath(filename).suffix.lower()
            if not ((filename.startswith("assets/") and suffix in (".png", ".jpg", ".jpeg", ".webp"))
                    or (filename.startswith("kdp/") and suffix == ".pdf")):
                raise ValueError("Invalid file path or type")
            expected = hashes.get(filename)
            if not isinstance(expected, str) or not re.fullmatch(r"[a-f0-9]{64}", expected):
                raise ValueError("Missing checksum")
            if hashlib.sha256(z.read(filename)).hexdigest() != expected:
                raise ValueError("Checksum mismatch")
        return {
            "reviewOnly": True,
            "catalogProposal": {
                "id": slug,
                "slug": slug,
                "collectionId": category,
                "title": data["title"],
                "description": data["description"],
                "status": "coming-soon",
            },
            "assetsForManualReview": [x for x in paths if x],
            "notice": "No catalog changes or publication performed.",
        }


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("Usage: python scripts/wec_handoff_preview.py package.zip")
    try:
        print(json.dumps(preview(sys.argv[1]), indent=2))
    except (ValueError, KeyError, TypeError, OSError, zipfile.BadZipFile) as exc:
        sys.exit("Rejected handoff: " + str(exc))
