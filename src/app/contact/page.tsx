import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/metadata";
import { ContactDetails } from "@/sections/contact/ContactDetails";
import { ContactFormSection } from "@/sections/contact/ContactFormSection";

export const metadata = buildMetadata({
  title: "تواصل معنا",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Section>
        <Container>
          <h1 className="text-4xl font-bold text-ink">تواصل معنا</h1>
        </Container>
      </Section>
      <ContactDetails />
      <ContactFormSection />
    </>
  );
}
