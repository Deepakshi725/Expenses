import React, { useState } from 'react'
import Auth from './components/Auth'
import ExpenseTracker from './components/ExpenseTracker'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div>
            <h1 style={{
              color: '#333',
              fontSize: '28px',
              fontWeight: 'bold',
              margin: '0'
            }}>
              Family Expense Tracker
            </h1>
            <p style={{
              color: '#64748b',
              fontSize: '14px',
              margin: '4px 0 0 0'
            }}>
              Manage your family's expenses together
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
          >
            Logout
          </button>
        </div>
        
        <ExpenseTracker />
      </div>
    </div>
  )
}

export default App
