export default function Gjx() {
  return (
    <div>
      <section className="hero" style={{ padding: '120px 20px 60px' }}>
        <h1 style={{ fontSize: '3.5rem' }}>
          <i className="fas fa-toolbox"></i> CBR工具箱
        </h1>
        <p>简洁、轻快、实用的多功能工具箱，让复杂的事情变得简单。</p>
        <a href="https://cbrgjx.csbprd.top" className="btn" target="_blank">
          <i className="fas fa-external-link-alt"></i> 打开工具箱
        </a>
      </section>
      <section className="page-container">
        <h2 className="section-title">功能特点</h2>
        <p className="section-sub">集合了日常工作和生活中常用的实用功能</p>
        <div className="features-grid">
          {[
            { icon: 'fa-bolt', title: '快速高效', desc: '一键操作，秒级响应，无需等待', color: '#3b82f6' },
            { icon: 'fa-shield-alt', title: '安全可靠', desc: '本地处理，数据不上传，保护隐私', color: '#10b981' },
            { icon: 'fa-expand', title: '功能丰富', desc: '多种实用工具，一个应用全搞定', color: '#8b5cf6' },
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
