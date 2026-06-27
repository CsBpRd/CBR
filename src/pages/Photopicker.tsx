export default function Photopicker() {
  return (
    <div>
      <section className="hero" style={{ padding: '120px 20px 60px', background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(52,211,153,0.05))' }}>
        <h1 style={{ fontSize: '3.5rem', background: 'linear-gradient(90deg, #10b981, #34d399)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
          <i className="fas fa-images"></i> 照片筛选器
        </h1>
        <p>智能照片筛选工具，轻松管理和筛选你的图片库，快速找到想要的图片。</p>
        <a href="https://www.csbprd.top/photopicker.html" className="btn" target="_blank">
          <i className="fas fa-external-link-alt"></i> 打开工具
        </a>
      </section>
      <section className="page-container">
        <h2 className="section-title">功能特点</h2>
        <p className="section-sub">让图片管理变得简单高效</p>
        <div className="features-grid">
          {[
            { icon: 'fa-filter', title: '智能筛选', desc: '多种筛选条件，快速定位目标图片', color: '#10b981' },
            { icon: 'fa-tachometer-alt', title: '极速浏览', desc: '流畅的图片浏览体验，告别卡顿', color: '#34d399' },
            { icon: 'fa-folder-tree', title: '分类管理', desc: '自定义分类标签，井井有条', color: '#6ee7b7' },
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
