import React from 'react'
import '../styles/Sidebar.css'

const Sidebar = ({ currentPage, setCurrentPage, isDarkMode }) => {
  const menuItems = [
    { id: 'flow', label: 'SoW agentic flow', icon: '🔄' },
    { id: 'cases', label: 'Case Information', icon: '📋' },
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'inventory', label: 'Inventory', icon: '📦' },
    { id: 'documents', label: 'Documents', icon: '📄' },
    { id: 'gateway', label: 'Gateway', icon: '🚪' },
    { id: 'cart', label: 'Agent Cart', icon: '🛒' },
    { id: 'glass', label: 'Glass View', icon: '👓' },
    { id: 'monitoring', label: 'Monitoring', icon: '📈' },
    { id: 'summary', label: 'Summary', icon: '📌' },
  ]

  return (
    <aside className={`sidebar ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="sidebar-header">
        <h2>Menu</h2>
      </div>
      <nav className="sidebar-nav">
        <ul className="menu-list">
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                className={`menu-item ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => setCurrentPage(item.id)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
