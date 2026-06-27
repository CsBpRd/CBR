export default function Pu() {
  return (
    <div>
      <section className="hero" style={{ padding: '120px 20px 60px', background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(167,139,250,0.1))' }}>
        <h1 style={{ color: '#8b5cf6' }}>
          <i className="fas fa-window-restore"></i> PPT ULTRA
        </h1>
        <p style={{ fontSize: '1.5rem', marginTop: 16 }}>AI灵感 一键获得</p>
        <a href="#download" className="btn" style={{ marginTop: 24 }}>
          立即体验 <i className="fas fa-play"></i>
        </a>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto 80px', padding: '0 20px' }}>
        <h2 className="section-title">核心功能</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div style={{ fontSize: '3rem', color: '#8b5cf6', marginBottom: 20 }}>
              <i className="fas fa-paint-brush"></i>
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: 15 }}>智能设计</h3>
            <p style={{ color: 'var(--text-secondary)' }}>PU插件提供智能设计功能，可根据你的内容自动生成美观的PPT布局和配色方案。</p>
          </div>
          <div className="feature-card">
            <div style={{ fontSize: '3rem', color: '#8b5cf6', marginBottom: 20 }}>
              <i className="fas fa-bolt"></i>
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: 15 }}>快速制作</h3>
            <p style={{ color: 'var(--text-secondary)' }}>内置多种快捷操作，一键完成复杂的PPT制作任务，大幅提升工作效率。</p>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto 100px', padding: '0 20px' }}>
        <h2 className="section-title">更多便捷功能</h2>
        <div className="features-grid">
          {[
            { icon: 'fa-expand', title: '图片放大', desc: '一键轻松放大图片，无需复杂操作' },
            { icon: 'fa-book', title: '百科查询', desc: '一键查询所需资料，快速获取信息' },
            { icon: 'fa-paint-brush', title: '制作背景', desc: '一键制作精美的PPT背景' },
            { icon: 'fa-layer-group', title: '上百套模板', desc: '提供大量免费模板供你选择' },
            { icon: 'fa-file-export', title: '一键导出', desc: '支持导出为Word、视频等格式，无需会员' },
            { icon: 'fa-image', title: '必应每日壁纸', desc: '每日提供高质量壁纸，美化你的PPT' },
          ].map((f, i) => (
            <div key={i} className="feature-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', color: '#8b5cf6', marginBottom: 15 }}>
                <i className={`fas ${f.icon}`}></i>
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: 10 }}>{f.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="download" style={{ textAlign: 'center', padding: '80px 20px 100px' }}>
        <div style={{ background: 'var(--bg-card)', borderRadius: 20, padding: 50, maxWidth: 800, margin: '0 auto', boxShadow: 'var(--shadow)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: 20 }}>做PPT就用PU插件</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 30, fontSize: '1.1rem' }}>立即下载体验，让PPT制作变得轻松简单</p>
          <a href="/install.exe" className="btn" download>
            <i className="fas fa-download"></i> 立即下载 (Windows)
          </a>
          <p style={{ marginTop: 20, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            文件大小: 6.8 MB | 支持系统: Windows 10+ | 版本: v3.5.2
          </p>
        </div>
      </section>
    </div>
  )
}
