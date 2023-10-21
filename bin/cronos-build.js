#!/usr/bin/env node

import os from "os";

import { exec } from "child_process";

const arch = os.arch();
const platform = os.platform();

const args = process.argv.slice(2);

console.log("Cronos Build 🔥");

const error = () => console.log("Architecture not supported.");

if (platform == "darwin") {
  null;
} else if (platform == "win32" || platform == "win64") {
  if (arch == "x64") {
    exec(
      `npx cronos-build-x86_64-pc-windows-gnu ${args[0]}`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`${stderr}`);
          return;
        }
        console.log(`${stdout}`);
      }
    );
  } else {
    error();
  }
} else if (platform == "linux") {
  if (arch == "x64") {
    exec(
      `npx cronos-build-x86_64-unknown-linux-musl ${args[0]}`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`${stderr}`);
          return;
        }
        console.log(`${stdout}`);
      }
    );
  } else {
    error();
  }
}
