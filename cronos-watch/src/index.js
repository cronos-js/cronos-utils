#!/usr/bin/env node

import { spawn, exec } from "child_process";
import printCronos from "../../tools/printCronos";
import os from "os";
import fs from "fs";

const args = process.argv.slice(2);

const projectType = args[0];

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
  let host;
  let port;

  args.forEach((arg) => {
    if (arg.includes("host")) {
      host = arg.split("=")[1];
    }
    if (arg.includes("port")) {
      port = arg.split("=")[1];
    }
  });

  let fileContent = fs.readFileSync("rspack.config.js", "utf8");

  fileContent = fileContent.replace(/port:\s*\d+/, "port: " + port);
  fileContent = fileContent.replace(
    /host:\s*['"]\S+['"]/,
    'host: "' + host + '"'
  );

  fs.writeFileSync("rspack.config.js", fileContent);

  const rspack = spawn(isWin ? "npx.cmd" : "npx", ["rspack", "serve"]);

  rspack.stderr.on("data", (data) => {
    console.error(`${data}`);
  });

  rspack.stdout.on("data", (data) => {
    reactReload(data, host, port);
  });

  rspack.on("error", (error) => {
    console.error(`${error.message}`);
  });
}

const reactReload = (data, host, port) => {
  printCronos("watch");
  let str = data.toString();
  let regex = /in(.*)/;
  let regexError = /error(.*)/;
  let result = str.match(regex);
  let resultError = str.match(regexError);

  if (resultError) {
    console.log(data.toString());
  } else if (result) {
    console.log("⚡ Ready in:\x1b[33m\x1b[1m" + result[1] + "\x1b[0m\x1b[37m");

    let getIPAddresses = () => {
      let interfaces = os.networkInterfaces();
      let ipAddresses = [];
      for (let name in interfaces) {
        for (let index = 0; index < interfaces[name].length; index++) {
          let _interfaces_name_index = interfaces[name][index],
            address = _interfaces_name_index.address,
            family = _interfaces_name_index.family,
            internal = _interfaces_name_index.internal;
          if (family === "IPv4" && !internal) {
            ipAddresses.push(address);
          }
        }
      }
      return ipAddresses;
    };

    if (host === "0.0.0.0") {
      console.log("\uD83D\uDE80 Server running on:\n");
      getIPAddresses().forEach(function (element) {
        console.log(
          "  →  \x1b[36mhttp://".concat(element, ":").concat(port, "\x1b[37m")
        );
      });
    } else {
      console.log(
        "\uD83D\uDE80 Server running on \x1b[36mhttp://"
          .concat(host, ":")
          //.concat("\x1b[32m8080")
          .concat(port)
          .concat("\x1b[37m")
      );
    }
  }
};
