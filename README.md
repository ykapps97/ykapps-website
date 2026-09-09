# YK Apps website

## Open the website

Extract the ZIP and open `yk-apps-website/index.html`. Keep the assets and other files together. No build step, server, installation or remote font is required for the local preview.

To deploy, upload the contents of `yk-apps-website` to your hosting public directory. The `docs` directory is for local reference and is not needed on the live site. No live website or native app is changed by opening this package.

## Brand

The primary colours are electric mint #00FF9C and ink #12251D. Pale green #B6FFA1, pale yellow #FEFFA7 and yellow #FFE700 are supporting colours. A darker green is used for readable links. Logo artwork is intentionally one colour on light or mint backgrounds; a reversed variant uses mint and white on dark surfaces.

The selected split-stroke YK mark is preserved. The rounded Apps lettering is redrawn from the supplied lettering reference. All logo masters are vector outlines, with no embedded bitmap or font dependency. The site typography remains the same native system-font stack. No font files are included.

The supplied Fontly icon is unchanged.

## Pages

- `index.html`: company homepage.
- `apps.html`: app directory. Add future apps here, not to the shared footer.
- `fontly.html`: Fontly and its contextual help links.
- `fontly-support.html`, `fontly-privacy.html`, `fontly-terms.html`, `fontly-subscriptions.html`, `fontly-data.html`: app-specific pages.
- `company.html`, `privacy.html`, `support.html`, `legal.html`: company information.

Friendly URL folders and older URL aliases remain included. On a plain static server, the `.html` files work directly. `_headers` and `_redirects` are optional host-specific configuration files.

## App Store destination

Set the real Fontly App Store URL in `site-config.js`. The download link remains hidden until a valid `https://apps.apple.com/` destination is supplied. No fictitious listing has been inserted.

## Add another app

Duplicate an `.app-listing-card` in `apps.html`, update its name, description, icon and link, then add its product and policy pages. Update the support selector and sitemap as needed. Shared navigation and footer do not need app-specific entries.

## Interactive features

The support form creates a message in the visitor's email app. It does not send a ticket from the website. The web sketchpad supports drawing, three pen colours, undo, clear, a sample letter and PNG export. It does not generate fonts or communicate with Fontly. Drawings remain in the current browser tab.

## Document scope

App policy pages use reader-facing wording without editorial banners. Their content describes a proposed operating model for account access, content processing, diagnostics and Apple purchases. The native app and backend have not been inspected or modified. Account-deletion copy does not create an account-deletion endpoint or in-app control. Website code, app behaviour and App Store configuration are separate.

## Images and logo kit

`assets/brand` includes SVG and transparent PNG horizontal, stacked and monogram versions, plus profile images. Horizontal PNGs are 3000 pixels wide. Profile images are 2048 x 2048 pixels. Use `yk-apps-profile-mint.png` for the monogram on mint or `yk-apps-profile-with-name.png` for the complete company name. The spacing leaves room for circular cropping.

Open `docs/BRAND-PREVIEW.html` to see the logo system. Website screenshots are in `docs/previews`. Source links for the Apple instructions are in `docs/APPLE-REFERENCES.md`.
