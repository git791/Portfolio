import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const artifactDir = "C:\\Users\\moham\\.gemini\\antigravity\\brain\\b94c8583-4d60-4ed1-ac9d-2b023b8b00e6";
const port = 9223;
const serverPort = 3456;
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const tempDir = path.join(process.env.TEMP || "C:\\temp", `chrome_phase5_${Date.now()}`);

// Start Next.js server
const serverProc = spawn("node", ["node_modules/next/dist/bin/next", "start", "-p", String(serverPort)], {
  stdio: "ignore",
});

await sleep(3000);

const chromeProc = spawn(chromePath, [
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${tempDir}`,
  "--headless=new",
  "--disable-gpu",
  "--no-first-run",
  "--no-default-browser-check",
  "--window-size=1440,900",
  "about:blank",
]);

try {
  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    await sleep(300);
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      const data = await res.json();
      if (data.webSocketDebuggerUrl) {
        wsUrl = data.webSocketDebuggerUrl;
        break;
      }
    } catch {}
  }

  if (!wsUrl) throw new Error("Could not connect to Chrome debugging endpoint");

  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const reqId = id++;
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === reqId) {
          ws.removeEventListener("message", handler);
          resolve(msg.result);
        }
      };
      ws.addEventListener("message", handler);
      ws.send(JSON.stringify({ id: reqId, method, params }));
    });
  }

  // Create target page
  const target = await send("Target.createTarget", { url: "about:blank" });
  const targetWs = new WebSocket(`ws://127.0.0.1:${port}/devtools/page/${target.targetId}`);
  await new Promise((resolve, reject) => {
    targetWs.onopen = resolve;
    targetWs.onerror = reject;
  });

  let pageId = 1;
  function pageSend(method, params = {}) {
    return new Promise((resolve) => {
      const reqId = pageId++;
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === reqId) {
          targetWs.removeEventListener("message", handler);
          resolve(msg.result);
        }
      };
      targetWs.addEventListener("message", handler);
      targetWs.send(JSON.stringify({ id: reqId, method, params }));
    });
  }

  await pageSend("Page.enable");

  const captureJob = async (url, filename, width, height) => {
    await pageSend("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 768,
    });

    await pageSend("Page.navigate", { url });
    await sleep(2500); // Wait for shader & fonts to render

    const shot = await pageSend("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });

    if (shot && shot.data) {
      const outPath = path.join(artifactDir, filename);
      await fs.writeFile(outPath, Buffer.from(shot.data, "base64"));
      console.log(`Captured ${filename} (${width}x${height})`);
    }
  };

  // 1440px captures
  await captureJob(`http://localhost:${serverPort}/?progress=0`, "hero-1440-p0.png", 1440, 900);
  await captureJob(`http://localhost:${serverPort}/?progress=0.5`, "hero-1440-p05.png", 1440, 900);
  await captureJob(`http://localhost:${serverPort}/?progress=1`, "hero-1440-p1.png", 1440, 900);

  // 390px captures (mobile)
  await captureJob(`http://localhost:${serverPort}/?progress=0`, "hero-390-p0.png", 390, 844);
  await captureJob(`http://localhost:${serverPort}/?progress=0.5`, "hero-390-p05.png", 390, 844);
  await captureJob(`http://localhost:${serverPort}/?progress=1`, "hero-390-p1.png", 390, 844);

  // Fallback capture at 1440px
  await captureJob(`http://localhost:${serverPort}/?fallback=1&progress=1`, "hero-1440-fallback.png", 1440, 900);

  // Measure frame time at 1440px
  await pageSend("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await pageSend("Page.navigate", { url: `http://localhost:${serverPort}/?progress=1` });
  await sleep(1500);

  const evalResult = await pageSend("Runtime.evaluate", {
    expression: `
      new Promise((resolve) => {
        let frames = [];
        let last = performance.now();
        function loop(t) {
          frames.push(t - last);
          last = t;
          if (frames.length >= 30) {
            let avg = frames.slice(5).reduce((a, b) => a + b, 0) / (frames.length - 5);
            resolve(avg);
          } else {
            requestAnimationFrame(loop);
          }
        }
        requestAnimationFrame(loop);
      })
    `,
    awaitPromise: true,
    returnByValue: true,
  });

  console.log("Average Frame Time at 1440px (ms):", evalResult?.result?.value);

  targetWs.close();
  ws.close();
} finally {
  chromeProc.kill();
  serverProc.kill();
  try {
    await fs.rm(tempDir, { recursive: true, force: true });
  } catch {}
}
