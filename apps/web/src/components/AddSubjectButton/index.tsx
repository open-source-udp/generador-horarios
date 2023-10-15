import { Button } from "ui";
import { memo } from "react";
import { useSelectedSubjects } from "@/store/selectedSubjects";

type AddSubjectButtonProps = {};

const AddSubjectButton: React.FC<AddSubjectButtonProps> = memo(
  function AddSubjectButton() {
    const { add } = useSelectedSubjects(({ add }) => ({ add }));
    return (
      <Button
        onClick={() => {
          add(null);
        }}
      >
        Agregar ramo
      </Button>
    );
  }
);

export default AddSubjectButton;
