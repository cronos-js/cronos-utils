#!/usr/bin/env node

// cronos-build/src/index.js
var import_child_process = require("child_process");

// tools/printCronos.js
var printCronos = async (type) => {
  console.clear();
  console.log("\x1B[33m\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\x1B[37m");
  switch (type) {
    case "build":
      console.log(
        "    \x1B[33m\x1B[1m\x1B[37mCronos Build \u{1F525}  \x1B[0m\x1B[31m"
      );
      break;
    case "watch":
      console.log(
        "    \x1B[33m\x1B[1m\x1B[37mCronos Watch \u{1F525}  \x1B[0m\x1B[31m"
      );
      break;
    case "preview":
      console.log(
        "   \x1B[33m\x1B[1m\x1B[37mCronos Preview \u{1F525}  \x1B[0m\x1B[31m"
      );
      break;
    default:
      break;
  }
  console.log("\x1B[33m\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\x1B[37m");
};
var printCronos_default = printCronos;

// cronos-build/src/index.js
var args = process.argv.slice(2);
var projectType = args[0];
printCronos_default("build");
if (projectType == "--express") {
  (0, import_child_process.exec)("npx swc ./src -d build", (error, stdout, stderr) => {
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
    console.log(`\u26A1 Build in \x1B[33m\x1B[1m${time}\x1B[0m\x1B[37m`);
  });
} else if (projectType == "--react") {
  (0, import_child_process.exec)("npx rspack build", (error, stdout, stderr) => {
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
      console.log(`\u26A1 Build in \x1B[33m\x1B[1m${match[0]}\x1B[0m\x1B[37m`);
      return;
    }
  });
}
