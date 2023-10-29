#!/usr/bin/env node

import { spawn, exec } from "child_process";

const args = process.argv.slice(2);

const projectType = args[0];

console.clear();
console.log("\x1b[31m───────────────────────\x1b[37m");
console.log("\x1b[31m    \x1b[37mCronos Build 🔥  \x1b[31m");
console.log("\x1b[31m───────────────────────\x1b[37m");

if (projectType == "--express") {
  exec("npx swc ./src -d build", (error, stdout, stderr) => {
    if (error) {
      console.error(`${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`${stderr}`);
      return;
    }
    console.log(`${stdout}`);
  });
} else if (projectType == "--react") {
  exec("npx rspack build", (error, stdout, stderr) => {
    if (error) {
      console.error(`${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`${stderr}`);
      return;
    }
    console.log(`${stdout}`);
  });
}
