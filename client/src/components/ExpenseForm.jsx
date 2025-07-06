import React, { useState } from 'react';

const ExpenseForm = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
    description: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      
      if (!isValidType) {
        alert(`File ${file.name} is not a supported type. Please upload JPEG, PNG, GIF, or PDF files.`);
        return false;
      }
      
      if (!isValidSize) {
        alert(`File ${file.name} is too large. Please upload files smaller than 5MB.`);
        return false;
      }
      
      return true;
    });

    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!formData.title.trim()) {
      setError('Please enter an expense title');
      setLoading(false);
      return;
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid amount');
      setLoading(false);
      return;
    }

    if (!formData.category) {
      setError('Please select a category');
      setLoading(false);
      return;
    }

    if (!formData.date) {
      setError('Please select a date');
      setLoading(false);
      return;
    }

    try {
      const expenseData = {
        ...formData,
        amount: parseFloat(formData.amount),
        id: Date.now(), // Simple ID generation
        createdAt: new Date().toISOString(),
        attachments: uploadedFiles.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          // In a real app, you'd upload to server and get URL
          url: URL.createObjectURL(file)
        }))
      };

      // TODO: Implement actual API call to save expense
      console.log('Adding expense:', expenseData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call the parent component's onAddExpense function
      onAddExpense(expenseData);
      
      // Reset form
      setFormData({
        title: '',
        amount: '',
        category: '',
        date: '',
        description: ''
      });
      setUploadedFiles([]);
      
      console.log('Expense added successfully');
    } catch (err) {
      setError('Failed to add expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      marginBottom: '24px'
    }}>
      <h3 style={{
        color: '#333',
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        Add New Expense
      </h3>

      {error && (
        <div style={{
          background: '#fee',
          color: '#c53030',
          padding: '12px',
          borderRadius: '6px',
          marginBottom: '20px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: '#333',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Expense Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '16px',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box'
            }}
            placeholder="e.g., Grocery shopping, Gas, Movie tickets"
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <div style={{ flex: 1 }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Amount *
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              placeholder="0.00"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: '#333',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '16px',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box',
              background: 'white'
            }}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: '#333',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Description (Optional)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '16px',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
            placeholder="Add any additional details about this expense..."
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: '#333',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Upload Bills/Receipts (Optional)
          </label>
          <div style={{
            border: '2px dashed #e2e8f0',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
            background: '#f8fafc',
            transition: 'border-color 0.2s'
          }}>
            <input
              type="file"
              multiple
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              style={{
                cursor: 'pointer',
                color: '#667eea',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              📎 Click to upload files (JPEG, PNG, GIF, PDF - max 5MB each)
            </label>
            <p style={{
              color: '#64748b',
              fontSize: '12px',
              margin: '8px 0 0 0'
            }}>
              Drag and drop files here or click to browse
            </p>
          </div>
        </div>

        {uploadedFiles.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{
              color: '#333',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '12px'
            }}>
              Uploaded Files ({uploadedFiles.length})
            </h4>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    background: '#f1f5f9',
                    borderRadius: '6px',
                    marginBottom: '8px'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <p style={{
                      color: '#333',
                      fontSize: '14px',
                      fontWeight: '500',
                      margin: '0 0 2px 0'
                    }}>
                      {file.name}
                    </p>
                    <p style={{
                      color: '#64748b',
                      fontSize: '12px',
                      margin: '0'
                    }}>
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    style={{
                      background: '#fee',
                      color: '#dc2626',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      marginLeft: '8px'
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'opacity 0.2s'
          }}
        >
          {loading ? 'Adding Expense...' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm; 