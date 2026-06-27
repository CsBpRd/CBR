interface Props {
  icon: string
  title: string
  description: string
  color: string
}

export default function FeatureCard({ icon, title, description, color }: Props) {
  return (
    <div className="feature-card">
      <div className="feature-icon" style={{ background: `${color}20`, color }}>
        <i className={`fas ${icon}`}></i>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}
