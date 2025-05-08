import React, { useEffect, useState } from 'react';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch account data
    fetch('http://127.0.0.1:8000/accounts')
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch accounts");
        return res.json();
      })
      .then(setAccounts)
      .catch(setError);

    // Fetch transaction data
    fetch('http://127.0.0.1:8000/transactions')
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch transactions");
        return res.json();
      })
      .then(setTransactions)
      .catch(setError);
  }, []);

  const totalSpending = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h1>FinWell Dashboard</h1>

      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

      <h2>Accounts</h2>
      <ul>
        {accounts.map((acc) => (
          <li key={acc.account_id}>
            {acc.type} — ${acc.balance}
          </li>
        ))}
      </ul>

      <h2>Transactions</h2>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.id}>
            {tx.category}: ${tx.amount}
          </li>
        ))}
      </ul>

      <h2>Recommendations</h2>
      <ul>
        {totalSpending > 1000 ? (
          <li>Consider cutting expenses — you've spent over $1000!</li>
        ) : (
          <li>Great job! You're managing your spending well.</li>
        )}
      </ul>
    </div>
  );
}

export default App;
