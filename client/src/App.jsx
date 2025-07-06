import React from 'react'

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#3b82f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{
          fontSize: '3.75rem',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '1rem'
        }}>
          Family Expense Tracker
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: 'white'
        }}>
          Manage your family's expenses together
        </p>
      </div>
    </div>
  )
}

export default App
