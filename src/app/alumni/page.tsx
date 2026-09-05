import { buildMetadata } from "@/lib/metadata";
import { AlumniArchive } from "@/sections/alumni/AlumniArchive";
import { AlumniHero } from "@/sections/alumni/AlumniHero";

export const metadata = buildMetadata({
  title: "الخريجون",
  path: "/alumni",
});

export default function AlumniPage() {
  return (
    <>
      <AlumniHero />
      <AlumniArchive />
    </>
  );
}
