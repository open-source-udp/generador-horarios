import { Section, Subject, XLSXRow } from "contracts";
import { readFile, utils } from "xlsx";
import { join, dirname } from "node:path";
import parseTimeBlocks from "./parseTimeBlocks";
import { writeFileSync, existsSync, mkdirSync } from "node:fs";

export default class XLSParser {
  rows: XLSXRow[];
  fileName: string;
  private subjectsOutputData: Record<string, Subject> = {};
  private sectionsOutputData: Record<string, Section> = {};
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

  parseRow(row: XLSXRow) {
    if (!row.Asignatura || !row.Horario || !row.Paquete) {
      console.error("Invalid row", row);
      return;
    }
    const subjectCode = row.Asignatura;
    const sectionCode = row.Paquete;
    const timeBlocks = parseTimeBlocks(row.Horario);
    if (!this.subjectsOutputData[subjectCode]) {
      this.subjectsOutputData[subjectCode] = {
        code: subjectCode,
        name: row["Nombre Asig."] || "",
        credits: row["Créditos Asignatura"] || 0,
        references: row["Asig. Referenciadas"]?.split(/\s*,\s*/) ?? [],
      };

      this.sectionsOutputData[sectionCode] = {
        code: sectionCode,
        subjectCode: subjectCode,
        section: row.Sección || "Sección 1",
        timeBlocks: [
          ...timeBlocks.map((timeBlock) => ({
            ...timeBlock,
            description: row["Descrip. Evento"] || "",
            isMandatory: !row["Descrip. Evento"]?.includes("OPCIONAL"),
            teacher: row.Profesor || "",
          })),
        ],
      };
    } else {
      if (!this.sectionsOutputData[sectionCode]) {
        this.sectionsOutputData[sectionCode] = {
          code: row.Paquete || "",
          subjectCode: subjectCode,
          section: row.Sección || "Sección 1",
          timeBlocks: [
            ...timeBlocks.map((timeBlock) => ({
              ...timeBlock,
              description: row["Descrip. Evento"] || "",
              isMandatory: !row["Descrip. Evento"]?.includes("OPCIONAL"),
              teacher: row.Profesor || "",
            })),
          ],
        };
      } else {
        for (const timeBlock of timeBlocks) {
          this.sectionsOutputData[sectionCode].timeBlocks.push({
            ...timeBlock,
            description: row["Descrip. Evento"] || "",
            isMandatory: !row["Descrip. Evento"]?.includes("OPCIONAL"),
            teacher: row.Profesor || "",
          });
        }
      }
    }
  }

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
