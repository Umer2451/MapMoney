import React from 'react';
import { useSelector } from "react-redux";
import styles from "../styles/monetaryview.module.css"; // Import your CSS module
function Monetary() {
  const data = useSelector((state) => state.appData.userTransactions?.Transactions);
  const userBalance = Number(data.userBalance ?? 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const userExpense = Number(data.userExpense ?? 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const userIncome = Number(data.userIncome ?? 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  return (
    <div className={styles['monetary-container']}>

      <div className={styles['income-container']}>
        <div className={styles['balance-text']}>Income</div>
        <div className={styles['income-amount']}>{userIncome}</div>
      </div>

      <div className={styles['expense-container']}>
        <div className={styles['balance-text']}>Expense</div>
        <div className={styles['expenses-amount']}>{userExpense}</div>
      </div>

      <div className={styles['balance-container']}>
        <div className={styles['balance-text']}>Balance</div>
        <div className={styles['balance-amount']}>{userBalance}</div>
    </div>
    </div>
  );
}

export default Monetary;
