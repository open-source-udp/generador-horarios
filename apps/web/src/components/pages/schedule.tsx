import { memo, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Timetable } from "ui";

type ScheduleProps = {
  params: { schedule: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Schedule: React.FC<ScheduleProps> = memo(function Schedule({
  params,
}) {
  const schedule = JSON.parse(atob(decodeURIComponent(params.schedule)));
  return (
    <>
      <Grid>
        <Timetable
          timeBlocks={schedule.flatMap((subject) =>
            subject.sectionInfo.timeBlocks.map((timeblock) => ({
              ...timeblock,
              subjectName: subject.subjectInfo.name,
              sectionName: subject.sectionInfo.section,
            }))
          )}
        />
      </Grid>
    </>
  );
});

export default Schedule;
