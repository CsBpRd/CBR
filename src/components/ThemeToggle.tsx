import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('theme') || 'light'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
      title={theme === 'dark' ? '切换亮色模式' : '切换暗色模式'}
    >
      <i className={theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun'}></i>
    </button>
  )
}
