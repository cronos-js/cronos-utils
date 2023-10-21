#!/usr/bin/env node

import os from "os";

import { spawn } from "child_process";

const arch = os.arch();

const platform = os.platform();

const args = process.argv.slice(2);

const execPreview = (binarie) => {
  const command = spawn("npx.cmd", [binarie, args[0]]);

  command.stdout.on("data", (data) => {
    console.log(`${data}`);
  });

  command.stderr.on("data", (data) => {
    console.log(`${data}`);
  });

  command.on("error", (error) => {
    console.log(`${error.message}`);
  });
};

console.log("Cronos Preview 🔥");

const error = () => console.log("Architecture not supported.");

if (platform == "darwin") {
  error();
} else if (platform == "win32" || platform == "win64") {
  if (arch == "x64") {
    execPreview("cronos-preview-x86_64-pc-windows-gnu");
  } else {
    error();
  }
} else if (platform == "linux") {
  console.log("Cronos Preview 🔥");

  if (arch == "x64") {
    execPreview("cronos-preview-x86_64-unknown-linux-musl");
  } else {
    error();
  }
}
