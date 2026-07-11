# WATB Site — Setup Guide

## What's in this folder
- `index.html`, `styles.css`, `site.js` — the site itself
- `content.json` — all your editable text (this is what the admin panel edits)
- `images/lion-logo.png` — your transparent lion logo
- `admin/` — the login/editing panel (Decap CMS)

## Step 1: Create a GitHub repository
1. Go to github.com, log in
2. Click the **+** icon (top right) → **New repository**
3. Name it something like `watb-site`
4. Keep it **Public** (required for the free tier), don't add a README
5. Click **Create repository**
6. On the next page, click **uploading an existing file**
7. Drag in ALL the files/folders from this package (keep the folder structure — `admin/` should stay a folder, `images/` should stay a folder)
8. Click **Commit changes**

## Step 2: Connect Netlify
1. Go to app.netlify.com, log in (with your GitHub account)
2. Click **Add new site** → **Import an existing project**
3. Choose **GitHub**, then select your `watb-site` repository
4. Leave build settings blank/default (this site needs no build step)
5. Click **Deploy**
6. Netlify gives you a temporary link like `random-name-123.netlify.app` — open it to confirm the site works

## Step 3: Connect your domain
1. In Netlify: **Site settings** → **Domain management** → **Add a domain** → enter `watb411.com`
2. Netlify will show you DNS records to add
3. Go to wherever you bought watb411.com (your domain registrar) → DNS settings
4. Add the records Netlify gave you
5. This can take up to 24-48 hours to fully update, but often works within minutes

## Step 4: Turn on the admin login
1. In Netlify: **Site settings** → **Identity** → **Enable Identity**
2. Under Identity settings, set registration to **Invite only**
3. Go to the **Identity** tab → **Invite users** → invite your own email
4. Check your email, accept the invite, set a password
5. Also enable **Git Gateway** (under Identity settings) — this lets the admin panel save your edits
6. Now go to `yoursite.netlify.app/admin` (or `watb411.com/admin` once domain is connected) and log in

## Editing the site afterward
Once logged into `/admin`, you can edit all text, upload new photos, and add Moments gallery images — no coding needed. Changes save directly and the live site updates automatically within a minute or two.
