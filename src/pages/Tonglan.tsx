import FeatureCard from '../components/FeatureCard'

const features = [
  { icon: 'fa-tag', title: '自定义名称', description: 'App 名称自由设定，不限于科技新闻，任何类型的报告都能完美适配。', color: '#6366f1' },
  { icon: 'fa-calendar-alt', title: '灵活周期', description: '日报、周报、月报一键切换，所有界面文字自动跟随，无需手动调整。', color: '#8b5cf6' },
  { icon: 'fa-folder-open', title: '自由目录', description: '任意选择本地文件夹，智能扫描并自动识别文件命名格式。', color: '#22c55e' },
  { icon: 'fa-adjust', title: '亮暗主题', description: '内置暗色与亮色双主题，一键切换，设置自动保存。', color: '#f59e0b' },
  { icon: 'fa-file-alt', title: '多格式支持', description: 'HTML、Markdown、纯文本均可预览，自动识别并渲染。', color: '#ef4444' },
  { icon: 'fa-magic', title: '智能检测', description: '选择目录后自动识别文件命名格式，无需手动配置。', color: '#6366f1' },
]

export default function Tonglan() {
  return (
    <div>
      <section className="hero" style={{ padding: '140px 20px 80px', background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.08))' }}>
        <img
          src="/CBR/tonglan-icon.png"
          alt="通览"
          style={{ width: 100, height: 100, borderRadius: 22, marginBottom: 24, boxShadow: '0 12px 40px rgba(99,102,241,0.3)' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        <h1 style={{ fontSize: '3.5rem', marginBottom: 16, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
          通览
        </h1>
        <p>可自定义名称、周期、目录与主题的新闻报告浏览器。支持 HTML、Markdown、纯文本，自动识别文件格式，即开即用。</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://github.com/CsBpRd/news-browser/releases/latest" className="btn" target="_blank">
            <i className="fas fa-download"></i> 立即下载
          </a>
          <a href="https://github.com/CsBpRd/news-browser" className="btn btn-outline" target="_blank">
            <i className="fab fa-github"></i> 查看源码
          </a>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 20px 0' }}>
        <h2 className="section-title">功能特性</h2>
        <p className="section-sub">一切皆可定制，完全属于您的报告浏览器</p>
        <div className="features-grid">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </section>

      {/* Preview */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 20px 0' }}>
        <h2 className="section-title">界面预览</h2>
        <p className="section-sub">简洁高效的浏览体验</p>
        <div className="preview-box" style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="preview-bar">
            <span className="preview-dot"></span>
            <span className="preview-dot"></span>
            <span className="preview-dot"></span>
            <span style={{ flex: 1, textAlign: 'center', fontSize: 12, color: 'var(--text-secondary)' }}>通览</span>
          </div>
          <div className="preview-body">
            <div className="preview-sidebar">
              <div style={{ padding: '8px 10px', borderRadius: 8, fontSize: 12, background: 'rgba(99,102,241,0.15)', color: '#818cf8', marginBottom: 2 }}>
                <i className="fas fa-th"></i> 全部周报 <span style={{ float: 'right', opacity: 0.5 }}>11</span>
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-secondary)', padding: '8px 10px', opacity: 0.6 }}>按年份</div>
              {['2026年', '2025年'].map(y => (
                <div key={y} style={{ padding: '8px 10px', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary)', marginBottom: 2 }}>
                  <i className="far fa-clock"></i> {y}
                </div>
              ))}
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: 15, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>科技新闻周报</strong>
                <span style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: 12, fontSize: 11, color: 'var(--text-secondary)' }}>
                  <i className="fas fa-search"></i> 搜索周报...
                </span>
              </div>
              <div className="preview-stats">
                {[['📊 周报总数', '11'], ['📅 年份跨度', '2025-2026'], ['💾 总大小', '2.1 MB'], ['🆕 最新一期', '2026-06-21']].map(([l, v]) => (
                  <div key={l} className="preview-stat">{l} <strong>{v}</strong></div>
                ))}
              </div>
              <div className="preview-cards">
                {[['21 Jun', '2026-06-21 · 周六 3.2 KB'], ['14 Jun', '2026-06-14 · 周六 2.8 KB']].map(([d, m], i) => (
                  <div key={i} style={{ flex: 1, padding: 14, borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{d}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, margin: '4px 0' }}>科技新闻周报</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{m}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download */}
      <section style={{ textAlign: 'center', padding: '80px 20px 100px', background: 'linear-gradient(135deg, rgba(99,102,241,0.08), transparent)' }}>
        <h2 className="section-title">免费下载</h2>
        <p style={{ textAlign: 'center', fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: 36 }}>
          macOS 原生应用，即开即用 · 支持 macOS 13+
        </p>
        <a href="https://github.com/CsBpRd/news-browser/releases/latest" className="btn" target="_blank" style={{ fontSize: '1.2rem', padding: '18px 48px' }}>
          <i className="fas fa-download"></i> 从 GitHub 下载
        </a>
        <p style={{ marginTop: 16, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          版本 v0.1.0 ·{' '}
          <a href="https://github.com/CsBpRd/news-browser/releases" target="_blank" style={{ color: 'var(--accent-primary)' }}>查看所有版本</a>
          {' '}·{' '}
          <a href="https://github.com/CsBpRd/news-browser" target="_blank" style={{ color: 'var(--accent-primary)' }}>GitHub 仓库</a>
        </p>
      </section>
    </div>
  )
}
