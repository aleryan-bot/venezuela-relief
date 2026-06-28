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

The site includes a simple CMS login in the footer for editing organizations without touching code.

- Use `CMS login` in the footer.
- Temporary local password: `venezuela-relief`.
- Edit organization details, priority, trust level, logo URL, donation URL, help types, donor regions, and status.
- Click `Save changes` to store edits in the browser.
- Use `Export JSON` to download a backup of the edited organization data.
- Organizations marked `Review`, `Rejected`, or `Archived` stay hidden from the public directory.

This first CMS is local-browser based. The password protects the editing screen for launch testing, but production editing should use Supabase authentication.

## Likes And Popularity

Liked organizations persist in the visitor's browser and influence local sorting. Global popularity across all visitors requires Supabase; the database schema includes an `organization_likes` table and `organization_popularity` view for that next step.

Vercel settings:
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

The `vercel.json` file keeps all app routes working by rewriting requests to `index.html`.
