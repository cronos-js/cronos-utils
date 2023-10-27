#!/usr/bin/env node
import { spawn, exec } from "child_process";
import os from "os";
var args = process.argv.slice(2);
var projectType = args[0];
console.clear();
console.clear();
console.log("\x1b[31m---------------------");
console.log("\x1b[31m|  \x1b[37mCronos Watch \uD83D\uDD25  \x1b[31m|");
console.log("\x1b[31m---------------------\x1b[37m");
var isWin = os.platform() === "win32" || os.platform() === "win64";
if (projectType == "--express") {
    spawn(isWin ? "npx.cmd" : "npx", [
        "nodemon",
        "--exec",
        "ts-node",
        "src/index.ts"
    ], {
        stdio: "inherit"
    });
} else if (projectType == "--react") {
    var rspack = spawn(isWin ? "npx.cmd" : "npx", [
        "rspack",
        "serve"
    ]);
    rspack.stdout.on("data", function(data) {
        console.log("".concat(data));
    });
    rspack.stderr.on("data", function(data) {
        console.error("".concat(data));
    });
    rspack.on("error", function(error) {
        console.error("".concat(error.message));
    });
}

