import { Subject, XLSXRow } from "contracts";
import { readFile, utils } from "xlsx";
import { join } from "node:path";
import parseTimeBlocks from "./parseTimeBlocks";
import { writeFileSync } from "fs";

export default class XLSParser {
  rows: XLSXRow[];
  fileName: string;
  private outputData: Record<string, Subject> = {};
  constructor(file: string) {
    this.fileName = file;
    const workbook = readFile(join(__dirname, "../input", file), {});
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    this.rows = utils.sheet_to_json(sheet);
  }

  parseRows() {
    if (Object.keys(this.outputData).length) {
      throw new Error("This method can only be called once");
    }

    for (const row of this.rows) {
      this.parseRow(row);
    }
  }

  parseRow(row: XLSXRow) {
    if (!row.Asignatura || !row.Sección || !row.Horario) {
      return;
    }
    const subjectCode = row.Asignatura;
    const timeBlocks = parseTimeBlocks(row.Horario);
    if (!this.outputData[subjectCode]) {
      this.outputData[subjectCode] = {
        code: subjectCode,
        name: row["Nombre Asig."] || "",
        credits: row["Créditos Asignatura"] || 0,
        references: row["Asig. Referenciadas"]?.split(/\s*,\s*/) ?? [],
        sections: {
          [row.Sección]: {
            code: row.Paquete || '',
            section: row.Sección,
            timeBlocks: [
              ...timeBlocks.map((timeBlock) => ({
                ...timeBlock,
                description: row["Descrip. Evento"] || "",
                isMandatory: !row["Descrip. Evento"]?.includes("OPCIONAL"),
                teacher: row.Profesor || "",
              })),
            ],
          },
        },
      };
    } else {
      if (!this.outputData[subjectCode].sections[row.Sección]) {
        this.outputData[subjectCode].sections[row.Sección] = {
          code: row.Paquete || '',
          section: row.Sección,
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
          this.outputData[subjectCode].sections[row.Sección].timeBlocks.push({
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
    return this.outputData;
  }

  saveOutputData() {
    const outputFileName = this.fileName.replace(".xlsx", ".json");
    const outputPath = join(__dirname, "../output", outputFileName);
    const outputData = this.getOutputData();
    const outputDataString = JSON.stringify(outputData, null, 2);
    writeFileSync(outputPath, outputDataString);
  }
}
