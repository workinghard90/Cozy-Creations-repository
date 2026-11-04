# Private WEC handoff validation

This static React/Vite storefront remains prelaunch. The WEC importer prints a review-only catalog proposal; it does not copy files, edit the catalog, create a PR, deploy, or publish.

Install the offline validator dependency and run:
```sh
python -m pip install -r requirements-handoff.txt
python -m unittest discover -s tests -p 'test_wec_handoff.py' -v
python scripts/wec_handoff_preview.py package.zip
npm run check:release
```

CI runs the Python tests as well as the storefront release checks.
Images must decode fully as the filename's PNG/JPEG/WebP format, be still images, and have at most 12 million pixels. Cover/previews use image-only assets/ paths; KDP fields use PDF-only kdp/ paths. PDF magic establishes file type only, not structural validity or KDP print readiness. SHA-256 checks are integrity checks, not signatures.
Limits remain 40 previews, 42 MiB per entry, 90 MiB total uncompressed, and 64 KiB manifest. WEC's browser image intake is stricter (10 MiB per image).
Older SITE.md and LAUNCH-READINESS.md describe historical template/testing stages; they are not evidence of the current live deployment or product availability.
No production rollout is authorized by these checks. Review and merge the paired validation changes first, rerun the pinned cross-repository browser test if either changes, then separately approve any deployment.
