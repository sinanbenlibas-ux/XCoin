import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the XCoin launch page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>XCoin — Built for the Community<\/title>/i);
  assert.match(html, /The next chapter/);
  assert.match(html, /Launching soon/i);
  assert.match(html, /1,000,000,000/);
  assert.match(html, /Proposed tokenomics/i);
  assert.match(html, /No presale\. No contract address\./i);
  assert.match(html, /Nothing on this website is financial advice/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
  assert.doesNotMatch(html, /wallet-connect|presale checkout/i);
});

test("token allocation totals one hundred percent", () => {
  const allocations = [40, 20, 20, 15, 5];
  assert.equal(
    allocations.reduce((total, allocation) => total + allocation, 0),
    100,
  );
});
