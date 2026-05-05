import { NavLink } from 'react-router-dom'

const links = [
  { to: '/',            label: 'Resumen'   },
  { to: '/essentials',  label: 'Esenciales'},
  { to: '/personal',    label: 'Personal'  },
  { to: '/savings',     label: 'Ahorros'   },
  { to: '/goals',       label: 'Metas'     },
]

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <span className="font-bold text-gray-900 tracking-tight">2030 Finanzas</span>
        <ul className="flex gap-1">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-gray-100 text-gray-900 font-medium'
                      : 'text-gray-500 hover:text-gray-800'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}