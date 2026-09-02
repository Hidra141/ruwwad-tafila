import { buildMetadata } from "@/lib/metadata";
import { DrososHero } from "@/sections/drosos/DrososHero";
import { DrososInteractiveExplorer } from "@/sections/drosos/DrososInteractiveExplorer";

export const metadata = buildMetadata({
  title: "مشروع دروسوس — رحلة تمكين اليافعين بالطفيلة",
  description:
    "شراكة روّاد التنمية ومؤسسة دروسوس: 20 يافعاً ويافعة، 55 جلسة، و5 محطات تفاعلية من الزمالة والتمكين النفسي إلى الطلاقة الرقمية والتفكير التصميمي واستوديوهات الطباعة 3D.",
  path: "/drosos",
});

export default function DrososPage() {
  return (
    <main className="flex flex-col overflow-hidden">
      <DrososHero />
      <DrososInteractiveExplorer />
    </main>
  );
}
