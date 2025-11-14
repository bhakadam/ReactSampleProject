import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import '../styles/Dashboard.css'

const Dashboard = ({ isDarkMode: externalDarkMode, setIsDarkMode: setExternalDarkMode }) => {
  const [selectedAgent, setSelectedAgent] = useState('Agent A')
  const [localDarkMode, setLocalDarkMode] = useState(externalDarkMode || false)
  
  // Use external dark mode if provided, otherwise use local state
  const isDarkMode = externalDarkMode !== undefined ? externalDarkMode : localDarkMode
  const updateDarkMode = setExternalDarkMode || setLocalDarkMode
  const trendData = [
    { month: 'Jan', functionalCorrectness: 10, e2eProcess: 8 },
    { month: 'Feb', functionalCorrectness: 25, e2eProcess: 15 },
    { month: 'Mar', functionalCorrectness: 20, e2eProcess: 18 },
    { month: 'Apr', functionalCorrectness: 35, e2eProcess: 25 },
    { month: 'May', functionalCorrectness: 30, e2eProcess: 28 },
    { month: 'Jun', functionalCorrectness: 45, e2eProcess: 35 },
    { month: 'Jul', functionalCorrectness: 50, e2eProcess: 40 },
    { month: 'Aug', functionalCorrectness: 65, e2eProcess: 50 },
    { month: 'Sep', functionalCorrectness: 70, e2eProcess: 60 },
    { month: 'Oct', functionalCorrectness: 60, e2eProcess: 55 },
    { month: 'Nov', functionalCorrectness: 78, e2eProcess: 62 },
    { month: 'Dec', functionalCorrectness: 80, e2eProcess: 65 },
  ]

  // Agent-specific metrics
  const agentMetrics = {
    'Agent A': { functionalCorrectness: 95, e2eProcess: 65 },
    'Agent B': { functionalCorrectness: 88, e2eProcess: 72 },
    'Agent C': { functionalCorrectness: 92, e2eProcess: 68 },
  }

  // Mock data for quality assurance
  const qualityData = [
    { processStep: 'Claim Extraction', completeness: 92, accuracy: 88, corroboration: 85 },
    { processStep: 'Data Validation', completeness: 87, accuracy: 94, corroboration: 89 },
    { processStep: 'Risk Assessment', completeness: 80, accuracy: 91, corroboration: 78 },
  ]

  const agents = ['Agent A', 'Agent B', 'Agent C']
  const timeRanges = ['7D', '1M', '4M', '6M', 'YTD', '1Y']
  const currentMetrics = agentMetrics[selectedAgent]

  return (
    <div className={`dashboard ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-top">
          <h1>Summary</h1>
          <div className="controls">
            <button 
              className="theme-toggle"
              onClick={() => updateDarkMode(!isDarkMode)}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <div className="agent-selector">
              <label>Select Agent</label>
              <select value={selectedAgent} onChange={(e) => setSelectedAgent(e.target.value)}>
                {agents.map(agent => (
                  <option key={agent} value={agent}>{agent}</option>
                ))}
              </select>
            </div>
            <div className="time-ranges">
              {timeRanges.map(range => (
                <button key={range} className="time-btn">{range}</button>
              ))}

            </div>
          </div>
        </div>
      </div>

      {/* System Performance */}
      <section className="performance-section">
        <h2>System Performance</h2>
        <div className="performance-grid">
          {/* Functional Correctness Gauge */}
          <div className="gauge-container">
            <div className="gauge-content">
              <h3>Functional Correctness</h3>
              <div className="gauge">
                <svg viewBox="0 0 100 100" className="gauge-svg">
                  <circle cx="50" cy="50" r="45" className="gauge-background" />
                  <circle cx="50" cy="50" r="45" className="gauge-fill" style={{ strokeDasharray: `${currentMetrics.functionalCorrectness * 2.827} 282.7` }} />
                </svg>
                <div className="gauge-text">{currentMetrics.functionalCorrectness}%</div>
              </div>
              <p className="gauge-label">Overall Value (Since Last Release)</p>
            </div>
          </div>

          {/* E2E Process Orchestration Gauge */}
          <div className="gauge-container">
            <div className="gauge-content">
              <h3>E2E Process Orchestration</h3>
              <div className="gauge">
                <svg viewBox="0 0 100 100" className="gauge-svg">
                  <circle cx="50" cy="50" r="45" className="gauge-background-yellow" />
                  <circle cx="50" cy="50" r="45" className="gauge-fill-yellow" style={{ strokeDasharray: `${currentMetrics.e2eProcess * 2.827} 282.7` }} />
                </svg>
                <div className="gauge-text">{currentMetrics.e2eProcess}%</div>
              </div>
              <p className="gauge-label">Overall Value (Since Last Release)</p>
            </div>
          </div>

          {/* Trend Chart */}
          <div className="chart-container full-width">
            <h3>Trend View</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="functionalCorrectness" stroke="#3b82f6" name="Functional Correctness" />
                <Line type="monotone" dataKey="e2eProcess" stroke="#f59e0b" name="E2E Process Orchestration" />
              </LineChart>
            </ResponsiveContainer>
            <div className="time-range-buttons">
              {timeRanges.map(range => (
                <button key={range} className="range-btn">{range}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="quality-section">
        <h2>Quality Assurance</h2>
        <div className="quality-grid">
          <div className="quality-table">
            <table>
              <thead>
                <tr>
                  <th>Process Step</th>
                  <th>Completeness</th>
                  <th>Accuracy</th>
                  <th>Corroboration</th>
                </tr>
              </thead>
              <tbody>
                {qualityData.map((row, idx) => (
                  <tr key={idx}>
                    <td><strong>{row.processStep}</strong></td>
                    <td>{row.completeness}%</td>
                    <td>{row.accuracy}%</td>
                    <td>{row.corroboration}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
