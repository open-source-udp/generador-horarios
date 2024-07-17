import { FC, memo } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Share } from "@mui/icons-material";
import { CourseData } from "@/store";

type ShareButtonProps = { courses: CourseData[] };

const ShareButton: FC<ShareButtonProps> = memo(function ShareButton({
  courses,
}) {
  const url = courses
    .sort((a, b) => a.code.localeCompare(b.code))
    .map((course) => `${course.code}-${course.selectedSection?.code}`);
  
  return (
    <Tooltip title="Compartir este horario">
      <IconButton aria-label="share">
        <Share />
      </IconButton>
    </Tooltip>
  );
});

export default ShareButton;
