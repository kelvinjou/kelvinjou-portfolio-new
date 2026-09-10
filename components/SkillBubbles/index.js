import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const GRAPH_WIDTH = 1000;
const GRAPH_HEIGHT = 820;
const NODE_MARGIN = 52;

const clusters = {
  systems: { label: "Languages & systems", x: 170, y: 185 },
  apple: { label: "Apple platforms", x: 500, y: 155 },
  web: { label: "Web interfaces", x: 825, y: 185 },
  spatial: { label: "Spatial computing", x: 175, y: 620 },
  intelligence: { label: "AI & services", x: 505, y: 615 },
  cloud: { label: "Cloud infrastructure", x: 825, y: 620 },
};

const membership = {
  systems: ["C++", "Python", "Java", "C#", "Rust", "Git", "Roslyn"],
  apple: ["Swift", "SwiftUI", "Core Data", "TestFlight", "Realm DB"],
  web: ["Typescript", "Flutter", "Svelte", "Next.js", "Vite", "SocketIO"],
  spatial: ["Unity", "Three.js", "WebGL", "Meta XR SDK"],
  intelligence: ["Gradio", "FastAPI", "Django REST", "SmolAgents", "ChromaDB", "FastMCP", "LMStudio"],
  cloud: ["Firebase", "GCP", "AWS S3", "AWS DynamoDB", "Docker", "AWS Lambda", "AWS EC2"],
};

const bridges = [
  ["C#", "Unity"], ["Python", "FastAPI"], ["Python", "Gradio"],
  ["Swift", "SwiftUI"], ["SwiftUI", "Firebase"], ["Flutter", "Firebase"],
  ["Typescript", "Three.js"], ["Three.js", "WebGL"], ["Next.js", "AWS S3"],
  ["Unity", "Meta XR SDK"], ["FastAPI", "AWS EC2"], ["FastMCP", "ChromaDB"],
  ["Docker", "Django REST"], ["LMStudio", "FastAPI"],
];

function clusterFor(name) {
  return Object.keys(membership).find((cluster) => membership[cluster].includes(name)) || "intelligence";
}

function buildGraph(items) {
  const grouped = Object.fromEntries(Object.keys(clusters).map((cluster) => [cluster, []]));
  items.forEach((item) => grouped[clusterFor(item.name)].push(item));
  const nodes = [];
  const edges = [];

  Object.entries(grouped).forEach(([cluster, group]) => {
    const center = clusters[cluster];
    const radius = group.length > 6 ? 132 : 118;
    group.forEach((item, index) => {
      const angle = -Math.PI / 2 + (Math.PI * 2 * index) / group.length;
      nodes.push({ ...item, cluster, x: center.x + Math.cos(angle) * radius, y: center.y + Math.sin(angle) * radius });
      if (group.length > 1) edges.push({ from: item.name, to: group[(index + 1) % group.length].name, bridge: false });
    });
  });
  bridges.forEach(([from, to]) => edges.push({ from, to, bridge: true }));
  return { nodes, edges };
}

function technologyTags(name) {
  const value = name.toLowerCase().replace(/\s+/g, " ").trim();
  if (value === "c++") return ["cpp"];
  if (value === "c#") return ["csharp"];
  if (value === "c# unity") return ["csharp", "unity"];
  if (value.includes("next.js")) return ["nextjs"];
  if (value === "realm" || value === "realm db") return ["realmdb"];
  return [value.replace(/[^a-z0-9]/g, "")];
}

function projectsForTechnology(name, projects) {
  const skillTag = technologyTags(name)[0];
  return projects.filter((project) => project.techstack?.some((technology) => technologyTags(technology.name).includes(skillTag)));
}

