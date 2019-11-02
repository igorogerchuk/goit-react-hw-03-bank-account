import React from "react";
import styles from "./TransactionHistory.module.css";

const TransactionHistory = ({ items }) => (
  <table className={styles.history}>
    <thead>
      <tr>
        <th>Transaction</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {items.map(transaction => (
        <tr key={transaction.id}>
          <td>{transaction.type}</td>
          <td>{Number(transaction.amount).toFixed(2)}$</td>
          <td>{transaction.date}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
export default TransactionHistory;
