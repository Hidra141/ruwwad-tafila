import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

/** Hero for the story page. Structural shell; carries the page `h1`. */
export function AboutHero() {
  return (
    <Section className="relative overflow-hidden">
      <Container className="flex flex-col gap-6">
        <h1 className="text-4xl font-bold text-ink">قصتنا</h1>
        <p className="text-xl text-ink-muted max-w-(--container-content) leading-relaxed">
          مركز مجتمعي تمكيني يستثمر في طاقات الشباب واليافعين في محافظة الطفيلة من خلال المنح التعليمية، والبرامج الإبداعية، وساعات الخدمة المجتمعية.
        </p>
      </Container>
    </Section>
  );
}
