import React, { useState } from 'react';

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const categories = [
    'All Categories',
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Healthcare',
    'Education',
    'Utilities',
    'Housing',
    'Travel',
    'Other'
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Food & Dining': '#10B981',
      'Transportation': '#3B82F6',
      'Shopping': '#F59E0B',
      'Entertainment': '#8B5CF6',
      'Healthcare': '#EF4444',
      'Education': '#06B6D4',
      'Utilities': '#6B7280',
      'Housing': '#F97316',
      'Travel': '#EC4899',
      'Other': '#8B5CF6'
    };
    return colors[category] || '#6B7280';
  };

  const filteredAndSortedExpenses = expenses
    .filter(expense => 
      filterCategory === '' || filterCategory === 'All Categories' || expense.category === filterCategory
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'amount':
          return b.amount - a.amount;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

  const totalAmount = filteredAndSortedExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '24px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <h3 style={{
          color: '#333',
          fontSize: '20px',
          fontWeight: 'bold',
          margin: '0'
        }}>
          Expenses ({filteredAndSortedExpenses.length})
        </h3>
        
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '2px solid #e2e8f0',
              borderRadius: '6px',
              fontSize: '14px',
              background: 'white'
            }}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '2px solid #e2e8f0',
              borderRadius: '6px',
              fontSize: '14px',
              background: 'white'
            }}
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="title">Sort by Title</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>
      </div>

      {totalAmount > 0 && (
        <div style={{
          background: '#f8fafc',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <p style={{
            color: '#64748b',
            fontSize: '14px',
            margin: '0 0 4px 0'
          }}>
            Total Amount:
          </p>
          <p style={{
            color: '#333',
            fontSize: '24px',
            fontWeight: 'bold',
            margin: '0'
          }}>
            {formatAmount(totalAmount)}
          </p>
        </div>
      )}

      {filteredAndSortedExpenses.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: '#64748b'
        }}>
          <p style={{ margin: '0', fontSize: '16px' }}>
            {filterCategory && filterCategory !== 'All Categories' 
              ? `No expenses found in ${filterCategory} category`
              : 'No expenses found. Add your first expense above!'
            }
          </p>
        </div>
      ) : (
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
          {filteredAndSortedExpenses.map(expense => (
            <div
              key={expense.id}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '12px',
                background: '#fafafa'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '8px'
              }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    color: '#333',
                    fontSize: '16px',
                    fontWeight: '600',
                    margin: '0 0 4px 0'
                  }}>
                    {expense.title}
                  </h4>
                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      background: getCategoryColor(expense.category),
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {expense.category}
                    </span>
                    <span style={{
                      color: '#64748b',
                      fontSize: '14px'
                    }}>
                      {formatDate(expense.date)}
                    </span>
                  </div>
                  {expense.description && (
                    <p style={{
                      color: '#64748b',
                      fontSize: '14px',
                      margin: '8px 0 0 0',
                      fontStyle: 'italic'
                    }}>
                      {expense.description}
                    </p>
                  )}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{
                    color: '#333',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}>
                    {formatAmount(expense.amount)}
                  </span>
                  <button
                    onClick={() => onDeleteExpense(expense.id)}
                    style={{
                      background: '#fee',
                      color: '#dc2626',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    title="Delete expense"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList; 