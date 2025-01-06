import { readdir } from "node:fs/promises";

type Block = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J";

export type TimeBlockData = {
  day: string;
  block: Block;
  description: string; // CATEDRA || AYUDANTIA, etc
  isMandatory: boolean;
  teacher: string;
  secondTeacher?: string;
};

export type SectionData = {
  code: string;
  subjectCode: string;
  section: string; // user friendly section name (ex: "Sección 1")
  timeBlocks: Array<TimeBlockData>;
};

class Section {
  static #sections: Record<string, Array<SectionData>> = {};
  static #cfgSections: SectionData[];

  static async fetchCfgSections() {
    if (this.#cfgSections) {
      return this.#cfgSections;
    }
    const cfgFolder = `FORMACION-GENERAL`;
    const cfgSections = [];
    const files = await readdir(`public/sections/${cfgFolder}`);
    for (const file of files) {
      const sections = await import(`@public/sections/${cfgFolder}/${file}`);
      cfgSections.push(...sections.default);
    }
    this.#cfgSections = cfgSections;
    return cfgSections;
  }

  static async fetchSections(career: string) {
    if (this.#sections[career]) {
      return this.#sections[career];
    }
    const sections = await import(`@public/sections/${career}.json`);
    this.#sections[career] = sections.default;
    return this.#sections[career];
  }

  static async fetchAll(career: string) {
    const sections = await this.fetchSections(career);
    const cfgSections = await this.fetchCfgSections();
    return [...sections, ...cfgSections];
  }
}

export default Section;
