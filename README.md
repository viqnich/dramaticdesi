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

## GitHub Pages

1. Push this repo to GitHub
2. **Settings → Pages → Build and deployment**
3. Source: **Deploy from a branch**
4. Branch: `main` / `/ (root)` → Save

The site will be at `https://<user>.github.io/<repo>/`.

Optional: add a `CNAME` file later for a custom domain.
