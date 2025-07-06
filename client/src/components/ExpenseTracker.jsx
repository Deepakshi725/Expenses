import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (newExpense) => {
    setExpenses(prevExpenses => [newExpense, ...prevExpenses]);
  };

  const handleDeleteExpense = (expenseId) => {
    setExpenses(prevExpenses => 
      prevExpenses.filter(expense => expense.id !== expenseId)
    );
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '32px'
      }}>
        <h1 style={{
          color: '#333',
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '8px'
        }}>
          Family Expense Tracker
        </h1>
        <p style={{
          color: '#64748b',
          fontSize: '16px',
          margin: '0'
        }}>
          Track and manage your family's expenses together
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        <div>
          <ExpenseForm onAddExpense={handleAddExpense} />
        </div>
        <div>
          <ExpenseList 
            expenses={expenses} 
            onDeleteExpense={handleDeleteExpense} 
          />
        </div>
      </div>

      {/* Mobile responsive layout */}
      <style>{`
        @media (max-width: 768px) {
          .expense-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ExpenseTracker; 