import { Block, Day, Section, Subject, TimeBlockItem } from "contracts";

export function getNumberFromString(str: string) {
  const matches = str.match(/\d+/g);
  if (matches) {
    return parseInt(matches[0]);
  }
  return 0;
}

const sectionsCache = new Map<string, Section[]>();

export function getSectionsFromSubjectCode(
  data: Section[],
  subjectCode: string
) {
  if (!data.length) return [];
  if (!sectionsCache.has(subjectCode)) {
    sectionsCache.set(
      subjectCode,
      data
        .filter((section) => section.subjectCode === subjectCode)
        .sort((a, b) => {
          return (
            getNumberFromString(a.section) - getNumberFromString(b.section)
          );
        })
    );
  }
  return sectionsCache.get(subjectCode);
}

export function getScheduleFromTimeBlocks<T extends TimeBlockItem>(
  timeBlocks: T[]
) {
  const schedule = timeBlocks.reduce((acc, timeBlock) => {
    if (!acc[timeBlock.block]) acc[timeBlock.block] = {} as Record<Day, T>;
    acc[timeBlock.block][timeBlock.day] = timeBlock;
    return acc;
  }, {} as Record<Block, Record<Day, T>>);
  return schedule;
}

export function timeBlocksDontOverlap(timeBlocks: TimeBlockItem[]): boolean {
  const usedTimeBlocks = new Set<string>();
  for (const timeBlock of timeBlocks) {
    const key = `${timeBlock.day}-${timeBlock.block}`;
    if (usedTimeBlocks.has(key)) {
      return false;
    }
    usedTimeBlocks.add(key);
  }
  return true;
}

// type SubjectInfoWithNullableSection = {
//   subjectInfo: Subject;
//   sectionInfo: Section | null;
//   possibleSections: Section[] | null;
// }
// type SubjectInfoWithNullableSection =
//   | {
//       subjectInfo: Subject;
//       sectionInfo: Section;
//       possibleSections: null;
//     }
//   | { subjectInfo: Subject; sectionInfo: null; possibleSections: Section[] };

export type AlreadySelectedSubject = {
  subjectInfo: Subject;
  sectionInfo: Section;
};

export type NotSelectedSubject = {
  subjectInfo: Subject;
  possibleSections: Section[];
};

// export function generateScheduling(
//   subjects: SubjectInfoWithNullableSection[]
// ): SubjectInfoWithSection[] {
//   // generates a schedule finding a possible section for each subject with a sectionInfo of null that doesn't have timeBlock overlaps with other selected subject
//   const alreadySelectedSections = subjects.filter(
//     (subject) => subject.sectionInfo
//   );

// }

export function generateScheduling(
  {
    alreadySelectedSubjects,
    notSelectedSubjects,
  }: {
    alreadySelectedSubjects: AlreadySelectedSubject[];
    notSelectedSubjects: NotSelectedSubject[];
  },
): AlreadySelectedSubject[] | null {
  // generates a schedule finding a possible section for each subject in notSelectedSubjects that doesn't have timeBlock overlaps with other selected subject
  if (!notSelectedSubjects.length) {
    return alreadySelectedSubjects;
  }
  const subject = notSelectedSubjects[0];
  const possibleSections = subject.possibleSections;
  for (const section of possibleSections) {
    const subjectWithSection = {
      subjectInfo: subject.subjectInfo,
      sectionInfo: section,
    };
    const newAlreadySelectedSubjects = [...alreadySelectedSubjects, subjectWithSection];
    const timeBlocks = newAlreadySelectedSubjects.map(
      (subject) => subject.sectionInfo.timeBlocks
    );
    if (timeBlocksDontOverlap(timeBlocks.flat())) {
      const result = generateScheduling({
        alreadySelectedSubjects: newAlreadySelectedSubjects,
        notSelectedSubjects: notSelectedSubjects.slice(1),
      });
      if (result) {
        return result;
      }
    }
  }
  return null;
}