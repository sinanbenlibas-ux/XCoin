# Deployment manifests

No XQNT contract has been deployed.

Every network deployment must add an immutable JSON manifest here containing:

- chain ID and network name;
- deployment transaction, block, token and vesting addresses;
- constructor arguments;
- all five Safe addresses and their 2-of-3 threshold;
- source commit and release tag;
- compiler, optimizer and EVM settings;
- allocation transaction hashes;
- Uniswap pool, position ID and liquidity transaction hashes;
- legal entity name, legal-opinion digest and independent-review digest;
- two named public-address verification approvals.

Testnet manifests use `base-sepolia.json`; mainnet uses `base.json`. Never copy a
testnet address into the production website.
