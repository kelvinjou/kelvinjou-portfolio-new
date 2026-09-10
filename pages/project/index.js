import Head from "next/head";
import { useMemo, useState } from "react";
import Header from "../../components/Header";
import ProjectCard from "../../components/ProjectCard";
import ProjectFilter from "../../components/ProjectFilter";
import data from "../../data/portfolio.json";

const filters = ["All", "iOS", "macOS", "Web", "XR"];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const projects = useMemo(() => data.projects.slice().reverse().filter((project) => filter === "All" || project.type === filter), [filter]);

  return (
    <>
      <Head>
        <title>Projects — Kelvin Jou</title>
        <meta name="description" content="Selected product, research, and engineering work by Kelvin Jou." />
      </Head>
      <main className="project-shell">
        <Header isBlog />
        <header className="project-intro">
          <p className="project-eyebrow">Selected work</p>
          <h1>Projects</h1>
          <p className="project-dek">A collection of products and experiments across spatial computing, Apple platforms, and the web.</p>
        </header>
        <div className="project-toolbar">
          <ProjectFilter options={filters} value={filter} onChange={setFilter} />
          <p className="project-count" aria-live="polite">{projects.length} {projects.length === 1 ? "project" : "projects"}</p>
        </div>
        <section className="project-grid" aria-label={`${filter} projects`}>
          {projects.map((project, index) => <ProjectCard key={project.title} project={project} priority={index < 3} />)}
        </section>
      </main>
    </>
  );
}
