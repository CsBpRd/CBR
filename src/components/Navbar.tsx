import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

interface NavItem {
  label: string
  path: string
}

export default function Navbar() {
  const [items, setItems] = useState<NavItem[]>([])
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    fetch('/data/navigation.json')
      .then(r => r.json())
      .then(setItems)
      .catch(() => setItems([]))
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav>
      <div className="nav-container">
        <NavLink to="/" className="nav-logo" onClick={closeMenu}>
          <img src="/LOGO.png" alt="Logo" style={{ height: 32, width: 'auto', verticalAlign: 'middle', marginRight: 8 }} />
          CSBPRD
        </NavLink>
        <button
          className="nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="菜单"
        >
          <i className={`fas fa-${menuOpen ? 'times' : 'bars'}`}></i>
        </button>
        <div className={`nav-links${menuOpen ? ' open' : ''}`}>
          {items.map(item =>
            item.path.endsWith('.html') ? (
              <a key={item.path} href={item.path} onClick={closeMenu}>{item.label}</a>
            ) : (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            )
          )}
        </div>
      </div>
    </nav>
  )
}
