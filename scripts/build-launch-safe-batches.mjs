import {
  createPublicClient,
  encodeFunctionData,
  getAddress,
  http,
  parseAbi,
  zeroAddress,
} from "viem";
import { base, baseSepolia } from "viem/chains";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { sqrtRatioX96 } from "./lib/launch-math.mjs";

const ALLOCATION = {
  community: 400_000_000n * 10n ** 18n,
  liquidity: 200_000_000n * 10n ** 18n,
  treasury: 200_000_000n * 10n ** 18n,
  team: 150_000_000n * 10n ** 18n,
  reserve: 50_000_000n * 10n ** 18n,
};
const POOL_XQNT = 100_000_000n * 10n ** 18n;
const POOL_USDC = 1_000n * 10n ** 6n;
const FEE = 3_000;
const TICK_LOWER = -887_220;
const TICK_UPPER = 887_220;
const BASE_USDC = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

const deployments = {
  8453: {
    chain: base,
    usdc: BASE_USDC,
    factory: "0x33128a8fC17869897dcE68Ed026d694621f6FDfD",
    positionManager: "0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1",
  },
  84532: {
    chain: baseSepolia,
    usdc: process.env.MOCK_USDC,
    factory: "0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24",
    positionManager: "0x27F971cb582BF9E50F397e4d29a5C7A34f11faA2",
  },
};

const erc20Abi = parseAbi([
  "function transfer(address to,uint256 value) returns (bool)",
  "function approve(address spender,uint256 value) returns (bool)",
]);
const factoryAbi = parseAbi([
  "function getPool(address tokenA,address tokenB,uint24 fee) view returns (address pool)",
]);
const poolAbi = parseAbi([
  "function slot0() view returns (uint160 sqrtPriceX96,int24 tick,uint16 observationIndex,uint16 observationCardinality,uint16 observationCardinalityNext,uint8 feeProtocol,bool unlocked)",
]);
const positionManagerAbi = parseAbi([
  "function createAndInitializePoolIfNecessary(address token0,address token1,uint24 fee,uint160 sqrtPriceX96) payable returns (address pool)",
  "function mint((address token0,address token1,uint24 fee,int24 tickLower,int24 tickUpper,uint256 amount0Desired,uint256 amount1Desired,uint256 amount0Min,uint256 amount1Min,address recipient,uint256 deadline) params) payable returns (uint256 tokenId,uint128 liquidity,uint256 amount0,uint256 amount1)",
]);

const chainId = readInteger("CHAIN_ID", 84532);
const deployment = deployments[chainId];
if (!deployment) throw new Error("CHAIN_ID must be Base (8453) or Base Sepolia (84532).");
if (chainId === 8453) {
  requireExact("XQNT_MAINNET_ACK", "LEGAL_SAFE_AUDIT_VERIFIED");
}

const addresses = {
  distributionSafe: readAddress("DISTRIBUTION_SAFE"),
  communitySafe: readAddress("COMMUNITY_SAFE"),
  liquiditySafe: readAddress("LIQUIDITY_SAFE"),
  treasurySafe: readAddress("TREASURY_SAFE"),
  teamSafe: readAddress("TEAM_SAFE"),
  reserveSafe: readAddress("RESERVE_SAFE"),
  token: readAddress("XQNT_TOKEN"),
  vesting: readAddress("TEAM_VESTING"),
  usdc: readAddressValue(
    deployment.usdc,
    chainId === 8453 ? "Base USDC" : "MOCK_USDC",
  ),
  factory: getAddress(deployment.factory),
  positionManager: getAddress(deployment.positionManager),
};

if (addresses.distributionSafe !== addresses.treasurySafe) {
  console.warn("Warning: DISTRIBUTION_SAFE differs from TREASURY_SAFE.");
}

const deadline = readInteger("LIQUIDITY_DEADLINE");
const now = Math.floor(Date.now() / 1_000);
if (deadline <= now || deadline > now + 86_400) {
  throw new Error("LIQUIDITY_DEADLINE must be within the next 24 hours.");
}

const rpcUrl =
  chainId === 8453 ? process.env.BASE_RPC_URL : process.env.BASE_SEPOLIA_RPC_URL;
if (!rpcUrl) {
  throw new Error(
    `${chainId === 8453 ? "BASE_RPC_URL" : "BASE_SEPOLIA_RPC_URL"} is required for the pool preflight.`,
  );
}

await preflightPool();

const [token0, token1] =
  BigInt(addresses.token) < BigInt(addresses.usdc)
    ? [addresses.token, addresses.usdc]
    : [addresses.usdc, addresses.token];
const amount0Desired = token0 === addresses.token ? POOL_XQNT : POOL_USDC;
const amount1Desired = token0 === addresses.token ? POOL_USDC : POOL_XQNT;
const sqrtPriceX96 = sqrtRatioX96(amount1Desired, amount0Desired);

