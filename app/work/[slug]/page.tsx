import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, getProject } from "../../data/projects";
import CaseStudy from "../../components/CaseStudy";

// Pre-render every project page at build time.
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  // The metric is the hook, so it leads the SERP snippet. Metadata merging is
  // shallow: without an explicit canonical + openGraph here, every project
  // page would inherit the homepage's (and tell Google it's a duplicate).
  const description = `${project.headline}. ${project.metric}. Built with ${project.stack.split(" / ").join(", ")}.`;
  const url = `/work/${slug}`;
  return {
    title: project.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "Gjorgi Krmzov",
      title: project.name,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description,
    },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = PROJECTS.findIndex((p) => p.slug === slug);
  const next = PROJECTS[(i + 1) % PROJECTS.length];

  return <CaseStudy project={project} next={next} />;
}
