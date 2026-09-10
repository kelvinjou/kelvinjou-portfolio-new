import Head from "next/head";
import { FiArrowUpRight, FiDownload } from "react-icons/fi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import data from "../data/portfolio.json";

const resumePath = "/images/Kelvin_Jou_Portfolio_Resume.pdf";

const publications = [
  {
    year: "2026",
    title: "XARP: A Human-First and Agent-Ready Extended Reality Toolkit in Python",
    authors: "Arthur Caetano, Radha Kumaran, Kelvin Jou, Tobias Höllerer, Misha Sra",
    venue: "Proceedings of the ACM on Human-Computer Interaction, 10(4) · EICS 2026",
    note: "Honorable Mention",
    href: "https://doi.org/10.1145/3816762",
  },
  {
    year: "2025",
    title: "On the Steganographic Capacity of Selected Learning Models",
    authors: "Rishit Agrawal, Kelvin Jou, Tanush Obili, Daksh Parikh, Samarth Prajapati, Yash Seth, Charan Sridhar, Nathan Zhang, Mark Stamp",
    venue: "Machine Learning, Deep Learning and AI for Cybersecurity · Springer Nature",
    href: "https://arxiv.org/abs/2308.15502",
  },
];

const experience = [
  {
    role: "Software Engineer Intern",
    organization: "PayPal",
    period: "June 2026 — Present",
    location: "San Jose, CA",
    summary: "Developing PayPal’s first voice-assisted money transfer capability on iOS with Siri and App Intents, alongside reusable test and snapshot-recording infrastructure for Balances surfaces.",
  },
  {
    role: "Extended Reality Researcher",
    organization: "UCSB Human-AI Experience Lab",
    period: "November 2024 — Present",
    location: "Goleta, CA",
    summary: "Co-authored XARP, an agent-ready XR platform built around Python APIs, WebSockets, Unity, and Model Context Protocol; also developed a Three.js/WebXR hand-perception prototype.",
  },
  {
    role: "Scientific Software Applications Developer",
    organization: "NSF BioPACIFIC MIP",
    period: "June 2025 — June 2026",
    location: "Goleta, CA",
    summary: "Delivered cross-platform scientific workflows with Flutter, Django, Svelte, and PostgreSQL, including chemical structure editing and retrieval across more than 100,000 records.",
  },
  {
    role: "Cryptography Researcher",
    organization: "San Jose State University",
    period: "June 2023 — September 2023",
    location: "San Jose, CA",
    summary: "Studied steganographic capacity and accuracy degradation in LSTM and DenseNet121 models using features extracted from 100,000 malware binaries.",
  },
];

const technologyGroups = [
  ["Languages", "Python, C++, Dart, Swift, JavaScript, Java, SQL, C#, Verilog"],
  ["AI / data", "PyTorch, Hugging Face, vector search, semantic retrieval, knowledge graphs, RDFLib, SPARQL, PostgreSQL"],
  ["Software", "REST APIs, WebSockets, MCP, Docker, Django, Flutter, SwiftUI, Svelte, Three.js, Unity, AWS, GCP"],
];

export default function Resume() {
  return (
    <>
      <Head>
        <title>Résumé — Kelvin Jou</title>
        <meta name="description" content="Kelvin Jou's engineering experience, publications, education, and technical toolkit." />
      </Head>
      <main className="resume-shell">
        <Header isBlog />

        <header className="resume-intro">
          <div>
            <p className="resume-eyebrow">Résumé</p>
            <h1>Kelvin Jou</h1>
            <p>Computer engineering student at UC Santa Barbara working across extended reality, AI systems, and Apple platforms.</p>
          </div>
          <div className="resume-actions">
            <Button href={resumePath} target="_blank" rel="noopener noreferrer">Open PDF <FiArrowUpRight aria-hidden="true" /></Button>
            <a className="ui-button ui-button-outline" href={resumePath} download>Download <FiDownload aria-hidden="true" /></a>
          </div>
        </header>

        <div className="resume-layout">
          <aside className="resume-sidebar">
            <section className="resume-side-section">
              <p className="resume-section-label">Education</p>
              <h2>{data.resume.education.universityName}</h2>
              <p>B.S. in Computer Engineering</p>
              <p>GPA 3.81 · Expected Spring 2028</p>
            </section>

            <section className="resume-side-section">
              <p className="resume-section-label">Technologies</p>
              <dl className="resume-tech-list">
                {technologyGroups.map(([label, items]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{items}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </aside>

          <div className="resume-main">
            <section className="resume-section" aria-labelledby="publications-heading">
              <div className="resume-section-heading">
                <p className="resume-section-label">Research</p>
                <h2 id="publications-heading">Publications</h2>
              </div>
              <div className="publication-list">
                {publications.map((publication) => (
                  <Card as="article" className="publication-card" key={publication.title}>
                    <div className="publication-meta">
                      <span>{publication.year}</span>
                      {publication.note && <Badge>{publication.note}</Badge>}
                    </div>
                    <h3>{publication.title}</h3>
                    <p>{publication.authors}</p>
                    <div className="publication-footer">
                      <span>{publication.venue}</span>
                      <a href={publication.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${publication.title}`}>
                        View paper <FiArrowUpRight aria-hidden="true" />
                      </a>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <section className="resume-section" aria-labelledby="experience-heading">
              <div className="resume-section-heading">
                <p className="resume-section-label">Work</p>
                <h2 id="experience-heading">Experience</h2>
              </div>
              <div className="experience-list">
                {experience.map((item) => (
                  <article className="experience-item" key={`${item.organization}-${item.role}`}>
                    <div className="experience-title">
                      <div><h3>{item.role}</h3><p>{item.organization}</p></div>
                      <div className="experience-meta"><span>{item.period}</span><span>{item.location}</span></div>
                    </div>
                    <p className="experience-summary">{item.summary}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
