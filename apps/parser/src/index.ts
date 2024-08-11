import { readdirSync, lstatSync } from "fs";
import { join } from "path";

import UDPXLSParser from "./UDPXLSParser";

const inputFiles = [];
const walkSync = (dir: string, fileList: string[] = []) => {
  const files = readdirSync(dir);
  files.forEach((file) => {
    if (lstatSync(join(dir, file)).isDirectory()) {
      fileList = walkSync(join(dir, file), fileList);
    } else if (file.endsWith(".xls") || file.endsWith(".xlsx")) {
      fileList.push(join(dir, file));
    }
  });
  return fileList;
};
inputFiles.push(...walkSync(join(__dirname, "../input")));

for (const file of inputFiles) {
  console.log(`Parsing ${file}`);
  const xlsParser = new UDPXLSParser(file);
  xlsParser.parseRows();
  console.log(`Saving output for ${file}`);
  xlsParser.saveOutputData();
}
