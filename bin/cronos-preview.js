#!/usr/bin/env node
import express from "express";
import path from "path";
import { exec, spawn } from "child_process";
var args = process.argv.slice(2);
var projectType = args[0];
console.clear();
console.log("\x1b[31m---------------------");
console.log("\x1b[31m| \x1b[37mCronos Preview \uD83D\uDD25 \x1b[31m|");
console.log("\x1b[31m---------------------\x1b[37m");
if (projectType == "--express") {
    spawn("node", [
        "./build/index.js"
    ], {
        stdio: "inherit"
    });
} else if (projectType == "--react") {
    var app = express();
    app.use(express.static("./dist"));
    app.listen(5800);
    console.log("\uD83D\uDE80 Server running on \x1b[33mhttp://localhost:5800\x1b[37m");
}

