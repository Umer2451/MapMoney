import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from "../styles/home.module.css";
import icon from "../assets/MoneyMaps.png";
import Monetary from '../components/monetaryview';
import AddmonetaryActions from '../components/addmonetaryactions';
import AppDountChart from '../components/doughnut';
function Home() {
  return (
    <div className={styles['main-container']}>
      <div className={styles['left-nav']}>
        <div className={styles["icon-div"]}>
          <img src={icon} alt="Icon" />
        </div>
        <nav className={styles['nav-links']}>
          <NavLink to="/home" className={styles['nav-link']} activeclassname={styles['active']}>Overview</NavLink>
          <NavLink to="/account" className={styles['nav-link']} activeclassname={styles['active']}>Account</NavLink>
          <NavLink to="/transactions" className={styles['nav-link']} activeclassname={styles['active']}>Transactions</NavLink>
          <NavLink to="/wallet" className={styles['nav-link']} activeclassname={styles['active']}>Wallet</NavLink>
        </nav>
      </div>
      <div className={styles['right-card']}>
        <div className={styles['card-container']}>
        <AppDountChart />
        <Monetary />
        <AddmonetaryActions/>
        </div>
      </div>
    </div>
  );
}

export default Home;
