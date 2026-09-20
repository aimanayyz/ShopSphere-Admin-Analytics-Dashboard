export default function StatCard({ label, value, change }) {
  return (
    <article className="stat-card">
      <div>
        <p className="stat-label">{label}</p>
        <h2 className="stat-value">{value}</h2>
      </div>
      <span className="stat-change">{change}</span>
    </article>
  )
}
