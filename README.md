# Éveil

Éveil is a mobile-first web app for women built around one protected hour per day for personal growth.

It is not a classic habit tracker. Éveil helps the user intentionally protect one hour, put the phone down, and focus on a meaningful personal goal. The product philosophy is quiet, elegant, and intentional, with emphasis on small daily progress instead of motivational noise.

## Live Production

- Production: [https://www.eveil.life](https://www.eveil.life)
- Root domain: [https://eveil.life](https://eveil.life) redirects to `https://www.eveil.life`
- GitHub repository: `DorotaNalewajek/eveil`
- Production Vercel project: `eveil`

## Tech Stack

- Frontend: Vite + React
- Routing: `react-router-dom`
- Authentication: Clerk
- Auth package: `@clerk/clerk-react`
- Hosting: Vercel
- DNS provider: Namecheap

## Product Concept

Éveil is designed as a doorway into offline focus, not another app that competes for attention.

The core user promise is simple:

> Protect one hour. Put the phone down. Come back when it is done.

The current product experience supports a short intentional flow from entry, authentication, transition, timer, reflection, and completion.

## Current App Flow

1. Splash screen
2. Register screen
3. Login screen
4. Transition screen
5. Timer screen
6. Reflection screen
7. Done screen

## Routes

- `/`
- `/register`
- `/login`
- `/transition`
- `/sso-callback`
- `/timer`
- `/reflection`
- `/done`

## Local Development

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Build the production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Environment Variables

For the Vite frontend:

```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_live_...
```

For server-side or Vercel-only configuration:

```bash
CLERK_SECRET_KEY=sk_live_...
```

`VITE_CLERK_PUBLISHABLE_KEY` is safe to expose because it is a Clerk publishable frontend key. `CLERK_SECRET_KEY` must remain server-side only.

Production must use a `pk_live_` publishable key. Local development may use a `pk_test_` publishable key only when working with the Clerk Development instance.

## Clerk Authentication

Clerk is initialized in the React app through `@clerk/clerk-react`.

The frontend must read the publishable key only from:

```js
const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
```

The app intentionally fails fast when:

- `VITE_CLERK_PUBLISHABLE_KEY` is missing
- a production build receives a publishable key that does not start with the live key prefix

Do not use `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`; this is a Vite app, not a Next.js app.

## DNS And Production Deployment

Éveil is deployed on Vercel under the production project `eveil`.

DNS is managed in Namecheap. Do not manage active DNS records in Vercel unless the domain nameservers are moved to Vercel.

Required Namecheap DNS records for Clerk:

| Type | Host | Value |
| --- | --- | --- |
| CNAME | `clerk` | `frontend-api.clerk.services` |
| CNAME | `accounts` | `accounts.clerk.services` |
| CNAME | `clkmail` | `mail.v1pbk10n14vj.clerk.services` |
| CNAME | `clk._domainkey` | `dkim1.v1pbk10n14vj.clerk.services` |
| CNAME | `clk2._domainkey` | `dkim2.v1pbk10n14vj.clerk.services` |

Additional domain requirements:

- `www.eveil.life` must point to the correct Vercel target.
- `eveil.life` must redirect to `www.eveil.life`.
- Clerk frontend API domain must resolve at `clerk.eveil.life`.
- Clerk Production instance must be connected and verified.

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Deployment Checklist

Before deploying production:

- Confirm the Vercel project is `eveil`, not `eveil-vnb9`.
- Confirm deployment is from the `main` branch.
- Confirm `VITE_CLERK_PUBLISHABLE_KEY` is set in Vercel Production variables.
- Confirm the publishable Clerk key comes from the Clerk Production instance.
- Confirm `CLERK_SECRET_KEY` is set only as a server-side Vercel variable.
- Confirm Namecheap DNS records for `www`, root redirect, and Clerk custom domains are correct.
- Run `npm run build`.
- Redeploy without build cache after changing environment variables.

## Troubleshooting

### Clerk says development keys are used in production

Check the Vercel Production environment variable `VITE_CLERK_PUBLISHABLE_KEY` and confirm it uses the live publishable key. Then redeploy without build cache.

### `clerk.eveil.life` shows `ERR_NAME_NOT_RESOLVED`

Check the Namecheap DNS record:

```text
CNAME clerk -> frontend-api.clerk.services
```

This is a DNS configuration issue, not a React or Vite code issue.

### Clerk SSL or cipher mismatch appears

Verify the Clerk domain configuration and wait for DNS and SSL propagation.

### Build fails because the production Clerk key is missing

Check Vercel Production environment variables and confirm `VITE_CLERK_PUBLISHABLE_KEY` is present.

### Changes do not appear on production

Confirm the active Vercel project is `eveil`, not `eveil-vnb9`. Also confirm the deployment is built from the `main` branch.

## Security Notes

- Never hardcode Clerk keys in the codebase.
- Never expose `CLERK_SECRET_KEY` to frontend code.
- Never prefix secret keys with `VITE_`.
- Never commit real API keys, tokens, or secrets.
- Keep Clerk Development and Production instances separate.
- Use live Clerk publishable keys only for production builds.

## Cleanup Note

The duplicate or old Vercel project `eveil-vnb9` should be removed or clearly archived once there is no traffic, domain, or deployment dependency on it. Active production work should use only the Vercel project `eveil`.

## Future Roadmap

- Improve session history and progress visibility
- Add gentle weekly reflections
- Explore custom session lengths
- Refine the mobile-first interface and PWA behavior
- Continue developing a calm, elegant design system for intentional daily use

## License

TBD
