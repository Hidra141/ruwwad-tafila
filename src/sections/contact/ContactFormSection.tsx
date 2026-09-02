import { ContactForm } from "@/components/contact/ContactForm";
import { ContactMap } from "@/components/contact/ContactMap";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Contact form and interactive map section.
 */
export function ContactFormSection() {
  return (
    <Section spacing="compact" ariaLabelledBy="contact-form">
      <Container className="flex flex-col gap-10">
        <SectionHeading id="contact-form" title="تواصل معنا" level={2} />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ContactMap />
          </div>
        </div>
      </Container>
    </Section>
  );
}
