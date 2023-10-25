import { Table } from "@mui/material";
import { TableHead, TableRow, TableBody, TableCell } from "@mui/material";
import { memo } from "react";
import { TimeBlockItem, Block, Day } from "contracts";
import { getScheduleFromTimeBlocks } from "utils";

type TimeBlockItemWithSectionInfo = TimeBlockItem & {
  subjectName: string;
  sectionName: string;
};

type TimeTableProps = {
  timeBlocks: Array<TimeBlockItemWithSectionInfo>;
};

const timeBlockMappings = {
  A: "08:30 - 09:50",
  B: "10:00 - 11:20",
  C: "11:30 - 12:50",
  D: "13:00 - 14:20",
  E: "14:30 - 15:50",
  F: "16:00 - 17:20",
  G: "17:25 - 18:45",
  H: "18:50 - 20:10",
  I: "20:15 - 21:35",
  J: "21:40 - 23:00",
};

const Timetable: React.FC<TimeTableProps> = memo(
  function Timetable({ timeBlocks }) {
    const schedule = getScheduleFromTimeBlocks(timeBlocks);
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>*</TableCell>
            <TableCell>Lunes</TableCell>
            <TableCell>Martes</TableCell>
            <TableCell>Miercoles</TableCell>
            <TableCell>Jueves</TableCell>
            <TableCell>Viernes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(schedule)
            .sort()
            .map((block) => (
              <TableRow key={block}>
                <TableCell>
                  {block} <br />({timeBlockMappings[block as Block]})
                </TableCell>
                {Object.keys(schedule[block as Block]).map((day) => (
                  <TableCell key={day}>
                    {schedule[block as Block][day as Day].description}
                    <br />
                    {schedule[block as Block][day as Day].subjectName}
                    <br />
                    {schedule[block as Block][day as Day].sectionName}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.timeBlocks.length !== nextProps.timeBlocks.length)
      return false;
    for (const i in prevProps.timeBlocks) {
      if (prevProps.timeBlocks[i] !== nextProps.timeBlocks[i]) return false;
    }
    return true;
  }
);

export default Timetable;
