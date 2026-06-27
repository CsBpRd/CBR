export default function Pu() {
  return (
    <div>
      <section className="hero" style={{ padding: '140px 20px 80px' }}>
        <h1 style={{ fontSize: '3.5rem' }}>
          <i className="fas fa-window-restore"></i> PU插件
        </h1>
        <p>专为 PPT 制作设计的插件，解决制作过程中的各种问题，让 PPT 制作变得轻松简单。</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/install.exe" className="btn" download>
            <i className="fas fa-download"></i> 立即下载 (Windows)
          </a>
          <a href="https://cbrgjx.csbprd.top" className="btn btn-outline" target="_blank">
            <i className="fas fa-external-link-alt"></i> 了解更多
          </a>
        </div>
      </section>

      <section className="page-container">
        <h2 className="section-title">核心功能</h2>
        <p className="section-sub">让 PPT 制作痛苦迎刃而解</p>
        <div className="features-grid">
          {[
            { icon: 'fa-magic', title: '一键美化', desc: '智能排版与配色，瞬间提升 PPT 颜值', color: '#8b5cf6' },
            { icon: 'fa-clone', title: '批量处理', desc: '多页面统一操作，效率翻倍', color: '#ec4899' },
            { icon: 'fa-palette', title: '模板丰富', desc: '海量精美模板，随心选择', color: '#f59e0b' },
            { icon: 'fa-bolt', title: '极速运行', desc: '轻量级插件，不拖慢 Office 速度', color: '#10b981' },
            { icon: 'fa-sync-alt', title: '一键更新', desc: '自动检测新版本，随时保持最新', color: '#3b82f6' },
            { icon: 'fa-question-circle', title: '贴心帮助', desc: '详细使用文档，快速上手不迷路', color: '#ef4444' },
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
        <h2 className="section-title">做 PPT 就用 PU插件</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 36, fontSize: '1.1rem' }}>
          立即下载体验，让 PPT 制作变得轻松简单
        </p>
        <a href="/install.exe" className="btn" download style={{ fontSize: '1.2rem', padding: '18px 48px' }}>
          <i className="fas fa-download"></i> 立即下载 (Windows)
        </a>
        <p style={{ marginTop: 12, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          支持 Windows 10/11 · 安装包约 6.5 MB
        </p>
      </section>
    </div>
  )
}
