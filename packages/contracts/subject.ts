import { Section } from "./section";

export interface Subject {
  code: string;
  name: string;
  credits: number;
  references: string[];
  sections: Record<string, Section>;
}
