# PRINCE BHAI — GitHub + Vercel

This is a plain HTML/CSS/JavaScript conversion of the supplied landing page. It does **not** require WordPress, PHP, React, or a build step.

## Files

- `index.html` — page structure + legal content
- `style.css` — all responsive styling and animations
- `script.js` — Telegram redirect, UTM capture, Meta Pixel events, legal modal, ripple and tilt
- `api/get-link.js` — Vercel serverless endpoint for the Telegram invite
- `api/event.js` — Vercel serverless endpoint that accepts click/view events
- `vercel.json` — Vercel configuration

## Deploy on GitHub + Vercel

1. Create a new GitHub repository.
2. Upload all files from this folder.
3. In Vercel, import that GitHub repository.
4. Framework Preset: **Other**
5. Build Command: **leave empty**
6. Output Directory: **leave empty**
7. Deploy.

## Optional Telegram environment variable

In Vercel → Project → Settings → Environment Variables, add:

`TELEGRAM_INVITE_LINK`

Value:

`https://t.me/your-invite-link`

The API will use that value instead of the fallback link.

## Important

The original page used `get-link.php` and `event.php`. Vercel cannot execute PHP functions directly, so they were converted to `/api/get-link` and `/api/event` serverless functions.

The supplied page's Meta Pixel ID is retained. If this page belongs to a different advertiser/account, replace the pixel ID in `index.html` and `script.js`.

The avatar still points to the original image URL. For a fully self-contained GitHub deployment, put `prince.jpg` in the repository and change the avatar URL to `/prince.jpg`.

No WordPress database or plugin system is needed for this landing page.
