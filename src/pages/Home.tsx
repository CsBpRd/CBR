import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import ParticleBg from '../components/ParticleBg'

interface Project {
  id: string; title: string; description: string
  icon: string; gradient: string; link: string
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    fetch('/data/projects.json')
      .then(r => r.json())
      .then(setProjects)
      .catch(() => setProjects([]))
  }, [])

  return (
    <>
      <ParticleBg />
      <header style={{ textAlign: 'center', padding: '180px 20px 80px', position: 'relative' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h1 className="home-title" style={{ background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', textTransform: 'uppercase', letterSpacing: 4 }}>
            CSBPRD
          </h1>
          <p style={{ fontSize: '1.5rem', opacity: 0.9, marginBottom: 30 }}>这里是陈伯睿的个人主页</p>
          <a href="#projects" className="btn">
            查看作品 <i className="fas fa-arrow-down"></i>
          </a>
          <a href="#about" className="btn" style={{ marginLeft: 12 }}>
            了解更多 <i className="fas fa-user"></i>
          </a>
        </div>
      </header>

      <section id="about" style={{ maxWidth: 1200, margin: '0 auto 80px', padding: '0 20px' }}>
        <h2 className="section-title">关于我</h2>
        <div className="about-card" style={{ background: 'var(--bg-card)', borderRadius: 20, padding: 40, boxShadow: 'var(--shadow)' }}>
          <div style={{ width: 200, height: 200, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', color: 'white', flexShrink: 0 }}>
            <i className="fas fa-user"></i>
          </div>
          <div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: 20, color: 'var(--accent-primary)' }}>@陈伯睿</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 12 }}>你好！我是一名热爱技术和创作的开发者，对电脑技术充满热情，喜欢钻研各种技术问题。</p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 12 }}>我热衷于制作视频内容，在B站分享有趣的技术教程和实用工具，希望能帮助更多人解决问题。</p>
            <p style={{ color: 'var(--text-secondary)' }}>我相信技术可以让生活变得更美好，通过不断学习和创新，创造出更多有价值的数字产品。</p>
          </div>
        </div>
      </section>

      <section id="projects" style={{ maxWidth: 1200, margin: '0 auto 100px', padding: '0 20px' }}>
        <h2 className="section-title">我的作品</h2>
        <p className="section-sub">每一个项目都倾注了心血</p>
        <div className="projects-grid">
          {projects.map(p => (
            <ProjectCard key={p.id} {...p} />
          ))}
        </div>
      </section>
    </>
  )
}
