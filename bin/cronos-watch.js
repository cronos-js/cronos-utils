#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// cronos-watch/src/index.js
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

// cronos-watch/src/index.js
var import_os = __toESM(require("os"));
var import_fs = __toESM(require("fs"));
var args = process.argv.slice(2);
var projectType = args[0];
var isWin = import_os.default.platform() === "win32" || import_os.default.platform() === "win64";
if (projectType == "--express") {
  (0, import_child_process.spawn)(
    isWin ? "npx.cmd" : "npx",
    ["nodemon", "--exec", "ts-node", "src/index.ts"],
    {
      stdio: "inherit"
    }
  );
} else if (projectType == "--react") {
  let host = "localhost";
  let port = 5173;
  args.forEach((arg) => {
    if (arg.includes("host")) {
      host = arg.split("=")[1];
    }
    if (arg.includes("port")) {
      port = arg.split("=")[1];
    }
  });
  let fileContent = import_fs.default.readFileSync("rspack.config.js", "utf8");
  fileContent = fileContent.replace(/port:\s*\d+/, "port: " + port);
  fileContent = fileContent.replace(
    /host:\s*['"]\S+['"]/,
    'host: "' + host + '"'
  );
  import_fs.default.writeFileSync("rspack.config.js", fileContent);
  const rspack = (0, import_child_process.spawn)(isWin ? "npx.cmd" : "npx", ["rspack", "serve"]);
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
var reactReload = (data, host, port) => {
  printCronos_default("watch");
  let str = data.toString();
  let regex = /in(.*)/;
  let regexError = /error(.*)/;
  let result = str.match(regex);
  let resultError = str.match(regexError);
  if (resultError) {
    console.log(data.toString());
  } else if (result) {
    console.log("\u26A1 Ready in:\x1B[33m\x1B[1m" + result[1] + "\x1B[0m\x1B[37m");
    let getIPAddresses = () => {
      let interfaces = import_os.default.networkInterfaces();
      let ipAddresses = [];
      for (let name in interfaces) {
        for (let index = 0; index < interfaces[name].length; index++) {
          let _interfaces_name_index = interfaces[name][index], address = _interfaces_name_index.address, family = _interfaces_name_index.family, internal = _interfaces_name_index.internal;
          if (family === "IPv4" && !internal) {
            ipAddresses.push(address);
          }
        }
      }
      return ipAddresses;
    };
    if (host === "0.0.0.0") {
      console.log("\u{1F680} Server running on:\n");
      getIPAddresses().forEach(function(element) {
        console.log(
          "  \u2192  \x1B[36mhttp://".concat(element, ":").concat(port, "\x1B[37m")
        );
      });
    } else {
      console.log(
        "\u{1F680} Server running on \x1B[36mhttp://".concat(host, ":").concat(port).concat("\x1B[37m")
      );
    }
  }
};
