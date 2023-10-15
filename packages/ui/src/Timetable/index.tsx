import { Table } from "@mui/material";
import { TableHead, TableRow, TableBody, TableCell } from "@mui/material";
import { memo } from "react";
import { TimeBlockItem, Block, Day } from "contracts";

type TimeBlockItemWithSectionInfo = TimeBlockItem & {
  subjectName: string;
  sectionName: string;
};

type TimeTableProps = {
  timeBlocks: Array<TimeBlockItemWithSectionInfo>;
};

const Timetable: React.FC<TimeTableProps> = memo(function Timetable({
  timeBlocks,
}) {
  const schedule = timeBlocks.reduce((acc, timeBlock) => {
    acc[timeBlock.block][timeBlock.day] = timeBlock;
    return acc;
  }, {} as Record<Block, Record<Day, TimeBlockItemWithSectionInfo>>);
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
        {Object.keys(schedule).map((block) => (
          <TableRow key={block}>
            <TableCell>{block}</TableCell>
            {Object.keys(schedule[block as Block]).map((day) => (
              <TableCell key={day}>
                {schedule[block as Block][day as Day].description}
                {schedule[block as Block][day as Day].subjectName}
                {schedule[block as Block][day as Day].sectionName}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});

export default Timetable;
