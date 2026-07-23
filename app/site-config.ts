export const siteConfig = {
  brand: {
    name: "XQNT Coin",
    shortName: "XQNT",
    expansion: "X Quantum Network Token",
    domain: "www.xqntcoin.com",
    logo: "/xqnt-logo.png",
  },
  operator: "XQNT Coin Project",
  siteUrl: "https://www.xqntcoin.com",
  repository: "https://github.com/sinanbenlibas-ux/XCoin",
  status: "Website live",
  tokenStatus: "Token pre-launch on Base",
  tokenNetwork: "Base",
  supportedNetworks: ["Ethereum", "Base", "BNB Smart Chain"],
  supply: {
    display: "1,000,000,000",
    value: 1_000_000_000,
  },
} as const;
