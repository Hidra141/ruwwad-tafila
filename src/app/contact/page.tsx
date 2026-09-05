import { buildMetadata } from "@/lib/metadata";
import { ContactDetails } from "@/sections/contact/ContactDetails";
import { ContactFormSection } from "@/sections/contact/ContactFormSection";
import { ContactHero } from "@/sections/contact/ContactHero";

export const metadata = buildMetadata({
  title: "تواصل معنا",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactDetails />
      <ContactFormSection />
    </>
  );
}
