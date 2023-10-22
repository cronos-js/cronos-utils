#!/usr/bin/env node

import { spawn, exec } from "child_process";
import os from "os";

const args = process.argv.slice(2);

const projectType = args[0];

console.clear();

console.clear();
console.log("\x1b[31m---------------------");
console.log("\x1b|  \x1b[37mCronos Watch 🔥  \x1b[31m|");
console.log("\x1b---------------------\x1b[37m");

const isWin = os.platform() === "win32" || os.platform() === "win64";

if (projectType == "--express") {
    spawn(
      isWin ? "npx.cmd" : "npx",
      ["nodemon", "--exec", "ts-node", "src/index.ts"],
      {
        stdio: "inherit",
      }
    );
} else if (projectType == "--react") {
  const rspack = spawn(isWin ? "npx.cmd" : "npx", ["rspack", "serve"]);

  rspack.stdout.on("data", (data) => {
    console.log(`${data}`);
  });

  rspack.stderr.on("data", (data) => {
    console.error(`${data}`);
  });

  rspack.on("error", (error) => {
    console.error(`${error.message}`);
  });
}
