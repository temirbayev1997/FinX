export default function Card({ title, value, highlight }) {
  return (
    <div className="bg-secondary p-4 rounded-xl border border-border shadow">
      <p className="text-muted text-sm">{title}</p>
      <p className={`text-2xl font-bold ${highlight ? "text-accent" : ""}`}>
        {value}
      </p>
    </div>
  );
}