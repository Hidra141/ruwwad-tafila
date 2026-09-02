import type { LocalizedText } from "@/types";
import { routes } from "./routes";

export interface NavItem {
  id: string;
  href: string;
  label: LocalizedText;
}

/** Primary navigation, shared by the desktop and mobile navigation components. */
export const primaryNavigation: NavItem[] = [
  { id: "home", href: routes.home, label: { ar: "الرئيسية", en: "Home" } },
  { id: "about", href: routes.about, label: { ar: "قصتنا", en: "Our Story" } },
  { id: "youth", href: routes.youth, label: { ar: "برنامج اليافعين", en: "Youth Program" } },
  { id: "drosos", href: routes.drosos, label: { ar: "دروسوس", en: "Drosos" } },
  { id: "alumni", href: routes.alumni, label: { ar: "الخريجون", en: "Alumni" } },
];
