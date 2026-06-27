import { Link } from 'react-router-dom'

interface Props {
  icon: string
  title: string
  description: string
  link: string
  gradient: string
}

export default function ProjectCard({ icon, title, description, link, gradient }: Props) {
  return (
    <div className="project-card">
      <div className="project-header" style={{ background: gradient }}>
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="project-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={link} className="btn">
          访问官网 <i className="fas fa-external-link-alt"></i>
        </Link>
      </div>
    </div>
  )
}
