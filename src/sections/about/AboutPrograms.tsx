import { ProgramGrid } from "@/components/content/ProgramGrid";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { otherPrograms } from "@/data/programs";

/** Programmes overview within the story page. */
export function AboutPrograms() {
  if (otherPrograms.length === 0) return null;

  return (
    <Section spacing="compact" ariaLabelledBy="about-programs">
      <Container className="flex flex-col gap-8">
        <SectionHeading id="about-programs" title="مجالات الأثر والبرامج" />
        <ProgramGrid programs={otherPrograms} label="برامج روّاد" columns={2} />
      </Container>
    </Section>
  );
}
