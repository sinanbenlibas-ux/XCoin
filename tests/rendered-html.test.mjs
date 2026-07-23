import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
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

test("server-renders the XQNT Coin launch page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>XQNT Coin — X Quantum Network Token<\/title>/i);
  assert.match(html, /The next chapter/);
  assert.match(html, /Website live/i);
  assert.match(html, /Token pre-launch/i);
  assert.match(html, /X Quantum Network Token/i);
  assert.match(html, /1,000,000,000/);
  assert.match(html, /Proposed tokenomics/i);
  assert.match(html, /No presale or contract address\./i);
  assert.match(html, /Nothing on this website is financial advice/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
  assert.doesNotMatch(html, /wallet-connect|presale checkout/i);
  assert.doesNotMatch(html, /Follow on X|Join Telegram/i);
  assert.match(html, /href="\/login"/i);
  assert.match(html, /href="\/cookies"/i);
});

test("server-renders the secure portal without collecting passwords", async () => {
  const response = await render("/login");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /One signature\. Zero transactions\./i);
  assert.doesNotMatch(html, /Preview mode/i);
  assert.doesNotMatch(html, /type="password"/i);
});

test("server-renders the cookies policy", async () => {
  const response = await render("/cookies");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Cookies Policy/i);
  assert.match(html, /xqnt_cookie_consent/i);
  assert.match(html, /does not currently run analytics/i);
});

for (const [path, title] of [
  ["/privacy", "Privacy Policy"],
  ["/terms", "Terms of Use"],
  ["/risk", "Risk Disclosure"],
  ["/security", "Security &amp; Transparency"],
]) {
  test(`server-renders ${path}`, async () => {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(title, "i"));
  });
}

test("wallet nonce endpoint fails closed without a server secret", async () => {
  const response = await render("/api/auth/nonce");
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { error: "AUTH_NOT_CONFIGURED" });
});

test("token allocation totals one hundred percent", () => {
  const allocations = [40, 20, 20, 15, 5];
  assert.equal(
    allocations.reduce((total, allocation) => total + allocation, 0),
    100,
  );
});
