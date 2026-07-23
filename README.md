# XQNT Coin

The official website and read-only wallet portal for **XQNT Coin — X Quantum
Network Token**.

The website is live while the token remains in pre-launch. There is no token
sale, contract address, price, DEX listing, custody, or blockchain transaction
in this release.

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and configure:

```bash
NEXT_PUBLIC_REOWN_PROJECT_ID=your_reown_project_id
NEXT_PUBLIC_SITE_URL=http://localhost:3000
XQNT_AUTH_SECRET=a_random_secret_of_at_least_32_characters
```

Create the Reown Project ID in the Reown Dashboard and allow these origins:

- `http://localhost:3000`
- `https://www.xqntcoin.com`

Never commit `XQNT_AUTH_SECRET`. The wallet portal fails closed when either
required authentication value is missing.

## Wallet authentication

- Reown AppKit, Wagmi, and Viem provide MetaMask, Trust Wallet, and
  WalletConnect-compatible connections.
- Sign-In with Ethereum (EIP-4361) verifies wallet ownership on Ethereum, Base,
  and BNB Smart Chain.
- Nonces are single-use and expire after five minutes.
- Sessions expire after 24 hours and use `HttpOnly`, `Secure`, `SameSite=Lax`
  cookies in production.
- Signing in never asks for a seed phrase, private key, payment, approval, or
  blockchain transaction.

## Validation

```bash
npm run build
npm run lint
npm test
```

Brand and launch details are centralized in `app/site-config.ts`. Authentication
logic lives in `app/lib/wallet-auth.ts`, and the API surface is under
`app/api/auth`.
