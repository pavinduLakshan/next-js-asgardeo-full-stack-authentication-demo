# Asgardeo + Next.js Full stack Authentication Demo

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) to demonstrate end-to-end authentication in Next.js applications with Asgardeo.

## Setting up development Environment

1. Clone the repository.
2. Install dependencies

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

3. Create `.env` file and update it with the credentials.

```bash
ASGARDEO_CLIENT_ID=<client-id-of-the-application-created-in-your-asgardeo-org>
ASGARDEO_CLIENT_SECRET=<client-secret-of-the-application-created-in-your-asgardeo-org>
ASGARDEO_ORGANIZATION_NAME=<your-asgardeo-organization-name>
ASGARDEO_ISSUER=https://api.asgardeo.io/t/<asgardeo-organization-name>/oauth2/token
NEXT_PUBLIC_ASGARDEO_SERVER_ORIGIN=https://api.asgardeo.io/t/<asgardeo-organization-name>
NEXT_PUBLIC_ASGARDEO_POST_LOGOUT_REDIRECT_URI=http://localhost:3000
NEXTAUTH_SECRET=<seed-string-for-scret-generation>
```

4. Run in development mode

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
