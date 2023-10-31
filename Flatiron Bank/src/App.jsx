import React, { useState, useEffect } from 'react';


function App() {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({ date: '', description: '', category: '', amount: 0 });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:8001/transactions')
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleAddTransaction = () => {
    fetch('http://localhost:8001/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTransaction),
    })
      .then((response) => response.json())
      .then((data) => {
        setTransactions([...transactions, data]);
        setNewTransaction({ date: '', description: '', category: '', amount:  0});
      })
      .catch((error) => console.error(error));
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>The Royal Bank of Flatiron</h1>
      <div className="transaction-form">

        <div className='Search-bar'>
        <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
        </div>
       <div>
       <input
          type="text"
          name="date"
          value={newTransaction.date}
          onChange={handleInputChange}
          placeholder="Date"
        />
        <input
          type="text"
          name="description"
          value={newTransaction.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <input
          type="text"
          name="category"
          value={newTransaction.category}
          onChange={handleInputChange}
          placeholder="Category"
        />
        <input
          type="number"
          name="amount"
          value={newTransaction.amount}
          onChange={handleInputChange}
          placeholder="Amount"
        />
        <div>
        <button onClick={handleAddTransaction}>Add Transaction</button>
        </div>
        
       </div>
        
      </div>
      
      
      <table className='table'>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
      
        
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
      
      </table>
    </div>
  );
}

export default App;