export default function SkillBubbles({ items, projects = [] }) {
  const stageRef = useRef(null);
  const dragRef = useRef(null);
  const animationsRef = useRef(new Map());
  const graph = useMemo(() => buildGraph(items), [items]);
  const [positions, setPositions] = useState({});
  const [draggingNode, setDraggingNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const nodes = graph.nodes.map((node) => ({ ...node, ...(positions[node.name] || {}) }));
  const nodesByName = Object.fromEntries(nodes.map((node) => [node.name, node]));

  useEffect(() => () => {
    animationsRef.current.forEach((animation) => cancelAnimationFrame(animation));
    animationsRef.current.clear();
  }, []);

  const moveNode = (name, x, y) => {
    const position = {
      x: Math.max(NODE_MARGIN, Math.min(GRAPH_WIDTH - NODE_MARGIN, x)),
      y: Math.max(NODE_MARGIN, Math.min(GRAPH_HEIGHT - NODE_MARGIN, y)),
    };
    setPositions((current) => ({
      ...current,
      [name]: position,
    }));
    return position;
  };

  const cancelSpring = (name) => {
    const animation = animationsRef.current.get(name);
    if (animation) cancelAnimationFrame(animation);
    animationsRef.current.delete(name);
  };

  const springHome = (name, from) => {
    cancelSpring(name);
    const home = graph.nodes.find((node) => node.name === name);
    if (!home) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPositions((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
      return;
    }

    let x = from.x;
    let y = from.y;
    let velocityX = 0;
    let velocityY = 0;
    let previousTime = performance.now();

    const step = (time) => {
      const delta = Math.min((time - previousTime) / 16.667, 2);
      previousTime = time;
      velocityX = (velocityX + (home.x - x) * .13 * delta) * Math.pow(.76, delta);
      velocityY = (velocityY + (home.y - y) * .13 * delta) * Math.pow(.76, delta);
      x += velocityX * delta;
      y += velocityY * delta;
      moveNode(name, x, y);

      const settled = Math.hypot(home.x - x, home.y - y) < .2 && Math.hypot(velocityX, velocityY) < .2;
      if (settled) {
        animationsRef.current.delete(name);
        setPositions((current) => {
          const next = { ...current };
          delete next[name];
          return next;
        });
        return;
      }
      animationsRef.current.set(name, requestAnimationFrame(step));
    };

    animationsRef.current.set(name, requestAnimationFrame(step));
  };

  const handlePointerDown = (event, node) => {
    cancelSpring(node.name);
    setHoveredNode(null);
    const bounds = stageRef.current.getBoundingClientRect();
    const scaleX = GRAPH_WIDTH / bounds.width;
    const scaleY = GRAPH_HEIGHT / bounds.height;
    const pointerX = (event.clientX - bounds.left) * scaleX;
    const pointerY = (event.clientY - bounds.top) * scaleY;
    dragRef.current = { name: node.name, pointerId: event.pointerId, offsetX: pointerX - node.x, offsetY: pointerY - node.y, x: node.x, y: node.y };
    setDraggingNode(node.name);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const bounds = stageRef.current.getBoundingClientRect();
    const position = moveNode(drag.name, (event.clientX - bounds.left) * (GRAPH_WIDTH / bounds.width) - drag.offsetX, (event.clientY - bounds.top) * (GRAPH_HEIGHT / bounds.height) - drag.offsetY);
    drag.x = position.x;
    drag.y = position.y;
  };

  const handlePointerUp = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setDraggingNode(null);
    springHome(drag.name, { x: drag.x, y: drag.y });
  };

  const handleKeyDown = (event, node) => {
    const steps = { ArrowLeft: [-10, 0], ArrowRight: [10, 0], ArrowUp: [0, -10], ArrowDown: [0, 10] };
    if (!steps[event.key]) return;
    event.preventDefault();
    moveNode(node.name, node.x + steps[event.key][0], node.y + steps[event.key][1]);
  };

  return (
    <div className="skill-bubble-field">
      <p className="sr-only" id="graph-instructions">Drag a technology to reposition it temporarily. It springs back when released. When focused, use the arrow keys to move it.</p>
      <div className="skill-graph-stage" ref={stageRef}>
        <svg className="skill-graph-edges" viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`} aria-hidden="true">
          {graph.edges.map((edge, index) => {
            const from = nodesByName[edge.from];
            const to = nodesByName[edge.to];
            return from && to ? <line key={`${edge.from}-${edge.to}-${index}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} className={edge.bridge ? "is-bridge" : ""} /> : null;
          })}
        </svg>
        {Object.entries(clusters).map(([key, cluster]) => <div className="skill-cluster-label" style={{ left: cluster.x, top: cluster.y }} key={key}>{cluster.label}</div>)}
        {nodes.map((node) => (
          <div
            className={`skill-node skill-tier-${node.tier || 2}${draggingNode === node.name ? " is-dragging" : ""}${hoveredNode === node.name ? " is-popover-open" : ""}`}
            style={{ left: node.x, top: node.y }}
            key={node.name}
          >
            <button
              type="button"
              className={`skill-bubble skill-cluster-${node.cluster}`}
              data-skill-bubble
              aria-label={`${node.name}, ${clusters[node.cluster].label}. Drag to reposition.`}
              aria-describedby="graph-instructions"
              onMouseEnter={() => setHoveredNode(node.name)}
              onMouseLeave={() => setHoveredNode(null)}
              onPointerDown={(event) => handlePointerDown(event, node)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onKeyDown={(event) => handleKeyDown(event, node)}
            >
              <Image src={node.logo} alt="" width={44} height={44} className="skill-bubble-icon" draggable="false" />
              <span>{node.name}</span>
            </button>
            <div
              className={`skill-popover${hoveredNode === node.name ? " is-visible" : ""}${node.y > GRAPH_HEIGHT / 2 ? " is-above" : ""}${node.x < 145 ? " is-left" : node.x > 855 ? " is-right" : ""}`}
              role="tooltip"
            >
              <p>Used in</p>
              {projectsForTechnology(node.name, projects).length ? (
                <ul>{projectsForTechnology(node.name, projects).map((project) => <li key={project.title}>{project.title}</li>)}</ul>
              ) : (
                <span>No tagged projects yet</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
