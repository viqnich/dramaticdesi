# Dramatic Desi

Marketing site for **Dramatic Desi** — theatre and short film rooted in the South Asian Indian subcontinent community. Featured production: *Khayali Doctor* (November 13, 2026).

## Local preview

Open `index.html` in a browser, or from this folder:

```bash
python3 -m http.server 8080
```

Then visit http://localhost:8080

## Edit content

Show and group copy live in [`js/content.js`](js/content.js):

- Update `show` fields for the next production (title, date, venue, synopsis, etc.)
- Set `show.ticketUrl` to your ticketing link when ready (leave `""` for “tickets announced soon”)
- Update `group.email` for the contact CTA

## Hero backdrop (red / gold)

The hero uses Desi stage silhouettes (kurta, saree, modern violinist) against a red-curtain stage. Two color grades ship in [`assets/`](assets/):

| File | Mood |
|------|------|
| `hero-stage-red.jpg` | Crimson / red haze (**default**, currently live) |
| `hero-stage-gold.jpg` | Warm gold / brass spotlight fill |

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
