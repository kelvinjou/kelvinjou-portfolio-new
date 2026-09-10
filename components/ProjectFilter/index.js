export default function ProjectFilter({ options, value, onChange }) {
  return (
    <div className="project-filter" role="group" aria-label="Filter projects by platform">
      {options.map((option) => (
        <button key={option} type="button" aria-pressed={value === option} className={value === option ? "is-active" : ""} onClick={() => onChange(option)}>
          {option}
        </button>
      ))}
    </div>
  );
}
