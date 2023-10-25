import { Button } from "ui";
import { memo } from "react";
import {  useSyncSelectedSubjects } from "@/store/selectedSubjects";

type AddSubjectButtonProps = {};

const AddSubjectButton: React.FC<AddSubjectButtonProps> = memo(
  function AddSubjectButton() {
    const { add } = useSyncSelectedSubjects(({ add }) => ({ add }));
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
