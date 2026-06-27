export default function Zgmz() {
  return (
    <div>
      <section className="hero" style={{ padding: '120px 20px 60px', background: 'linear-gradient(135deg, rgba(236,72,153,0.1), rgba(244,114,182,0.05))' }}>
        <h1 style={{ fontSize: '3.5rem', background: 'linear-gradient(90deg, #ec4899, #f472b6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
          <i className="fas fa-home"></i> ZGMZ起始页
        </h1>
        <p>精心设计的浏览器起始页，让你每次打开浏览器都能拥有愉悦的心情和高效的工作体验。</p>
        <a href="https://www.csbprd.top/zgmzpage.html" className="btn" target="_blank">
          <i className="fas fa-external-link-alt"></i> 访问页面
        </a>
      </section>
      <section className="page-container">
        <h2 className="section-title">设计亮点</h2>
        <p className="section-sub">美观与效率的完美结合</p>
        <div className="features-grid">
          {[
            { icon: 'fa-paint-brush', title: '精美设计', desc: '现代化简约风格，视觉体验出众', color: '#ec4899' },
            { icon: 'fa-search', title: '智能搜索', desc: '集成多引擎搜索，快速找到所需', color: '#f472b6' },
            { icon: 'fa-clock', title: '快捷入口', desc: '常用网站一键直达，省时省力', color: '#fbbf24' },
          ].map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon" style={{ background: `${f.color}20`, color: f.color }}>
                <i className={`fas ${f.icon}`}></i>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
