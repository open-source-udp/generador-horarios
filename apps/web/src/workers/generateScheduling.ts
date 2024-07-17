import generateScheduling, {
  generateSchedulingParams,
} from "../utils/generateScheduling";

self.onmessage = (e: MessageEvent<generateSchedulingParams>) => {
  const { alreadySelectedCourses, notSelectedCourses, strategy } = e.data;
  const result = generateScheduling({
    alreadySelectedCourses,
    notSelectedCourses: notSelectedCourses.sort(
      (a, b) => a.sections.length - b.sections.length
    ),
    strategy,
  });
  self.postMessage(result);
};
