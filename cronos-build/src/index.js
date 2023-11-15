#!/usr/bin/env node

import { exec } from "child_process";
import printCronos from "../../tools/printCronos";

const args = process.argv.slice(2);

const projectType = args[0];

printCronos("build");

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

    let regex = /swc(.*)/;
    let match = stdout.match(regex);
    const time = match[1].replace(/\s/g, "").replace(/\(|\)/g, "");
    console.log(`⚡ Build in \x1b[33m\x1b[1m${time}\x1b[0m\x1b[37m`);
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

    if (stdout) {
      let regex = /in(.*)/;
      let match = stdout.match(regex);
      console.log(`⚡ Build in \x1b[33m\x1b[1m${match[0]}\x1b[0m\x1b[37m`);
      return;
    }
  });
}
