const printCronos = async (type) => {
  console.clear();
  console.log("\x1b[33m───────────────────────\x1b[37m");
  switch (type) {
    case "build":
      console.log(
        "    \x1b[33m\x1b[1m\x1b[37mCronos Build 🔥  \x1b[0m\x1b[31m"
      );

      break;
    case "watch":
      console.log(
        "    \x1b[33m\x1b[1m\x1b[37mCronos Watch 🔥  \x1b[0m\x1b[31m"
      );
      break;
    case "preview":
      console.log(
        "   \x1b[33m\x1b[1m\x1b[37mCronos Preview 🔥  \x1b[0m\x1b[31m"
      );
      break;
    default:
      break;
  }
  console.log("\x1b[33m───────────────────────\x1b[37m");
};

export default printCronos;
