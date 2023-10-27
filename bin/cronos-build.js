#!/usr/bin/env node
import { spawn, exec } from "child_process";
var args = process.argv.slice(2);
var projectType = args[0];
console.clear();
console.log("\x1b[31m---------------------");
console.log("\x1b[31m|  \x1b[37mCronos Build \uD83D\uDD25  \x1b[31m|");
console.log("\x1b[31m---------------------\x1b[37m");
if (projectType == "--express") {
    exec("npx swc ./src -d build", function(error, stdout, stderr) {
        if (error) {
            console.error("".concat(error.message));
            return;
        }
        if (stderr) {
            console.error("".concat(stderr));
            return;
        }
        console.log("".concat(stdout));
    });
} else if (projectType == "--react") {
    exec("npx rspack build", function(error, stdout, stderr) {
        if (error) {
            console.error("".concat(error.message));
            return;
        }
        if (stderr) {
            console.error("".concat(stderr));
            return;
        }
        console.log("".concat(stdout));
    });
}

