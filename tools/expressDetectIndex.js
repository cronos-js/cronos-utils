import fs from "fs";

/**
 * This function checks if either 'index.ts' or 'index.js' exists in the 'src' directory.
 * If neither file exists, the function logs an error message and terminates the process.
 * If either file exists, it calls the provided callback function with a boolean argument
 * indicating whether 'index.ts' exists.
 *
 * @param {Function} elseFunction - The callback function to be called if either 'index.ts' or 'index.js' exists.
 * This function should accept a single boolean argument indicating whether 'index.ts' exists.
 */
const expressDetectTypescript = (elseFunction) => {
  const expressTS = fs.existsSync("src/index.ts");
  const expressJS = fs.existsSync("src/index.js");

  if (!expressTS && !expressJS) {
    console.log("[❌] index.ts or index.js not found in src folder.");
    process.exit(1);
  } else {
    elseFunction(expressTS);
  }
};

export { expressDetectTypescript };
