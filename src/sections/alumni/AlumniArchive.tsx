import { getAllAlumni } from "@/lib/alumni";
import { AlumniInteractiveArchive } from "./AlumniInteractiveArchive";

export function AlumniArchive() {
  const alumni = getAllAlumni();

  if (alumni.length === 0) return null;

  return <AlumniInteractiveArchive initialAlumni={alumni} />;
}
