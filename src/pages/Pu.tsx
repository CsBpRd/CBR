export default function Pu() {
  return (
    <div>
      <section className="hero" style={{ padding: '120px 20px 60px' }}>
        <h1 style={{ fontSize: '3.5rem' }}>
          <i className="fas fa-window-restore"></i> PU插件
        </h1>
        <p>专为PPT制作设计的插件，解决制作过程中的各种问题，让PPT制作变得轻松简单。</p>
        <a href="https://cbrgjx.csbprd.top" className="btn" target="_blank">
          <i className="fas fa-download"></i> 了解更多
        </a>
      </section>
      <section className="page-container">
        <h2 className="section-title">核心功能</h2>
        <p className="section-sub">让PPT制作痛苦迎刃而解</p>
        <div className="features-grid">
          {[
            { icon: 'fa-magic', title: '一键美化', desc: '智能排版与配色，瞬间提升PPT颜值', color: '#8b5cf6' },
            { icon: 'fa-clone', title: '批量处理', desc: '多页面统一操作，效率翻倍', color: '#ec4899' },
            { icon: 'fa-palette', title: '模板丰富', desc: '海量精美模板，随心选择', color: '#f59e0b' },
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
