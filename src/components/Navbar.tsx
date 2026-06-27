import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

interface NavItem {
  label: string
  path: string
}

export default function Navbar() {
  const [items, setItems] = useState<NavItem[]>([])

  useEffect(() => {
    fetch('/data/navigation.json')
      .then(r => r.json())
      .then(setItems)
      .catch(() => setItems([]))
  }, [])

  return (
    <nav>
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">CSBPRD</NavLink>
        <div className="nav-links">
          {items.map(item =>
            item.path.endsWith('.html') ? (
              <a key={item.path} href={item.path}>{item.label}</a>
            ) : (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => isActive ? 'active' : ''}
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
