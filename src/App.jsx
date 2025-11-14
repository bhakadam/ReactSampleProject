import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('summary')
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} isDarkMode={isDarkMode} />
      <div className="main-content">
        <Dashboard isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
    </div>
  )
}

export default App
