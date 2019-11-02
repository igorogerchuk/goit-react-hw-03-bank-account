import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Controls.module.css";

export default class Controls extends Component {
  state = {
    amount: ""
  };

  handleInput = e => {
    this.setState({ amount: e.currentTarget.value });
  };

  handleDepositButton = () => {
    const { amount } = this.state;
    if (amount <= 0) {
      toast.error("Введите сумму для проведения операции!");
      return;
    }
    this.props.onDeposit(amount);
    this.setState({ amount: "" });
  };

  handleWithdrawButton = () => {
    const { amount } = this.state;
    if (amount <= 0) {
      toast.error("Введите сумму для проведения операции!");
      return;
    }
    this.props.onWithdraw(this.state.amount);
    this.setState({ amount: "" });
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
        <button type="button" onClick={this.handleDepositButton}>
          Deposit
        </button>
        <button type="button" onClick={this.handleWithdrawButton}>
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
