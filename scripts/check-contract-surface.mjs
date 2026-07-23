import { readFile } from "node:fs/promises";

const artifact = JSON.parse(
  await readFile("contracts/out/XQNTToken.sol/XQNTToken.json", "utf8"),
);
const functions = artifact.abi
  .filter((entry) => entry.type === "function")
  .map(
    (entry) =>
      `${entry.name}(${entry.inputs.map((input) => input.type).join(",")})`,
  )
  .sort();

const forbidden = [
  "mint",
  "pause",
  "unpause",
  "blacklist",
  "setFee",
  "owner",
  "permit",
  "upgradeTo",
  "upgradeToAndCall",
];
const found = functions.filter((signature) =>
  forbidden.some((name) => signature.startsWith(`${name}(`)),
);
if (found.length) {
  throw new Error(`Forbidden contract surface found: ${found.join(", ")}`);
}

for (const signature of [
  "allowance(address,address)",
  "approve(address,uint256)",
  "balanceOf(address)",
  "decimals()",
  "name()",
  "symbol()",
  "totalSupply()",
  "transfer(address,uint256)",
  "transferFrom(address,address,uint256)",
]) {
  if (!functions.includes(signature)) {
    throw new Error(`Required ERC-20 function missing: ${signature}`);
  }
}

console.log("XQNTToken ABI surface is fixed ERC-20 only.");
console.log(functions.join("\n"));
