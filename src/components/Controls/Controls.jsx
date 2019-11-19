import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Controls.module.css';

export default class Controls extends Component {
  state = {
    amount: '',
  };

  handleInput = e => {
    this.setState({ amount: e.currentTarget.value });
  };

  handleTransaction = e => {
    const { amount } = this.state;
    if (amount <= 0) {
      toast.error('Введите сумму для проведения операции!');
      return;
    }
    this.props.onButton(e, amount);
    this.setState({ amount: '' });
  };

  render() {
    const { amount } = this.state;
    return (
      <section className={styles.controls}>
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={this.handleInput}
        />
        <button type="button" onClick={this.handleTransaction}>
          Deposit
        </button>
        <button type="button" onClick={this.handleTransaction}>
          Withdraw
        </button>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </section>
    );
  }
}
