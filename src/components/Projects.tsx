"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Code2, GitBranch, Rocket, ShieldCheck } from "lucide-react";
import { projectsMeta, profile } from "@/data/portfolio";
import { FadeIn, Stagger, StaggerItem } from "./FadeIn";
import { useLanguage } from "./LanguageProvider";

export function Projects() {
  const { t } = useLanguage();

  const metrics = [
    { value: "20+", label: t("metricProjects"), Icon: Code2 },
    { value: "500+", label: t("metricCommits"), Icon: GitBranch },
    { value: "3+", label: t("metricYears"), Icon: Rocket },
    { value: "100%", label: t("metricResponsibility"), Icon: ShieldCheck },
  ];

  return (
    <section id="projects" className="scroll-mt-8">
      <FadeIn>
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-extrabold leading-tight text-[#151b31] dark:text-stone-50">
              {t("projectsTitle")}
            </h2>
            <div className="mt-2 h-0.5 w-8 bg-[var(--teal)]" />
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-[var(--teal)] transition hover:opacity-80"
          >
            {t("viewAll")}
          </a>
        </div>
      </FadeIn>

      <Stagger className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
        {projectsMeta.map((project) => (
          <StaggerItem key={project.id}>
            <motion.article
              whileHover={{ y: -4 }}
              className="card-soft group flex h-full flex-col overflow-hidden"
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="relative block overflow-hidden bg-stone-100 dark:bg-white/[0.04]"
              >
                <Image
                  src={project.image}
                  alt={t(project.titleKey)}
                  width={640}
                  height={400}
                  className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </a>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-bold leading-snug tracking-tight text-stone-900 dark:text-stone-50">
                  {t(project.titleKey)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                  {t(project.descKey)}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#f2f5f8] px-2.5 py-1 text-[11px] font-semibold text-[#667085] dark:bg-[var(--teal-soft)] dark:text-[var(--ink-soft)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex justify-between gap-4 border-t border-[#edf1f5] pt-5 text-xs font-semibold dark:border-[var(--line)]">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--teal)]"
                  >
                    {t("liveDemo")}
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-stone-500 transition hover:text-stone-900 dark:text-[var(--muted)] dark:hover:text-[var(--ink)]"
                  >
                    {t("github")}
                  </a>
                </div>
              </div>
            </motion.article>
          </StaggerItem>
        ))}
      </Stagger>

      <FadeIn delay={0.1}>
        <div className="card-soft mt-9 grid grid-cols-2 divide-x-0 divide-y divide-[#e5ebf1] px-5 py-5 sm:grid-cols-4 sm:divide-x sm:divide-y-0 sm:px-7 dark:divide-[var(--line)]">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col items-center gap-2 px-3 py-4 text-center first:border-l-0">
              <metric.Icon className="h-6 w-6 text-[#0f9f95]" strokeWidth={1.6} />
              <div>
                <p className="text-2xl font-extrabold text-[#151b31] dark:text-stone-50">{metric.value}</p>
                <p className="text-xs leading-relaxed text-stone-500 dark:text-[var(--muted)]">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
