# Website checks

6 September 2026

The 13 main HTML pages were rendered at 1440 px and 390 px viewport widths in headless Chromium. All internal links, fragment destinations, responsive image sources and local asset paths were checked against the package. No horizontal overflow, missing images or JavaScript page errors were found in these renders.

The mobile navigation opens and closes using the menu button and Escape. The sketchpad was tested for freehand drawing, a sample letter, pen selection, undo, clear and generation of a downloadable PNG blob. The support form becomes available with JavaScript. The App Store link stays hidden while unconfigured.

The original Fontly icon is byte-identical to the supplied source. Website fonts are unchanged. No external font request or font file is present. Logo SVGs contain vector paths rather than text nodes or embedded bitmaps. The profile artwork is contained well inside a circular crop.

The browser environment restricts direct localhost/file navigation. Visual and interaction checks therefore used isolated in-memory copies of the same HTML, CSS, JavaScript and images. The delivered files retain their normal relative links and asset files. Live hosting, real email delivery, native app functionality and a real App Store destination were not tested.

Machine-readable results: `qa-results.json`.
