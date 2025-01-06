import { TimeBlockItem } from "contracts";

export const timeBlockMappings = {
  "08:30 - 09:50": "A",
  "10:00 - 11:20": "B",
  "10:00 - 11:30": "B",
  "11:30 - 12:50": "C",
  "13:00 - 14:20": "D",
  "14:30 - 15:50": "E",
  "14:30 - 15:20": "E",
  "14:00 - 15:20": "E",
  "16:00 - 17:20": "F",
  "15:30 - 17:20": "F",
  "17:25 - 18:45": "G",
  "18:50 - 20:10": "H",
  "20:15 - 21:35": "I",
  "20:15 - 21:30": "I",
  "20:10 - 21:35": "I",
  "21:40 - 23:00": "J",

  "08:30 - 11:20": "AB",
  "10:00 - 12:50": "BC",
  "11:30 - 14:20": "CD",
  "13:00 - 15:50": "DE",
  "14:30 - 17:20": "EF",
  "14:00 - 17:20": "EF",
  "16:00 - 18:45": "FG",
  "17:25 - 20:10": "GH",
  "18:50 - 21:35": "HI",

  "08:30 - 12:50": "ABC",
  "10:00 - 14:20": "BCD",
  "11:30 - 15:50": "CDE",
  "13:00 - 17:20": "DEF",
  "14:30 - 18:45": "EFG",
  "16:00 - 20:10": "FGH",
  "17:25 - 21:35": "GHI",

  "08:30 - 14:20": "ABCD",
  "10:00 - 15:50": "BCDE",
  "11:30 - 17:20": "CDEF",
  "13:00 - 18:45": "DEFG",
  "14:30 - 20:10": "EFGH",
  "16:00 - 21:35": "FGHI",

  "08:30 - 15:50": "ABCDE",
  "10:00 - 17:20": "BCDEF",
  "11:30 - 18:45": "CDEFG",
  "13:00 - 20:10": "DEFGH",
  "14:30 - 21:35": "EFGHI",

  "08:30 - 17:20": "ABCDEF",
  "10:00 - 18:45": "BCDEFG",
  "11:30 - 20:10": "CDEFGH",
  "13:00 - 21:35": "DEFGHI",

  "08:30 - 18:45": "ABCDEFG",
  "10:00 - 20:10": "BCDEFGH",
  "11:30 - 21:35": "CDEFGHI",

  "08:30 - 20:10": "ABCDEFGH",
  "10:00 - 21:35": "BCDEFGHI",

  "08:30 - 21:35": "ABCDEFGHI",
};

function getTimeBlockIdentifier(timeInterval: string) {
  const timeBlock =
    timeBlockMappings[timeInterval as keyof typeof timeBlockMappings];
  if (!timeBlock) {
    throw new Error(`Invalid time interval: ${timeInterval}`);
  }
  return timeBlock;
}

export default function parseTimeBlocks(timeString: string) {
  const timeBlocks = [];
  const timeBlocksInfo = timeString.split(/\s*;\s*/);

  for (const blockInfo of timeBlocksInfo) {
    const match = blockInfo.match(
      /([A-Z\s]+)\s+(\d{2}:\d{2}\s*-\s*\d{2}:\d{2})/
    );

    if (match) {
      const daysStr = match[1];
      const timeInterval = match[2];

      const days = daysStr.split(/\s+/).map((day) => day.trim());
      for (const day of days) {
        const blocks = getTimeBlockIdentifier(timeInterval);
        for (const block of blocks) {
          timeBlocks.push({
            day: day as TimeBlockItem["day"],
            block: block as TimeBlockItem["block"],
          });
        }
      }
    }
  }
  return timeBlocks;
}
