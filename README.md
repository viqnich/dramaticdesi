# Dramatic Desi

Marketing site for **Dramatic Desi** — theatre and short film rooted in the South Asian Indian subcontinent community.

- Home: brand hero + **Coming soon** + past productions
- Archive: [`shows/khayali-doctor.html`](shows/khayali-doctor.html) (*Khayali Doctor*, Nov 13, 2026) with post-show video

## Local preview

Open `index.html` in a browser, or from this folder:

```bash
python3 -m http.server 8080
```

Then visit http://localhost:8080

## Edit content

Copy lives in [`js/content.js`](js/content.js):

- `next` — hero “Coming soon” / next production cue
- `past` — archived show card + archive page fields (`videoEmbed`, `archiveUrl`, etc.)
- `group.email` / social links for About

When the next show is announced, update `next.title` / `next.cue` (and later promote it to a featured block or new archive entry).

## Hero backdrop (red / gold)

The hero uses Desi stage silhouettes (kurta, saree, modern violinist) against a red-curtain stage. Two color grades ship in [`assets/`](assets/):

| File | Mood |
|------|------|
| `hero-stage-red.jpg` | Crimson / red haze (**default**, currently live) |
| `hero-stage-gold.jpg` | Warm gold / brass spotlight fill |

Group logo: [`assets/dd-logo.png`](assets/dd-logo.png) — used in the header, footer, and browser tab.

To switch, edit `--hero-image` near the top of [`css/styles.css`](css/styles.css):

```css
/* Red (default) */
--hero-image: url("../assets/hero-stage-red.jpg");

/* Or gold */
--hero-image: url("../assets/hero-stage-gold.jpg");
```

Comment out one line and uncomment the other (or change the URL). Keep only one active.

## GitHub Pages

1. Push this repo to GitHub
2. **Settings → Pages → Build and deployment**
3. Source: **Deploy from a branch**
4. Branch: `main` / `/ (root)` → Save

The site will be at `https://<user>.github.io/<repo>/`.

Optional: add a `CNAME` file later for a custom domain.
