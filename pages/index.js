import Head from "next/head";
import { FiArrowRight, FiDownload, FiYoutube } from "react-icons/fi";
import Header from "../components/Header";
import ProjectCard from "../components/ProjectCard";
import SkillBubbles from "../components/SkillBubbles";
import Footer from "../components/Footer";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import data from "../data/portfolio.json";

export default function Home() {
  const skills = [...data.languages, ...data.frameworks_libraries].filter((item, index, list) => list.findIndex((candidate) => candidate.name === item.name) === index);
  const featuredProjects = data.projects.slice(-3).reverse();
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <Head>
        <title>Kelvin Jou — Computer Engineer</title>
        <meta name="description" content="Kelvin Jou builds extended-reality, lab software infrastructure, and Apple-platform projects." />
      </Head>
      <main className="home-shell">
        <Header handleAboutScroll={() => scrollTo("about")} handleWorkScroll={() => scrollTo("skills")} />
        <section className="home-hero">
          <div className="home-hero-copy">
            <Badge>Computer Engineering &apos;28 · UCSB</Badge>
            <h1>Kelvin Jou</h1>
            <p className="home-caption"><em>Bay Area &amp; Goleta, CA · Updated 09/09/26</em></p>
            <p className="home-intro">I build extended-reality, lab software infra and Apple-platform projects.</p>
            <div className="home-actions">
              <Button href="/project">Projects <FiArrowRight aria-hidden="true" /></Button>
              <Button href="/resume" variant="outline">Résumé <FiDownload aria-hidden="true" /></Button>
            </div>
            <div className="home-facts"><span>XR · Physical AI · Apple platforms</span></div>
          </div>
        </section>

        <section className="home-section" id="projects">
          <div className="section-heading-row">
            <div><p className="home-kicker">Selected work</p><h2>Recent projects</h2></div>
            <Button href="/project" variant="ghost">View all <FiArrowRight aria-hidden="true" /></Button>
          </div>
          <div className="home-project-grid">{featuredProjects.map((project) => <ProjectCard project={project} key={project.title} />)}</div>
        </section>

        <section className="home-section home-about" id="about">
          <div><p className="home-kicker">About</p><h2>Background</h2></div>
          <div className="home-about-content">
            <p>{data.aboutpara}</p>
            <div className="home-about-youtube">
              <a href="https://www.youtube.com/@kelvinjou" target="_blank" rel="noreferrer">
                <FiYoutube aria-hidden="true" /> YouTube channel <FiArrowRight aria-hidden="true" />
              </a>
              <p>Back in high school, I published various walkthrough tutorials on building interesting applications with quirky libraries and tools in Swift and Python.</p>
            </div>
          </div>
        </section>

        <section className="home-section home-skills" id="skills">
          <div className="section-heading-row">
            <div><p className="home-kicker">Toolkit</p><h2>Technologies I work with</h2></div>
          </div>
          <SkillBubbles items={skills} projects={data.projects} />
        </section>

        <section className="home-section home-updates">
          <div className="section-heading-row"><div><p className="home-kicker">Now &amp; next</p><h2>Recent updates</h2></div></div>
          <div className="updates-grid">
            {data.updates.map((update) => (
              <Card as="article" className="update-card" key={update.id}>
                <time>{update.date}</time><h3>{update.title}</h3><p>{update.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <div className="home-contact-text">kelvinj[dot]developer[at]gmail[dot]com</div>
        <Footer />
      </main>
    </>
  );
}
