# Sahyadri Krida Mandal – editable website

This package preserves the original Express/EJS website structure and styling while rebranding it for Sahyadri Krida Mandal.

## Run locally
1. Open this folder in Antigravity IDE.
2. Open Terminal.
3. Run `npm install`.
4. Configure your existing `.env` values for database, mail, Google Sheets, Razorpay, etc.
5. Run `npm start`.

## Image assets
All user-facing photographic assets were replaced with the seven supplied photographs in `public/images/`. `public/images/sahyadri_logo.svg` is an editable red/orange SVG brand mark.

## Bilingual content
Use the existing Marathi/English language toggle. Paired text is kept together in the same templates/i18n data so the two views refer to the same sections and facts.

## T-Shirt section
The public T-Shirt page and its public routes/navigation links were removed. Existing admin/database T-Shirt infrastructure was left untouched so existing data is not damaged.
