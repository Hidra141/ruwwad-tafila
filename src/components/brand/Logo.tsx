import Image from "next/image";

import { siteConfig } from "@/config/site";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "mark" | "lockup";
  compact?: boolean;
  isInverse?: boolean;
  className?: string;
}

/**
 * Logo: Renders official imgi_2_logo.jpg image in natural 473x659 proportions.
 */
export function Logo({ isInverse = false, className }: LogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-3 select-none shrink-0", className)}>
      <Image
        src="/assets/brand/ruwwad-tafila-logo.jpg"
        alt={t(siteConfig.name)}
        width={473}
        height={659}
        priority
        className="h-11 w-auto object-contain lg:h-13"
      />
      <span
        className={cn(
          "text-base font-extrabold tracking-tight sm:text-lg lg:text-xl",
          isInverse ? "text-white" : "text-ink-brand"
        )}
      >
        روّاد التنمية – الطفيلة
      </span>
    </div>
  );
}







