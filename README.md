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

Vercel settings:
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

The `vercel.json` file keeps all app routes working by rewriting requests to `index.html`.
