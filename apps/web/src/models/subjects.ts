import { readdir } from "node:fs/promises";

export type SubjectData = {
  code: string;
  name: string;
  credits: number;
  references: Array<string>;
};

class Subject {
  static #subjects: Record<string, Array<SubjectData>> = {};
  static #cfgSubjects: SubjectData[];

  static async fetchCfgSubjects() {
    if (this.#cfgSubjects) {
      return this.#cfgSubjects;
    }
    const cfgFolder = `FORMACION-GENERAL`;
    const subjects = [];
    const files = await readdir(`public/subjects/${cfgFolder}`);
    for (const file of files) {
      const subject = await import(`@public/subjects/${cfgFolder}/${file}`);
      subjects.push(...subject.default);
    }

    this.#cfgSubjects = subjects;
    return subjects;
  }

  static async fetchSubjects(career: string) {
    if (this.#subjects[career]) {
      return this.#subjects[career];
    }
    const subjects = await import(`@public/subjects/${career}.json`);
    this.#subjects[career] = subjects.default;
    return this.#subjects[career];
  }

  static async fetchAll(career: string) {
    const subjects = await this.fetchSubjects(career);
    const cfgSubjects = await this.fetchCfgSubjects();
    return [...subjects, ...cfgSubjects];
  }
}

export default Subject;
