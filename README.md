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

The site includes a CMS login in the footer for editing organizations without touching code.

- Use `CMS login` in the footer.
- With Supabase configured, editors sign in with email/password.
- Without Supabase configured, local testing still uses the temporary password: `venezuela-relief`.
- Edit organization details, priority, trust level, logo URL, donation URL, help types, donor regions, and status.
- Click `Save changes` to store edits in Supabase, or locally when Supabase is not configured.
- Use `Export JSON` to download a backup of the edited organization data.
- Organizations marked `Review`, `Rejected`, or `Archived` stay hidden from the public directory.

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Create editor users in Supabase Auth.
4. Add each editor's auth user id to `public.editor_users`.
5. Add these environment variables in Vercel and local `.env`:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

The public site reads approved organizations. Signed-in editors can read, create, update, and delete organizations.

## Likes And Popularity

Liked organizations persist in the visitor's browser and influence local sorting. Global popularity across all visitors requires Supabase; the database schema includes an `organization_likes` table and `organization_popularity` view for that next step.

Vercel settings:
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

The `vercel.json` file keeps all app routes working by rewriting requests to `index.html`.
