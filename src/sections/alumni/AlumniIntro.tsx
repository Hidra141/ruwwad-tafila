import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

/** Introduction to the alumni archive. Carries the page `h1`. */
export function AlumniIntro() {
  return (
    <Section className="relative overflow-hidden">
      <Container className="flex flex-col gap-6">
        <h1 className="text-4xl font-bold text-ink">أرشيف الخريجين</h1>
        <p className="text-xl text-ink-muted max-w-(--container-content) leading-relaxed">
          سجل يوثّق رحلات وأثر خريجي وخريجات برنامج دروسوس في الطفيلة، واستعراض مشاريعهم التنموية والتقنية والإبداعية.
        </p>
      </Container>
    </Section>
  );
}
