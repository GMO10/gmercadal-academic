# gmercadal-academic

Personal academic website for **G. Mercadal-Orfila** — auto-updated with publications from ORCID/PubMed/Crossref and media mentions from GDELT.

Built with Next.js 14 (App Router) + Tailwind CSS. Deployed on Vercel. Data refreshed every 12 hours via GitHub Actions.

---

## Features

- **Publications** — sourced from ORCID, enriched with Crossref, complemented by PubMed. Deduplicated by DOI → PMID → title hash.
- **Mentions & News** — sourced from GDELT Doc API with anti-homonym scoring (configurable signals and threshold in `config/identity.json`).
- **Automatic updates** — GitHub Actions cron job (every 12h) fetches fresh data, commits if changed, triggering Vercel redeploy.
- **Print / PDF** — `@media print` styles for clean CV-style output.
- **SEO** — OpenGraph meta, semantic HTML, auto-generated sitemap.
- **Accessible** — proper headings, ARIA labels, keyboard navigation.

## Architecture

```
gmercadal-academic/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx            # Root layout (nav + footer)
│   ├── page.tsx              # Home: profile + latest items
│   ├── globals.css           # Tailwind + print styles
│   ├── sitemap.ts            # Auto-generated sitemap
│   ├── publications/page.tsx # Publications with filters
│   ├── mentions/page.tsx     # Mentions with score filter
│   └── contact/page.tsx      # Contact + CV download
├── components/               # React components
│   ├── PublicationsList.tsx   # Client: filterable pub list
│   ├── MentionsList.tsx      # Client: filterable mentions
│   └── BadgeScore.tsx        # Score badge (green/yellow/red)
├── lib/
│   ├── types.ts              # Shared TypeScript types
│   └── data.ts               # JSON data loaders
├── scripts/
│   ├── fetch_publications.ts # ORCID + Crossref + PubMed
│   └── fetch_mentions.ts     # GDELT + scoring engine
├── config/
│   └── identity.json         # Identity config (edit this!)
├── data/
│   ├── publications.json     # Auto-generated
│   └── mentions.json         # Auto-generated
├── public/
│   └── cv.docx               # Your CV (replace placeholder)
└── .github/workflows/
    └── update-data.yml       # Cron: every 12h
```

## Setup — Step by Step

### 1. Clone & install

```bash
git clone https://github.com/YOUR_USER/gmercadal-academic.git
cd gmercadal-academic
npm install
```

### 2. Configure identity

Edit `config/identity.json`:
- Update `person.fullName`, `person.bio`, `person.links` (add LinkedIn, Scholar, email).
- Update `keywords` based on your CV.
- After the first data fetch, add frequent coauthors to `mentions.signals.coauthors.names`.

### 3. Replace the CV

Drop your actual `.docx` file as `public/cv.docx`.

### 4. First data fetch (local)

```bash
npm run fetch:publications
npm run fetch:mentions
```

This populates `data/publications.json` and `data/mentions.json` with real data.

### 5. Run locally

```bash
npm run dev
# → http://localhost:3000
```

### 6. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 7. Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new).
2. Import your `gmercadal-academic` repo.
3. Framework: **Next.js** (auto-detected).
4. Click **Deploy**. That's it.

Optionally set `NEXT_PUBLIC_SITE_URL` env var to your custom domain for the sitemap.

### 8. Enable GitHub Actions

The workflow runs automatically. To ensure it can push back:

1. Go to repo **Settings → Actions → General**.
2. Under "Workflow permissions", select **Read and write permissions**.
3. The cron job at `0 0,12 * * *` (midnight & noon UTC) will auto-fetch and commit.

You can also trigger manually: **Actions → Update Publications & Mentions → Run workflow**.

## API Usage (no secrets required)

| API | Auth | Rate Limits | Notes |
|-----|------|-------------|-------|
| ORCID Public API v3.0 | None (public read) | Generous | Reads works by ORCID ID |
| Crossref REST API | None | Polite pool (we add 200ms delay) | Enriches by DOI |
| NCBI E-utilities | None (or optional `NCBI_API_KEY`) | 3 req/sec without key, 10 with | Set `NCBI_API_KEY` secret if you hit limits |
| GDELT Doc API v2 | None | Fair use | 1s delay between queries |

**Optional secret**: If you fetch large volumes from PubMed, set `NCBI_API_KEY` as a GitHub repo secret and update `fetch_publications.ts` to append `&api_key=${process.env.NCBI_API_KEY}` to E-utilities URLs.

## Anti-Homonym Scoring

Mentions are scored to filter out false positives. Signals and weights are in `config/identity.json`:

| Signal | Weight | Trigger |
|--------|--------|---------|
| Hospital Mateu Orfila | +4 | Affiliation in text |
| Universitat Illes Balears | +4 | Affiliation in text |
| Full name + initial G | +4 | "Mercadal-Orfila" + "G" or "Gabriel" |
| Location + science context | +3 | Mahon/Mallorca + health/research terms |
| Coauthor name | +2 | Known collaborator mentioned |
| Thematic keyword | +1 | CV keywords in text |
| Surname only (no context) | -5 | Penalizes generic matches |

Default threshold: **≥ 6** (configurable).

## Customization

- **Colors/fonts**: Edit `tailwind.config.js`.
- **Score threshold**: Change `mentions.scoreThreshold` in `config/identity.json`.
- **Cron frequency**: Edit `.github/workflows/update-data.yml` cron expression.
- **Add Google Scholar link**: Add URL to `person.links.scholar` in config.

## License

MIT
