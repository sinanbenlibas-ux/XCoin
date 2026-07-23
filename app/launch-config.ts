export type VerifiedAddress = `0x${string}`;

export type LaunchConfig = {
  phase: "prelaunch" | "testnet" | "live";
  chain: {
    name: "Base";
    chainId: 8453;
    explorer: string;
  };
  contract: {
    address: VerifiedAddress | null;
    verified: boolean;
    explorerUrl: string | null;
  };
  pool: {
    address: VerifiedAddress | null;
    url: string | null;
    dex: "Uniswap v3";
    pair: "XQNT/USDC";
    feeTier: "0.30%";
    initialXqnt: "100,000,000";
    initialUsdc: "1,000";
    lpController: "2-of-3 Liquidity Safe";
    withdrawable: true;
  };
  safes: {
    community: VerifiedAddress | null;
    liquidity: VerifiedAddress | null;
    treasury: VerifiedAddress | null;
    team: VerifiedAddress | null;
    reserve: VerifiedAddress | null;
  };
  vesting: {
    address: VerifiedAddress | null;
    cliffDays: 365;
    linearDays: 1095;
  };
  review: {
    reportUrl: string | null;
    sourceCommit: string | null;
  };
  releaseChecks: {
    legalEntityPublished: boolean;
    writtenLegalOpinion: boolean;
    independentReview: boolean;
    safesVerifiedByTwoPeople: boolean;
  };
};

/**
 * Production source of truth. Keep every address null until the signed Base
 * deployment manifest has been checked independently by two people.
 */
export const launchConfig: LaunchConfig = {
  phase: "prelaunch",
  chain: {
    name: "Base",
    chainId: 8453,
    explorer: "https://basescan.org",
  },
  contract: {
    address: null,
    verified: false,
    explorerUrl: null,
  },
  pool: {
    address: null,
    url: null,
    dex: "Uniswap v3",
    pair: "XQNT/USDC",
    feeTier: "0.30%",
    initialXqnt: "100,000,000",
    initialUsdc: "1,000",
    lpController: "2-of-3 Liquidity Safe",
    withdrawable: true,
  },
  safes: {
    community: null,
    liquidity: null,
    treasury: null,
    team: null,
    reserve: null,
  },
  vesting: {
    address: null,
    cliffDays: 365,
    linearDays: 1095,
  },
  review: {
    reportUrl: null,
    sourceCommit: null,
  },
  releaseChecks: {
    legalEntityPublished: false,
    writtenLegalOpinion: false,
    independentReview: false,
    safesVerifiedByTwoPeople: false,
  },
};

export const tokenIsLive =
  launchConfig.phase === "live" &&
  launchConfig.contract.address !== null &&
  launchConfig.contract.verified &&
  launchConfig.pool.address !== null &&
  Object.values(launchConfig.releaseChecks).every(Boolean);
