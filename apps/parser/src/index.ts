import { readdirSync } from "fs";
import { join } from "path";

import XLSParser from "./XLSParser";

const inputFiles = readdirSync(join(__dirname, "../input"));
const outputFolder = join(__dirname, "../output");

for (const file of inputFiles) {
  console.log(`Parsing ${file}`);
  const xlsParser = new XLSParser(file);
  xlsParser.parseRows();
  console.log(`Saving output for ${file}`);
  xlsParser.saveOutputData();
}
