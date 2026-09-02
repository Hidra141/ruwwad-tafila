import { buildMetadata } from "@/lib/metadata";
import { AlumniArchive } from "@/sections/alumni/AlumniArchive";
import { AlumniIntro } from "@/sections/alumni/AlumniIntro";

export const metadata = buildMetadata({
  title: "الخريجون",
  path: "/alumni",
});

export default function AlumniPage() {
  return (
    <>
      <AlumniIntro />
      <AlumniArchive />
    </>
  );
}
