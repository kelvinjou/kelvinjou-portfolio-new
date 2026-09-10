import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export default function ProjectCard({ project, priority = false }) {
  return (
    <Link href={`/project/${encodeURIComponent(project.title)}`} className="project-card" aria-label={`Read the ${project.title} case study`}>
      <div className="project-card-media">
        <Image src={project.imageSrc} alt="" fill priority={priority} sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw" className="project-card-image" />
      </div>
      <div className="project-card-body">
        <div className="project-card-topline">
          <span className="project-badge">{project.type}</span>
          <FiArrowUpRight className="project-card-arrow" aria-hidden="true" />
        </div>
        <h2>{project.title}</h2>
        <p>{project.caption}</p>
        <div className="project-card-stack" aria-label="Technology stack">
          {project.techstack?.slice(0, 3).map((item) => <span key={item.name}>{item.name}</span>)}
          {project.techstack?.length > 3 && <span>+{project.techstack.length - 3}</span>}
        </div>
      </div>
    </Link>
  );
}
