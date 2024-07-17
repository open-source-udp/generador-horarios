import { useStore } from "@/store";
import { memo, useState } from "react";
import { Timetable } from "../Timetable";
import withCourses from "../Timetable/withCourses";
import { Box, Button, Modal } from "@mui/material";
import { IconButton } from "@mui/material";
import { Close, NavigateBefore, NavigateNext } from "@mui/icons-material";

// const GeneratedScheduleModal: React.FC = memo(
const GeneratedScheduleModal: React.FC = function GeneratedScheduleModal() {
  const [selectedSchedule, setSelectedSchedule] = useState(0);
  const { schedule, showSchedule, closeSchedule, generatedSchedules } =
    useStore((store) => ({
      schedule: store.generatedSchedules
        ? store.generatedSchedules[selectedSchedule]
        : null,
      showSchedule: store.showGeneratedSchedule,
      closeSchedule: store.closeSchedule,
      generatedSchedules: store.generatedSchedules,
    }));
  if (!showSchedule || !schedule) return null;
  const Schedule = withCourses(Timetable, schedule);
  return (
    <Modal
      open={showSchedule}
      onClose={closeSchedule}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "30px",
        marginRight: "30px",
        marginTop: "30px",
      }}
    >
      <>
        <Box
          sx={{
            bgcolor: "background.paper",
            maxWidth: "1280px",
            padding: "50px",
            height: "fit-content",
            position: "relative",
            maxHeight: "90%",
            overflow: "scroll",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={closeSchedule}
            sx={{ position: "absolute", top: 0, right: 0, margin: "7px" }}
          >
            <Close />
          </IconButton>
          {Schedule}
          <Box
            alignContent={"center"}
            alignItems={"center"}
            justifyContent={"center"}
            display={"flex"}
            pt={2}
          >
            <Button
              variant="contained"
              onClick={() => setSelectedSchedule((i) => i - 1)}
              disabled={selectedSchedule === 0}
              startIcon={<NavigateBefore />}
            >
              Anterior
            </Button>
            <Button
              variant="contained"
              onClick={() => setSelectedSchedule((i) => i + 1)}
              disabled={selectedSchedule === generatedSchedules.length - 1}
              endIcon={<NavigateNext />}
            >
              Siguiente
            </Button>
          </Box>
          {`${selectedSchedule + 1} de ${generatedSchedules.length}`}
        </Box>
      </>
    </Modal>
  );
};
export default GeneratedScheduleModal;
