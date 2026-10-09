import { projects } from "@/lib/projects";
import ProjectPage from "./ProjectPage";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  return <ProjectPage params={params} />;
}
