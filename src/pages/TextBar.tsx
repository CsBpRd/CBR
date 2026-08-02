import FeatureCard from '../components/FeatureCard'
import ParticleBg from '../components/ParticleBg'

const features = [
  { icon: 'fa-clock', title: '时间变量渲染', description: '菜单栏直接显示 {HH:mm:ss} {yyyy-MM-dd} {greet} 等变量，任意格式自由组合，秒级实时刷新。', color: '#f97316' },
  { icon: 'fa-sticky-note', title: 'FiveNotes 式记事本', description: '按下即弹出，5 色笔记快速切换，自动保存到本地，随写随记。', color: '#fb923c' },
  { icon: 'fa-mouse-pointer', title: '左键动作', description: '左键可配置为打开任意 App、文档、网页或记事本，右键打开设置。', color: '#fbbf24' },
  { icon: 'fa-palette', title: '高度自定义', description: '字体、字号、粗体、文字颜色、背景颜色全部可调，一键恢复默认。', color: '#22c55e' },
  { icon: 'fa-coins', title: '余额查询', description: '支持 {ds_balance} 显示 DeepSeek API 充值余额，钥匙串安全存储密钥。', color: '#f59e0b' },
  { icon: 'fa-rocket', title: '开机启动', description: '登录时自动启动，菜单栏常驻，轻量不打扰。', color: '#ef4444' },
]

export default function TextBar() {
  return (
    <div>
      <ParticleBg />
      <section className="hero" style={{ padding: '140px 20px 80px' }}>
        <img
          src="/textbar-icon.png"
          alt="TextBar"
          style={{ width: 100, height: 100, borderRadius: 22, marginBottom: 24, boxShadow: '0 12px 40px rgba(251,146,60,0.3)' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        <h1 style={{ marginBottom: 16, color: 'var(--accent-primary)' }}>
          TextBar
        </h1>
        <p>macOS 菜单栏自定义文本工具：时间日期变量渲染、FiveNotes 式记事本、左键快捷动作，一切尽在菜单栏。</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://github.com/CsBpRd/TextBar/releases/latest" className="btn" target="_blank">
            <i className="fas fa-download"></i> 立即下载
          </a>
          <a href="https://github.com/CsBpRd/TextBar" className="btn btn-outline" target="_blank">
            <i className="fab fa-github"></i> 查看源码
          </a>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 20px 0' }}>
        <h2 className="section-title">功能特性</h2>
        <p className="section-sub">菜单栏里的万能文本，一次配置长久陪伴</p>
        <div className="features-grid">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </section>

      <section style={{ textAlign: 'center', padding: '80px 20px 100px' }}>
        <h2 className="section-title">免费下载</h2>
        <p style={{ textAlign: 'center', fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: 36 }}>
          macOS 原生应用，即开即用 · 支持 macOS 13+
        </p>
        <a href="https://github.com/CsBpRd/TextBar/releases/latest" className="btn" target="_blank" style={{ fontSize: '1.2rem', padding: '18px 48px' }}>
          <i className="fas fa-download"></i> 从 GitHub 下载
        </a>
        <p style={{ marginTop: 16, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          版本 v1.0.0 ·{' '}
          <a href="https://github.com/CsBpRd/TextBar/releases" target="_blank" style={{ color: 'var(--accent-primary)' }}>查看所有版本</a>
          {' '}·{' '}
          <a href="https://github.com/CsBpRd/TextBar" target="_blank" style={{ color: 'var(--accent-primary)' }}>GitHub 仓库</a>
        </p>
      </section>
    </div>
  )
}
