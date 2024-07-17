import { useStore } from "@/store";

import { FormEventHandler, useState } from "react";

const useCourseForm = () => {
  const selectedCourses = useStore((store) => store.selectedCourses);
  const addCourse = useStore((store) => store.addCourse);
  const showSchedule = useStore((store) => store.showSchedule);
  const strategy = useStore((store) => store.selectedStrategy);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const alreadySelectedCourses = selectedCourses.filter(
      (c) => c && c.selectedSection?.code
    );
    const notSelectedCourses = selectedCourses.filter(
      (c) => c && !c.selectedSection?.code
    );
    const worker = new Worker(
      new URL("../../../workers/generateScheduling.ts", import.meta.url)
    );

    setIsLoading(true);
    console.time("generateScheduling");
    worker.postMessage({
      alreadySelectedCourses,
      notSelectedCourses,
      strategy,
    });
    worker.onmessage = (e) => {
      const schedule = e.data;
      console.log(schedule);
      console.timeEnd("generateScheduling");
      if (!schedule || !schedule.length)
        alert("No se pudo generar un horario con los ramos seleccionados");
      showSchedule(schedule);
      setIsLoading(false);
    };
  };
  return { selectedCourses, addCourse, handleSubmit, isLoading };
};

export default useCourseForm;
