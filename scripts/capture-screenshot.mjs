import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function captureScreenshot(url, outputPath, width = 1440, height = 900) {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const port = 9222;
  const tempDir = path.join(process.env.TEMP || "C:\\temp", `chrome_${Date.now()}`);

  const chromeProc = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${tempDir}`,
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    `--window-size=${width},${height}`,
    "about:blank",
  ]);

  try {
    let wsUrl = null;
    for (let i = 0; i < 30; i++) {
      await sleep(300);
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: "PUT" });
        const data = await res.json();
        if (data.webSocketDebuggerUrl) {
          wsUrl = data.webSocketDebuggerUrl;
          break;
        }
      } catch (e) {
        // waiting for chrome to bind
      }
    }

    if (!wsUrl) {
      throw new Error("Could not connect to Chrome debugging endpoint");
    }

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

    // Set viewport
    await send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 768,
    });

    // Wait for network/page load
    await sleep(2500);

    // Capture screenshot
    const shot = await send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });

    if (shot && shot.data) {
      await fs.writeFile(outputPath, Buffer.from(shot.data, "base64"));
      console.log(`Saved screenshot to ${outputPath} (${width}x${height})`);
    } else {
      throw new Error("No screenshot data received");
    }

    ws.close();
  } finally {
    chromeProc.kill();
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch {}
  }
}

// CLI usage: node scripts/capture-screenshot.mjs <url> <outputPath> <width> <height>
if (process.argv[2]) {
  const url = process.argv[2];
  const out = process.argv[3] || "screenshot.png";
  const w = parseInt(process.argv[4] || "1440", 10);
  const h = parseInt(process.argv[5] || "900", 10);
  captureScreenshot(url, out, w, h).catch(console.error);
}
