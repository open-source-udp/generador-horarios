import { Section, Subject, UDPXLSXRow } from "contracts";
import { readFile, utils } from "xlsx";
import { join, dirname } from "node:path";
import parseTimeBlocks from "./UDPXLSParser/parseTimeBlocks";
import { writeFileSync, existsSync, mkdirSync } from "node:fs";

export default abstract class XLSParser<TUniversityRow> {
  rows: TUniversityRow[];
  fileName: string;
  protected subjectsOutputData: Record<string, Subject> = {};
  protected sectionsOutputData: Record<string, Section> = {};
  constructor(file: string) {
    this.fileName = file;
    const workbook = readFile(file, {});
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    this.rows = utils.sheet_to_json(sheet);
  }

  parseRows() {
    if (Object.keys(this.subjectsOutputData).length) {
      throw new Error("This method can only be called once");
    }

    for (const row of this.rows) {
      this.parseRow(row);
    }
  }

  abstract parseRow(row: TUniversityRow): void;

  getOutputData() {
    return [this.subjectsOutputData, this.sectionsOutputData];
  }

  saveOutputData() {
    const [subjectsOutputData, sectionsOutputData] = this.getOutputData();
    const outputFileName = this.fileName.replace(".xlsx", ".json");

    const subjectOutputFileName = outputFileName.replace(
      "input",
      "output/subjects"
    );
    mkdirSync(dirname(subjectOutputFileName), { recursive: true });
    writeFileSync(
      subjectOutputFileName,
      JSON.stringify(Object.values(subjectsOutputData), null, 2),
      {
        encoding: "utf-8",
      }
    );

    const sectionOutputFileName = outputFileName.replace(
      "input",
      "output/sections"
    );
    mkdirSync(dirname(sectionOutputFileName), { recursive: true });
    writeFileSync(
      sectionOutputFileName,
      JSON.stringify(Object.values(sectionsOutputData), null, 2),
      {
        encoding: "utf-8",
      }
    );
  }
}
