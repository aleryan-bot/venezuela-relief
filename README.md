# Venezuela Relief

Clean directory site for verified Venezuela earthquake relief organizations.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## CMS Workflow

The site includes a simple CMS tab for editing organizations without touching code.

- Use `CMS` in the top navigation.
- Edit organization details, priority, trust level, logo URL, donation URL, help types, donor regions, and status.
- Click `Save changes` to store edits in the browser.
- Use `Export JSON` to download a backup of the edited organization data.
- Organizations marked `Review`, `Rejected`, or `Archived` stay hidden from the public directory.

This first CMS is local-browser based. For shared editing and production publishing, connect the same fields to Supabase using the database schema in the project outputs folder.

Vercel settings:
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

The `vercel.json` file keeps all app routes working by rewriting requests to `index.html`.