const allocations = [
  transfer(addresses.communitySafe, ALLOCATION.community),
  transfer(addresses.liquiditySafe, ALLOCATION.liquidity),
  transfer(addresses.treasurySafe, ALLOCATION.treasury),
  transfer(addresses.vesting, ALLOCATION.team),
  transfer(addresses.reserveSafe, ALLOCATION.reserve),
];
const liquidity = [
  approve(addresses.token, addresses.positionManager, POOL_XQNT),
  approve(addresses.usdc, addresses.positionManager, POOL_USDC),
  raw(
    addresses.positionManager,
    encodeFunctionData({
      abi: positionManagerAbi,
      functionName: "createAndInitializePoolIfNecessary",
      args: [token0, token1, FEE, sqrtPriceX96],
    }),
  ),
  raw(
    addresses.positionManager,
    encodeFunctionData({
      abi: positionManagerAbi,
      functionName: "mint",
      args: [{
        token0,
        token1,
        fee: FEE,
        tickLower: TICK_LOWER,
        tickUpper: TICK_UPPER,
        amount0Desired,
        amount1Desired,
        amount0Min: (amount0Desired * 995n) / 1_000n,
        amount1Min: (amount1Desired * 995n) / 1_000n,
        recipient: addresses.liquiditySafe,
        deadline: BigInt(deadline),
      }],
    }),
  ),
  approve(addresses.token, addresses.positionManager, 0n),
  approve(addresses.usdc, addresses.positionManager, 0n),
];

const outputDirectory = path.resolve("contracts", "deployments", "generated");
await mkdir(outputDirectory, { recursive: true });
await writeJson(
  path.join(outputDirectory, `${chainId}-01-allocations.json`),
  builderFile("XQNT allocations", addresses.distributionSafe, allocations),
);
await writeJson(
  path.join(outputDirectory, `${chainId}-02-uniswap-v3-liquidity.json`),
  builderFile(
    "XQNT / USDC initial Uniswap v3 liquidity",
    addresses.liquiditySafe,
    liquidity,
  ),
);
await writeJson(path.join(outputDirectory, `${chainId}-launch-preview.json`), {
  generatedAt: new Date().toISOString(),
  chainId,
  addresses,
  pool: {
    pair: "XQNT/USDC",
    fee: FEE,
    token0,
    token1,
    sqrtPriceX96,
    tickLower: TICK_LOWER,
    tickUpper: TICK_UPPER,
    xqnt: POOL_XQNT,
    usdc: POOL_USDC,
    liquidityNftRecipient: addresses.liquiditySafe,
    deadline,
  },
  warnings: [
    "Import and simulate each batch in Safe before signing.",
    "The LP NFT is controlled by the 2-of-3 Liquidity Safe and remains withdrawable.",
    "Do not execute if an address differs from the signed deployment manifest.",
  ],
});

console.log(`Safe batches written to ${outputDirectory}`);
console.log(`sqrtPriceX96: ${sqrtPriceX96}`);
console.log(`token0: ${token0}`);
console.log(`token1: ${token1}`);

async function preflightPool() {
  const client = createPublicClient({
    chain: deployment.chain,
    transport: http(rpcUrl),
  });
  const pool = await client.readContract({
    address: addresses.factory,
    abi: factoryAbi,
    functionName: "getPool",
    args: [addresses.token, addresses.usdc, FEE],
  });
  if (pool === zeroAddress) {
    console.log("Pool preflight: no existing 0.30% pool.");
    return;
  }
  const slot0 = await client.readContract({
    address: pool,
    abi: poolAbi,
    functionName: "slot0",
  });
  if (slot0[0] !== 0n) {
    throw new Error(
      `STOP: existing initialized 0.30% pool found at ${pool}. No batch was generated.`,
    );
  }
  console.log(`Pool preflight: existing uninitialized pool at ${pool}.`);
}

function transfer(to, value) {
  return raw(addresses.token, encodeFunctionData({
    abi: erc20Abi,
    functionName: "transfer",
    args: [to, value],
  }));
}

function approve(token, spender, value) {
  return raw(token, encodeFunctionData({
    abi: erc20Abi,
    functionName: "approve",
    args: [spender, value],
  }));
}

function raw(to, data) {
  return {
    to,
    value: "0",
    data,
    contractMethod: null,
    contractInputsValues: null,
  };
}

function builderFile(name, safeAddress, transactions) {
  return {
    version: "1.0",
    chainId: String(chainId),
    createdAt: Date.now(),
    meta: {
      name,
      description: "Generated locally. Simulate and verify every address before signing.",
      txBuilderVersion: "1.18.0",
      createdFromSafeAddress: safeAddress,
      createdFromOwnerAddress: "",
    },
    transactions,
  };
}

function readAddress(name) {
  return readAddressValue(process.env[name], name);
}

function readAddressValue(value, name) {
  if (!value) throw new Error(`${name} is required.`);
  return getAddress(value);
}

function readInteger(name, fallback) {
  const value = process.env[name] ?? fallback;
  if (value === undefined || !/^\d+$/.test(String(value))) {
    throw new Error(`${name} must be an unsigned integer.`);
  }
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed)) throw new Error(`${name} is too large.`);
  return parsed;
}

function requireExact(name, expected) {
  if (process.env[name] !== expected) {
    throw new Error(`${name} must equal ${expected}.`);
  }
}

async function writeJson(file, value) {
  await writeFile(
    file,
    `${JSON.stringify(value, (_, item) =>
      typeof item === "bigint" ? item.toString() : item, 2)}\n`,
    "utf8",
  );
}
