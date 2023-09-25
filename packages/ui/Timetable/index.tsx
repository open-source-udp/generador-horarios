import { Table } from "@mui/material";
import { TableHead, TableRow, TableBody, TableCell } from "@mui/material";
import { memo } from "react";
import { TimeBlockItem, Block, Day } from "contracts";

type TimeTableProps = Record<Day, Record<Block, TimeBlockItem>>;

const Timetable: React.FC<TimeTableProps> = (schedule) => {
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
        {Object.keys(schedule).map((day) => (
          <TableRow key={day}>
            <TableCell>{day}</TableCell>
            {Object.keys(schedule[day as Day]).map((block) => (
              <TableCell key={block}>
                {schedule[day as Day][block as Block].name}
                {schedule[day as Day][block as Block].description}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default memo(Timetable);
