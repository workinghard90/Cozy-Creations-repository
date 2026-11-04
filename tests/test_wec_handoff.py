"""Fixture tests for the read-only WEC handoff importer.

Run: python -m unittest discover -s tests -p 'test_wec_handoff.py'
"""
import hashlib
import importlib.util
import io
import json
from pathlib import Path
import tempfile
import unittest
import zipfile

MODULE = Path(__file__).resolve().parents[1] / "scripts" / "wec_handoff_preview.py"
spec = importlib.util.spec_from_file_location("wec_handoff_preview", MODULE)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class HandoffPreviewTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.path = Path(self.temp.name) / "handoff.zip"
        self.asset = b"example-cover-fixture"
        self.manifest = {
            "schemaVersion": "wec-cozy-handoff-v1",
            "sourceProjectId": "fixture-project",
            "productSlug": "fixture-book",
            "title": "Fixture Book",
            "creator": "Fixture Author",
            "productType": "coloring-book",
            "description": "Fixture description",
            "publicationStatus": "approved",
            "assets": {"cover": "assets/cover.png", "previews": []},
            "kdp": {"interior": None, "cover": None},
            "purchaseUrl": None,
            "sha256": {"assets/cover.png": hashlib.sha256(self.asset).hexdigest()},
        }

    def write(self, asset=None, extra=None):
        with zipfile.ZipFile(self.path, "w") as archive:
            archive.writestr("manifest.json", json.dumps(self.manifest))
            archive.writestr("assets/cover.png", self.asset if asset is None else asset)
            if extra:
                archive.writestr(extra, b"bad")

    def test_approved_package_yields_review_only_catalog_proposal(self):
        self.write()
        result = module.preview(self.path)
        self.assertTrue(result["reviewOnly"])
        self.assertEqual(result["catalogProposal"]["collectionId"], "coloring-books")
        self.assertEqual(result["catalogProposal"]["status"], "coming-soon")
        self.assertNotIn("amazonUrl", result["catalogProposal"])

    def test_draft_is_rejected(self):
        self.manifest["publicationStatus"] = "draft"
        self.write()
        with self.assertRaises(ValueError):
            module.preview(self.path)

    def test_modified_asset_is_rejected(self):
        self.write(asset=b"tampered")
        with self.assertRaisesRegex(ValueError, "Checksum"):
            module.preview(self.path)

    def test_traversal_is_rejected(self):
        self.write(extra="../outside.txt")
        with self.assertRaises(ValueError):
            module.preview(self.path)

    def test_unverified_purchase_link_is_rejected(self):
        self.manifest["purchaseUrl"] = "https://example.com/unverified"
        self.write()
        with self.assertRaises(ValueError):
            module.preview(self.path)


if __name__ == "__main__":
    unittest.main()
