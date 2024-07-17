import { useStore } from "@/store";
import type { TimetableProps } from "./index";
import withCourses from "./withCourses";

const withSelectedCourses = (
  WrappedComponent: React.ComponentType<TimetableProps>
) => {
  return () => {
    const selectedCourses = useStore((store) => store.selectedCourses);
    return withCourses(WrappedComponent, selectedCourses);
  };
};

export default withSelectedCourses;
