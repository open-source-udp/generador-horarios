import { UDPXLSXRow } from "contracts";
import XLSParser from "../XLSParser";
import parseTimeBlocks from "./parseTimeBlocks";

export class UDPXLSParser extends XLSParser<UDPXLSXRow> {
  parseRow(row: UDPXLSXRow) {
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
          const timeBlockExists = this.sectionsOutputData[
            sectionCode
          ].timeBlocks.find(
            (block) =>
              block.day === timeBlock.day && block.block === timeBlock.block
          );
          if (timeBlockExists) {
            timeBlockExists.secondTeacher = row.Profesor || "";
            continue;
          }
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
}

export default UDPXLSParser;
