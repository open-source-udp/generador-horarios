export interface TimeBlockItem {
  day: "LU" | "MA" | "MI" | "JU" | "VI" | "SA";
  block: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I";
  description: string;
  isMandatory: boolean;
  teacher: string;
}

export interface Section {
  code: string;
  name: string;
  section: string;
  timeBlocks: TimeBlockItem[];
}
