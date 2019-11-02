import React from "react";
import styles from "./Balance.module.css";

const Balance = ({ countCirculation, balance }) => (
  <section className={styles.balance}>
    <span>
      <span role="img" aria-label="arrow up">
        ⬆️
      </span>
      {countCirculation().deposit.toFixed(2)}$
    </span>
    <span>
      <span role="img" aria-label="arrow down">
        ⬇️
      </span>
      {countCirculation().withdraw.toFixed(2)}$
    </span>
    <span>Balance: {balance.toFixed(2)}$</span>
  </section>
);

export default Balance;
