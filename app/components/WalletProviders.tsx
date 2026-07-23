"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { base, bsc, mainnet } from "@reown/appkit/networks";
import { type ReactNode } from "react";
import { WagmiProvider } from "wagmi";

const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID ?? "";
const networks: [typeof mainnet, typeof base, typeof bsc] = [
  mainnet,
  base,
  bsc,
];
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
  },
});

const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
  ssr: true,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  defaultNetwork: mainnet,
  metadata: {
    name: "XQNT Coin",
    description:
      "Secure member access for the XQNT Coin community portal.",
    url:
      process.env.NEXT_PUBLIC_SITE_URL ??
      (typeof window === "undefined"
        ? "https://www.xqntcoin.com"
        : window.location.origin),
    icons: ["https://www.xqntcoin.com/xqnt-logo.png"],
  },
  features: {
    analytics: false,
    email: false,
    socials: false,
  },
  themeMode: "dark",
  themeVariables: {
    "--w3m-accent": "#21d4fd",
    "--w3m-border-radius-master": "2px",
  },
});

export default function WalletProviders({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
