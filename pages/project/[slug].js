import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiArrowUpRight, FiGithub } from "react-icons/fi";
import Header from "../../components/Header";
import ProjectCaseStudy from "../../components/ProjectCaseStudy";
import data from "../../data/portfolio.json";

export default function ProjectDetails({ project }) {
  const isGithub = project.url?.includes("github.com");
  return (
    <>
      <Head><title>{`${project.title} — Kelvin Jou`}</title><meta name="description" content={project.description} /></Head>
      <main className="project-shell project-detail-shell">
        <Header isBlog />
        <div className="detail-back-row"><Link href="/project" className="detail-back"><FiArrowLeft aria-hidden="true" />All projects</Link></div>
        <article>
          <header className="detail-hero">
            <div className="detail-heading">
              <div className="detail-meta"><span className="project-badge">{project.type}</span><span>{project.techstack?.length || 0} technologies</span></div>
              <h1>{project.title}</h1>
              <p>{project.description}</p>
              {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-primary-action">{isGithub ? <FiGithub aria-hidden="true" /> : <FiArrowUpRight aria-hidden="true" />}{isGithub ? "View repository" : "View project"}</a>}
            </div>
            <div className="detail-visual"><Image src={project.imageSrc} alt={`${project.title} interface preview`} fill priority sizes="(max-width: 768px) 100vw, 52vw" className="detail-image" /></div>
          </header>
          <ProjectCaseStudy project={project} />
        </article>
      </main>
    </>
  );
}

export function getStaticPaths() {
  return { paths: data.projects.map((project) => ({ params: { slug: project.title } })), fallback: false };
}

export function getStaticProps({ params }) {
  return { props: { project: data.projects.find((item) => item.title === params.slug) } };
}
