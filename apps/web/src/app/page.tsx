import { readdir } from "node:fs/promises";
import Index from "@/components/pages";

export default async function Page() {
  const files = (await readdir("../parser/output/subjects"))
    .filter((file) => file.includes(".json"))
    .map((file) => file.replace(".json", ""));

  return <Index files={files} />;
}
