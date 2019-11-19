import React, { Component } from 'react';
import Controls from '../Controls';
import { toast } from 'react-toastify';
import Balance from '../Balance';
import TransactionHistory from '../TransactionHistory';
import styles from './Dashboard.module.css';
import localStorageHandler from '../../services/localStorageHandler';

const uuidv4 = require('uuid/v4');

const TransactionType = {
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
};

export default class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
  };

  componentDidMount() {
    const accountState = localStorageHandler.get('accountState');
    if (accountState) {
      this.setState(accountState);
    }
  }

  componentDidUpdate(prevprops, prevstate) {
    if (prevstate !== this.state) {
      localStorageHandler.save('accountState', this.state);
    }
  }

  addTransaction = ({ target: { innerText: buttonName } }, input) => {
    const amount = Number(input);
    const type =
      buttonName === 'Deposit'
        ? TransactionType.DEPOSIT
        : TransactionType.WITHDRAW;
    const { balance } = this.state;
    if (type === TransactionType.WITHDRAW && amount > balance) {
      toast.error('На счету недостаточно средств для проведения операции!');
      return;
    }

    const transaction = {
      id: uuidv4(),
      type,
      amount,
      date: new Date().toLocaleString(),
    };

    this.setState(state => ({
      transactions: [...state.transactions, transaction],
      balance:
        type === TransactionType.DEPOSIT
          ? state.balance + amount
          : state.balance - amount,
    }));
  };

  countCirculation = () => {
    const circulation = this.state.transactions.reduce(
      (acc, transaction) => {
        return {
          ...acc,
          [transaction.type]:
            acc[transaction.type] + Number(transaction.amount),
        };
      },
      {
        deposit: 0,
        withdraw: 0,
      },
    );
    return circulation;
  };

  render() {
    return (
      <div className={styles.dashboard}>
        <Controls onButton={this.addTransaction} />

        <Balance
          countCirculation={this.countCirculation}
          balance={this.state.balance}
        />

        <TransactionHistory items={this.state.transactions} />
      </div>
    );
  }
}
