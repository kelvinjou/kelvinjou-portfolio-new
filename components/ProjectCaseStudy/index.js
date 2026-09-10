import Image from "next/image";

const projectNotes = {
  "XR Rhythm Coach": ["Give developing musicians useful feedback on polyrhythmic timing inside a spatial, hands-on practice environment.", "Translate Quest 3 wrist-tracking coordinates into a signal that can be evaluated for rhythmic stability and accuracy.", ["Wrist-based hand tracking", "Fast Fourier Transform analysis", "In-experience AI coaching"]],
  ScribbleScript: ["Make handwritten code executable without breaking the natural Apple Pencil workflow.", "Pair a PencilKit-based Swift experience with a TypeScript and AWS EC2 compilation service.", ["Apple Pencil input", "Handwritten code capture", "Remote compilation workflow"]],
  ExpressFlip: ["Let musicians move through PDF sheet music without taking their hands away from an instrument.", "Use on-device facial-expression input to trigger page navigation in a focused iOS reader.", ["Hands-free page turns", "PDF sheet-music reader", "Facial-expression controls"]],
  GeoPointMemories: ["Bring scattered trip photos, recordings, and thoughts together through the places where they happened.", "Connect a Mapbox interface to cloud-backed media and memory records using AWS services.", ["Location heatmap", "Multi-format memories", "Cloud media storage"]],
  "Virtual Showrooms": ["Turn a physical environment into material that can support an on-demand augmented-reality experience.", "Combine LiDAR capture with ARKit, RealityKit, and MetalKit in an iOS spatial-computing pipeline.", ["LiDAR environment scanning", "AR object generation", "Real-time spatial rendering"]],
  CodeFormerUI: ["Make a research-grade blind face-restoration model approachable from a native desktop interface.", "Wrap the Python-based CodeFormer workflow in a Swift macOS experience through PythonKit.", ["Native macOS workflow", "Python model integration", "Face-restoration interface"]],
  Tunotes: ["Help musicians isolate useful notation from complex MIDI arrangements.", "Build an iOS workflow that turns selected instrumental parts from MIDI files into readable music notation.", ["MIDI file input", "Instrument-part selection", "Notation generation"]],
  Serv: ["Make local service opportunities easier for high-school students to discover and revisit.", "Combine a map-led Swift experience with Firebase data and Core Data for a responsive mobile workflow.", ["Opportunity discovery", "Map-based browsing", "Cloud and local data"]],
  "Serv Host Portal": ["Give organizations a clear way to create and maintain the opportunities shown to students.", "Build a Flutter web portal connected to Firebase as the organization-facing half of the Serv platform.", ["Event-post management", "Organization workflow", "Firebase-backed updates"]],
  "Transizion Project Capstone": ["Deliver an accessible web application that supports Transizion’s educational experience.", "Use Flutter to create a consistent, cross-platform product interface for the capstone workflow.", ["Education-focused workflow", "Responsive web interface", "Flutter implementation"]],
  "AR Experiments": ["Explore a lightweight way to place and inspect 3D object files in a real environment.", "Use ARKit on iPadOS to load and render OBJ assets in an augmented-reality scene.", ["OBJ file rendering", "AR placement", "iPadOS interaction"]],
  CreditCheck: ["Reduce the mental overhead of choosing which credit card will earn the best reward for a purchase.", "Build a Swift recommendation flow backed by Realm so card information remains readily available.", ["Card reward comparison", "Purchase-based recommendation", "Local Realm persistence"]],
};

export default function ProjectCaseStudy({ project }) {
  const fallback = [project.description, `Built as a ${project.type} experience using ${project.techstack?.map((item) => item.name).join(", ")}.`, project.techstack?.map((item) => `${item.name} integration`) || []];
  const [challenge, approach, capabilities] = projectNotes[project.title] || fallback;

  return (
    <div className="case-study">
      <aside className="case-study-facts">
        <p className="case-study-label">Project details</p>
        <dl>
          <div><dt>Platform</dt><dd>{project.type}</dd></div>
          <div><dt>Built with</dt><dd>{project.techstack?.map((item) => item.name).join(", ")}</dd></div>
        </dl>
      </aside>
      <div className="case-study-story">
        <section><p className="case-study-label">The challenge</p><h2>What the project set out to solve</h2><p>{challenge}</p></section>
        <section><p className="case-study-label">The approach</p><h2>How it was built</h2><p>{approach}</p></section>
        <section><p className="case-study-label">Core capabilities</p><h2>What the experience includes</h2><ul className="capability-list">{capabilities.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section>
          <p className="case-study-label">Technology</p><h2>The implementation stack</h2>
          <div className="tech-grid">{project.techstack?.map((item) => <div className="tech-item" key={item.name}><div className="tech-icon"><Image src={item.logo} alt="" width={34} height={34} /></div><span>{item.name}</span></div>)}</div>
        </section>
      </div>
    </div>
  );
}
