import { AppLink } from "@/components/ui/AppLink";
import { contactInfo } from "@/data/contact";
import { t } from "@/lib/i18n";

export function ContactMap() {
  const { latitude, longitude } = contactInfo.location.coordinates;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-4 shadow-xs sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-ink">موقع المركز على الخريطة</h3>
        <AppLink
          href={contactInfo.location.href}
          className="text-xs font-semibold text-brand-700 hover:underline min-h-[44px] px-2 py-2 flex items-center"
        >
          {t(contactInfo.location.label)} ↗
        </AppLink>
      </div>

      <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-xl border border-line bg-surface-sunken">
        <iframe
          title="موقع روّاد التنمية – الطفيلة"
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
}
