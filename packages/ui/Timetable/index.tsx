import { Table } from "@mui/material";
import { TableHead, TableRow, TableBody, TableCell } from "@mui/material";
import { memo } from "react";

type TimeTableProps = {};

const Timetable: React.FC<TimeTableProps> = () => {
  return (
    <Table sx={{ border: "1px solid red" }}>
      <TableHead>
        <TableRow>
          <TableCell>Time</TableCell>
          <TableCell>Monday</TableCell>
          <TableCell>Tuesday</TableCell>
          <TableCell>Wednesday</TableCell>
          <TableCell>Thursday</TableCell>
          <TableCell>Friday</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>8:00</TableCell>
          <TableCell>Math</TableCell>
          <TableCell>Math</TableCell>
          <TableCell>Math</TableCell>
          <TableCell>Math</TableCell>
          <TableCell>Math</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default memo(Timetable);
