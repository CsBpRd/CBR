export default function Gjx() {
  return (
    <div>
      <section className="hero" style={{ padding: '140px 20px 80px' }}>
        <h1 style={{ fontSize: '3.5rem' }}>
          <i className="fas fa-toolbox"></i> CBR工具箱
        </h1>
        <p>简洁、轻快、实用的多功能工具箱，让复杂的事情变得简单。</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/install.msi" className="btn" download>
            <i className="fas fa-download"></i> 立即下载 (Windows)
          </a>
          <a href="https://cbrgjx.csbprd.top" className="btn btn-outline" target="_blank">
            <i className="fas fa-external-link-alt"></i> 在线体验
          </a>
        </div>
      </section>

      <section className="page-container">
        <h2 className="section-title">功能特点</h2>
        <p className="section-sub">集合了日常工作和生活中常用的实用功能</p>
        <div className="features-grid">
          {[
            { icon: 'fa-bolt', title: '快速高效', desc: '一键操作，秒级响应，无需等待', color: '#3b82f6' },
            { icon: 'fa-shield-alt', title: '安全可靠', desc: '本地处理，数据不上传，保护隐私', color: '#10b981' },
            { icon: 'fa-expand', title: '功能丰富', desc: '多种实用工具，一个应用全搞定', color: '#8b5cf6' },
            { icon: 'fa-tools', title: '持续更新', desc: '不断添加新功能，满足更多需求', color: '#f59e0b' },
            { icon: 'fa-laptop-code', title: '界面清爽', desc: '现代化设计风格，操作直观顺手', color: '#ef4444' },
            { icon: 'fa-windows', title: 'Windows 原生', desc: '专为 Windows 打造，运行流畅稳定', color: '#6366f1' },
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

      <section style={{ textAlign: 'center', padding: '80px 20px 100px' }}>
        <h2 className="section-title">立即体验</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 36, fontSize: '1.1rem' }}>
          清爽界面，功能强大，让你的工作更加高效
        </p>
        <a href="/install.msi" className="btn" download style={{ fontSize: '1.2rem', padding: '18px 48px' }}>
          <i className="fas fa-download"></i> 立即下载 (Windows)
        </a>
        <p style={{ marginTop: 12, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          支持 Windows 10/11 · 安装包约 30 MB
        </p>
      </section>
    </div>
  )
}
