# Asr'Art Al Sawssen — أسرار السوسن

Static fashion catalogue site: React + TypeScript + Vite + Tailwind. FR/AR (RTL), shopping bag in localStorage, ordering via WhatsApp. No backend, no database, no paid services.

## Run locally

```bash
node -v            # needs Node 18+ (22 recommended): https://nodejs.org
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build -> dist/
npm run preview    # test the production build at http://localhost:4173
```

## Where to edit

| What | File |
|---|---|
| WhatsApp number, phone, Instagram, Facebook, email, address, announcement bar | `src/config/site.ts` |
| Products, categories, colours | `src/data/products.ts` |
| Homepage / About images | `src/data/media.ts` |
| All French and Arabic texts | `src/i18n/fr.ts`, `src/i18n/ar.ts` |
| Colours / fonts | `tailwind.config.js`, `index.html` |

### WhatsApp number
`src/config/site.ts` → `whatsappNumber`: digits only, with country code, no `+` or spaces (e.g. `21624661267`). It is currently the number read from your business card: confirm it is the WhatsApp one.

## Managing products (`src/data/products.ts`)

1. **Add a product**: copy an existing entry, give it a new unique `id` (letters, digits, dashes), fill both `name` and `description` in `fr` and `ar`.
2. **Add photos**: put files in `public/assets/products/` (e.g. `robe-01-a.jpg`), then set `images: ["/assets/products/robe-01-a.jpg", "/assets/products/robe-01-b.jpg"]`. The first image is the main one. Use portrait 3:4 images, ~1200×1600 px, JPG/WebP under 300 KB.
3. **Change a price**: edit `price` (TND). Add `originalPrice` to show a struck-through old price.
4. **Change a description**: edit `description.fr` / `description.ar`.
5. **Sizes and colours**: edit `sizes: ["S","M","L"]` and `colors: [colors.rose, ...]`. Empty `sizes: []` = one-size item. Add new colours in the `colors` object at the top.
6. **Mark a size out of stock**: `unavailableSizes: ["L"]`. **Mark the whole product unavailable**: `status: "unavailable"`.
7. **Feature on the homepage**: `featured: true`. **"New" badge / new-arrivals section**: `isNew: true`.
8. **Remove a product**: delete its entry. (Old bags on visitors' phones clean themselves automatically.)

The five existing entries are **sample data** (`isSample: true`, shown with an "Exemple" badge). Delete them once your real products are in.

> Editing the file does **not** update the live site by itself: commit, push to GitHub and Cloudflare Pages redeploys (about 1 minute). Until you add a CMS, this is the update flow.

## Deploy for free on Cloudflare Pages

1. **Install** Node.js and Git. Check with `node -v` and `git --version`.
2. **Create a GitHub repository** (empty, no README) at github.com/new, e.g. `asrart-al-sawssen`.
3. **Push the project**:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-user>/asrart-al-sawssen.git
   git push -u origin main
   ```
4. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, pick the repository.
5. Build settings:
   - Framework preset: **Vite** (or None)
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable (only if the build uses an old Node): `NODE_VERSION` = `22`
6. **Save and Deploy.** You get a public URL like `https://asrart-al-sawssen.pages.dev`.
7. **Update the site later**: edit files → `git add . && git commit -m "Update" && git push`. Cloudflare rebuilds automatically.

Notes:
- Page routes (`/collections`, `/bag`…) work on refresh: Cloudflare Pages serves `index.html` for unknown paths when there is no `404.html`. Do not add a `_redirects` catch-all.
- No API keys or secrets are used. Cloudflare's free plan and account requirements may change; check their current terms.
- After deploying, replace the `og:image` in `index.html` with the absolute URL of a real image (e.g. `https://<your-site>.pages.dev/assets/brand/logo-plate.jpg`) so link previews work.

## How ordering works
The bag never takes payment. "Commander sur WhatsApp" opens WhatsApp with a prepared message (products, sizes, colours, quantities, prices, subtotal, optional note). The customer sends it; **you** confirm stock, delivery and the order by chat. Nothing is saved on a server.

## Known limitations
- Fonts load from Google Fonts (needs internet; system fallbacks otherwise).
- Bag is per browser/device (localStorage).
- Legal pages (`src/i18n/*.ts` → `legal`) contain `[À compléter]` placeholders: write your real delivery, returns and terms before launch.
- Facebook link is hidden until you set `social.facebook` in `src/config/site.ts`.
- No values section on the homepage: add one when you confirm what your brand values are.
