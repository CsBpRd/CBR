import { NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

interface NavItem {
  label: string
  path: string
}

export default function Navbar() {
  const [items, setItems] = useState<NavItem[]>([])
  const location = useLocation()

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'data/navigation.json')
      .then(r => r.json())
      .then(setItems)
      .catch(() => setItems([
        { label: '首页', path: '/' },
        { label: 'CBR工具箱', path: '/gjx' },
        { label: 'PU插件', path: '/pu' },
        { label: 'ZGMZ起始页', path: '/zgmz' },
        { label: '通览', path: '/tonglan' },
        { label: '照片筛选器', path: '/photopicker' },
      ]))
  }, [])

  return (
    <nav>
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">CSBPRD</NavLink>
        <div className="nav-links">
          {items.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
