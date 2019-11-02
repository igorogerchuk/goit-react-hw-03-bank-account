import React, { Component } from "react";
import Controls from "../Controls";
import { toast } from "react-toastify";
import Balance from "../Balance";
import TransactionHistory from "../TransactionHistory";
import styles from "./Dashboard.module.css";

const uuidv4 = require("uuid/v4");

const TransactionType = {
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw"
};

export default class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0
  };

  addTransaction = (amount, type) => {
    const transaction = {
      id: uuidv4(),
      type,
      amount,
      date: new Date().toLocaleString()
    };

    this.setState(state => ({
      transactions: [...state.transactions, transaction]
    }));
  };

  handleDeposit = amount => {
    this.addTransaction(amount, TransactionType.DEPOSIT);
    this.setState(state => ({
      balance: state.balance + Number(amount)
    }));
  };

  handleWithdraw = amount => {
    const { balance } = this.state;
    if (amount > balance) {
      toast.error("На счету недостаточно средств для проведения операции!");
      return;
    }
    this.addTransaction(amount, TransactionType.WITHDRAW);
    this.setState(state => ({
      balance: state.balance - Number(amount)
    }));
  };

  countCirculation = () => {
    const circulation = this.state.transactions.reduce(
      (acc, transaction) => {
        return {
          ...acc,
          [transaction.type]: acc[transaction.type] + Number(transaction.amount)
        };
      },
      {
        deposit: 0,
        withdraw: 0
      }
    );
    return circulation;
  };

  render() {
    return (
      <div className={styles.dashboard}>
        <Controls
          onDeposit={this.handleDeposit}
          onWithdraw={this.handleWithdraw}
        />

        <Balance
          countCirculation={this.countCirculation}
          balance={this.state.balance}
        />
        <TransactionHistory items={this.state.transactions} />
      </div>
    );
  }
}
