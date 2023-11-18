#!/usr/bin/env node
var j=Object.create;var u=Object.defineProperty;var T=Object.getOwnPropertyDescriptor;var I=Object.getOwnPropertyNames;var P=Object.getPrototypeOf,_=Object.prototype.hasOwnProperty;var A=(e,o,r,n)=>{if(o&&typeof o=="object"||typeof o=="function")for(let s of I(o))!_.call(e,s)&&s!==r&&u(e,s,{get:()=>o[s],enumerable:!(n=T(o,s))||n.enumerable});return e};var m=(e,o,r)=>(r=e!=null?j(P(e)):{},A(o||!e||!e.__esModule?u(r,"default",{value:e,enumerable:!0}):r,e));var x=require("child_process");var F=async e=>{switch(console.clear(),console.log("\x1B[33m\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\x1B[37m"),e){case"build":console.log("    \x1B[33m\x1B[1m\x1B[37mCronos Build \u{1F525}  \x1B[0m\x1B[31m");break;case"watch":console.log("    \x1B[33m\x1B[1m\x1B[37mCronos Watch \u{1F525}  \x1B[0m\x1B[31m");break;case"preview":console.log("   \x1B[33m\x1B[1m\x1B[37mCronos Preview \u{1F525}  \x1B[0m\x1B[31m");break;default:break}console.log("\x1B[33m\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\x1B[37m")},g=F;var c=m(require("os")),p=m(require("fs"));var a=m(require("fs")),h=e=>{let o=a.default.existsSync("src/index.ts"),r=a.default.existsSync("src/index.js");!o&&!r?(console.log("[\u274C] index.ts or index.js not found in src folder."),process.exit(1)):e(o)};var w=process.argv.slice(2),y=w[0],S=c.default.platform()==="win32"||c.default.platform()==="win64";if(y=="--express")h(e=>{nodemonComand=e?["nodemon","--exec","ts-node","src/index.ts"]:["nodemon","src/index.js"],(0,x.spawn)(S?"npx.cmd":"npx",nodemonComand,{stdio:"inherit"})});else if(y=="--react"){let e="localhost",o=5173;w.forEach(s=>{s.includes("host")&&(e=s.split("=")[1]),s.includes("port")&&(o=s.split("=")[1])});let r=p.default.readFileSync("rspack.config.js","utf8");r=r.replace(/port:\s*\d+/,"port: "+o),r=r.replace(/host:\s*['"]\S+['"]/,'host: "'+e+'"'),p.default.writeFileSync("rspack.config.js",r);let n=(0,x.spawn)(S?"npx.cmd":"npx",["rspack","serve"]);n.stderr.on("data",s=>{console.error(`${s}`)}),n.stdout.on("data",s=>{R(s,e,o)}),n.on("error",s=>{console.error(`${s.message}`)})}var R=(e,o,r)=>{g("watch");let n=e.toString(),s=/in(.*)/,k=/error(.*)/,d=n.match(s);if(n.match(k))console.log(e.toString());else if(d){console.log("\u26A1 Ready in:\x1B[33m\x1B[1m"+d[1]+"\x1B[0m\x1B[37m");let v=()=>{let t=c.default.networkInterfaces(),f=[];for(let b in t)for(let l=0;l<t[b].length;l++){let i=t[b][l],C=i.address,D=i.family,E=i.internal;D==="IPv4"&&!E&&f.push(C)}return f};o==="0.0.0.0"?(console.log(`\u{1F680} Server running on:
`),v().forEach(function(t){console.log("  \u2192  \x1B[36mhttp://".concat(t,":").concat(r,"\x1B[37m"))})):console.log("\u{1F680} Server running on \x1B[36mhttp://".concat(o,":").concat(r).concat("\x1B[37m"))}};
