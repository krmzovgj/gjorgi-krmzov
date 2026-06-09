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
  return { title: project.name, description: project.headline };
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
