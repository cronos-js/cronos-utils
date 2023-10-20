#!/usr/bin/env node

import os from "os";
import { exec } from "child_process";

const platform = os.platform();

const args = process.argv.slice(2);

if (platform == "darwin") {
  null;
} else if (platform == "win32" || platform == "win64") {
  console.log("Cronos Build 🔥");

  exec(`npx cronos-build-windows ${args[0]}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
} else if (platform == "linux") {
  console.log("Cronos Build 🔥");

  exec(`npx cronos-build-linux ${args[0]}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}
