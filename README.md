# XQNT Coin

The official website, read-only wallet portal, and reviewed-source workspace for
the planned **XQNT Coin — X Quantum Network Token** Base launch.

The website is live while the token remains pre-launch. There is no token sale,
official contract address, or live DEX pool. Mainnet is gated on the legal
entity, written legal opinion, 2-of-3 Safes, testnet rehearsal, independent
review, funds, and two-person address verification.

## Launch documentation

- [Turkish Base launch runbook](docs/BASE-LANSMAN-RUNBOOK-TR.md)
- [Safe setup and rehearsal](docs/SAFE-KURULUM-VE-PROVA-TR.md)
- [Full Turkish launch guide](docs/XQNT-COIN-LAUNCH-GUIDE-TR.md)

## Website development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and configure the Reown project ID, canonical
site URL, and a random server-side auth secret of at least 32 characters. Never
commit that secret.

Wallet authentication uses EIP-4361, five-minute one-time nonces, and 24-hour
`HttpOnly`, `Secure`, `SameSite=Lax` production sessions. Signing in never
requires a seed phrase, private key, payment, approval, or blockchain
transaction.

## Smart contracts

- Solidity `0.8.36`, OpenZeppelin Contracts `5.6.1`
- fixed `1,000,000,000 XQNT` supply minted once in the constructor
- no owner, external mint, pause, blacklist, transfer tax, permit, proxy, or
  upgrade surface
- team allocation: 365-day lock followed by 1,095-day linear vesting
- Base Sepolia rehearsal before Base mainnet

```bash
git submodule update --init --recursive
forge build --root contracts
forge test --root contracts -vv
node scripts/check-contract-surface.mjs
```

Launch operations never require a seed phrase or raw private key in this
repository. After the public addresses and RPC URL are configured, testnet Safe
Transaction Builder batches are generated with:

```bash
CHAIN_ID=84532 npm run launch:safe-batches
```

## Full validation

```bash
npm run lint
npm test
npm run build
npm run contracts:build
npm run contracts:test
npm run contracts:surface
```

Brand data is centralized in `app/site-config.ts`; verified launch data and
release gates are centralized in `app/launch-config.ts`.
