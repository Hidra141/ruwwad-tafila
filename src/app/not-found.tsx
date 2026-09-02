import { AppLink } from "@/components/ui/AppLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { routes } from "@/config/routes";

export default function NotFound() {
  return (
    <Section>
      <Container width="content" className="flex flex-col items-start gap-6">
        <h1 className="text-4xl font-bold text-ink">الصفحة غير موجودة</h1>
        <p className="text-ink-muted">
          الرابط الذي طلبته غير متوفر أو تم نقله.
        </p>
        <AppLink href={routes.home} variant="primary">
          العودة إلى الرئيسية
        </AppLink>
      </Container>
    </Section>
  );
}
