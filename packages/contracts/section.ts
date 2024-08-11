export type Block = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I";
export type Day = "LU" | "MA" | "MI" | "JU" | "VI" | "SA";
export interface TimeBlockItem {
  block: Block;
  day: Day;
  description: string;
  isMandatory: boolean;
  teacher: string;
  secondTeacher?: string;
}

export interface Section {
  code: string;
  subjectCode: string;
  section: string;
  timeBlocks: TimeBlockItem[];
}
