import { readdir } from "node:fs/promises";
import { join } from "node:path";

class Career {
  static #careers: Array<string> = [];
  readonly name: string;
  constructor(name: string) {
    this.name = name;
  }
  static async fetchAll() {
    if (this.#careers.length !== 0) {
      return this.#careers;
    }
    const careers = await readdir(
      join(__dirname, "..", "..", "..", "public", "subjects")
    );
    this.#careers = careers
      .filter((fileName) => fileName.endsWith(".json"))
      .map((career) => career.replace(".json", ""));
    return this.#careers;
  }
}

export default Career;
