import { argv as args } from "node:process";
import { readFile, writeFile, mkdir, stat } from "fs/promises";
import path, { dirname } from "node:path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
// the .js extension is used here for the compiled code ESM import
// TODO: handle it more neatly as part of the build step using something like `esbuild` instead
import audit from "./audit.js";

const runAudit = async (inputPath: string, outputPath: string) => {
  console.log(chalk.blue.bold(`Reading ${inputPath}`));

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const input = await readFile(`${__dirname}/${inputPath}`, "utf-8");
  const auditResult = audit(input);

  try {
    await stat(dirname(`${__dirname}/${outputPath}`));
  } catch {
    await mkdir(dirname(`${__dirname}/${outputPath}`));
  }

  console.log(chalk.green.bold(`Writing ${outputPath}`));
  writeFile(`${__dirname}/${outputPath}`, auditResult);
};

const { argv } = yargs(hideBin(args));
const inputPath = "in" in argv && argv.in;
const outputPath = "out" in argv && argv.out;

if (inputPath && outputPath) {
  runAudit(inputPath.toString(), outputPath.toString());
} else {
  if (!inputPath) {
    console.log(chalk.red.bold("Please provide an input path"));
  }
  if (!outputPath) {
    console.log(chalk.red.bold("Please provide an output path"));
  }
}
