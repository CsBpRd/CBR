export default function Gjx() {
  return (
    <div>
      <section className="hero" style={{ padding: '120px 20px 60px' }}>
        <h1 style={{ fontSize: '3.5rem', color: 'var(--accent-primary)' }}>
          <i className="fas fa-toolbox"></i> CBR工具箱
        </h1>
        <p style={{ fontSize: '1.5rem', marginTop: 16 }}>清爽界面，灵动随心</p>
        <a href="#download" className="btn" style={{ marginTop: 24 }}>
          立即体验 <i className="fas fa-play"></i>
        </a>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto 80px', padding: '0 20px' }}>
        <h2 className="section-title">功能亮点</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div style={{ fontSize: '3rem', color: 'var(--accent-primary)', marginBottom: 20 }}>
              <i className="fas fa-th-large"></i>
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: 15 }}>工具数量多</h3>
            <p style={{ color: 'var(--text-secondary)' }}>提供更多工具，满足你的各种需求。页面简洁清爽，能有效提升你的效率。</p>
          </div>
          <div className="feature-card">
            <div style={{ fontSize: '3rem', color: 'var(--accent-primary)', marginBottom: 20 }}>
              <i className="fas fa-bolt"></i>
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: 15 }}>快速处理</h3>
            <p style={{ color: 'var(--text-secondary)' }}>优化的处理引擎，让各种操作更加快速高效，节省宝贵时间。</p>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto 100px', padding: '0 20px' }}>
        <h2 className="section-title">具体功能</h2>
        <div className="features-grid">
          {[
            { icon: 'fa-shapes', title: '形状制作', desc: '一键生成特殊形状' },
            { icon: 'fa-paint-brush', title: '插画制作', desc: '制作好看的插画' },
            { icon: 'fa-video', title: '视频查找', desc: '高清视频一键搜索' },
            { icon: 'fa-hand-point-up', title: '手指制作', desc: '3D手指一键生成' },
            { icon: 'fa-calendar-alt', title: '每日壁纸', desc: '每日更新高质量壁纸' },
            { icon: 'fa-palette', title: '配色选择', desc: '提供配色方案选择' },
          ].map((f, i) => (
            <div key={i} className="feature-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', color: 'var(--accent-primary)', marginBottom: 15 }}>
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
          <h2 style={{ fontSize: '2rem', marginBottom: 20 }}>立即体验CBR工具箱</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 30, fontSize: '1.1rem' }}>清爽界面，功能强大，让你的工作更加高效</p>
          <a href="/install.msi" className="btn" download>
            <i className="fas fa-download"></i> 立即下载 (Windows)
          </a>
          <p style={{ marginTop: 20, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            文件大小: 31.2 MB | 支持系统: Windows 7+ | 版本: v5.0.0
          </p>
        </div>
      </section>
    </div>
  )
}
