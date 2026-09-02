import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { routes } from "@/config/routes";
import { getAllAlumni } from "@/lib/alumni";
import { t } from "@/lib/i18n";

/**
 * HomeAlumni: Story-driven gallery highlighting real Drosos graduates in Tafila.
 */
export function HomeAlumni() {
  const featuredAlumni = getAllAlumni()
    .filter((a) => a.portrait)
    .slice(0, 6);

  const leadAlumni = featuredAlumni[0];
  const supportingAlumni = featuredAlumni.slice(1, 6);

  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal variant="slide-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-brand-50/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ink-brand">
              أصوات وقصص نجاح
            </span>
          </Reveal>
          <Reveal variant="slide-up" delay={0.1}>
            <h2 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl lg:text-5xl">
              من هنا بدأت قصصهم
            </h2>
          </Reveal>
          <Reveal variant="slide-up" delay={0.2}>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              شباب ويافعون من الطفيلة مرّوا برحلة التعلم والتمكين، وصنعوا بصمتهم
              الخاصة في مجتمعاتهم.
            </p>
          </Reveal>
        </div>

        {/* Asymmetrical Story-Driven Gallery */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Featured Lead Alumni Card */}
          {leadAlumni && (
            <div className="lg:col-span-5">
              <Reveal variant="slide-up">
                <Link
                  href={`${routes.alumni}/${leadAlumni.slug}`}
                  className="lift group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-xs hover:border-brand-300"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-50">
                    {leadAlumni.portrait && (
                      <Image
                        src={leadAlumni.portrait.src}
                        alt={t(leadAlumni.name)}
                        fill
                        priority
                        sizes="(min-width: 64rem) 40vw, 100vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-6 right-6 left-6 text-neutral-0">
                      <span className="inline-block rounded-md bg-primary px-3 py-1 text-xs font-bold shadow-xs">
                        قصة مميزة
                      </span>
                      <h3 className="mt-3 text-2xl font-bold">
                        {t(leadAlumni.name)}
                      </h3>
                      <p className="mt-1 text-xs text-brand-100/90">
                        {t(leadAlumni.cohort.label)}
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            </div>
          )}

          {/* Supporting 5 Alumni Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
              {supportingAlumni.map((person, idx) => (
                <Reveal key={person.id} variant="slide-up" delay={idx * 0.08}>
                  <Link
                    href={`${routes.alumni}/${person.slug}`}
                    className="group flex flex-col items-center text-center"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-line bg-surface p-2 shadow-xs transition-[border-color,box-shadow] duration-[var(--duration-fast)] group-hover:border-brand-300 group-hover:shadow-md">
                      {person.portrait && (
                        <Image
                          src={person.portrait.src}
                          alt={t(person.name)}
                          fill
                          sizes="(min-width: 64rem) 16vw, (min-width: 40rem) 33vw, 50vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>

                    <h3 className="mt-3 text-sm font-bold text-ink transition-colors group-hover:text-ink-brand">
                      {t(person.name)}
                    </h3>
                    <span className="mt-0.5 text-xs text-ink-subtle">
                      {t(person.cohort.label)}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Explore All Alumni */}
        <div className="mt-14 text-center">
          <Reveal variant="slide-up">
            <Link
              href={routes.alumni}
              className="inline-flex items-center justify-center rounded-lg border border-line bg-surface px-7 py-3.5 text-base font-bold text-ink transition-colors hover:border-brand-400 hover:bg-brand-50/50 hover:text-ink-brand"
            >
              اكتشف جميع الخريجين
              <svg
                className="mr-2 h-4 w-4 rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

