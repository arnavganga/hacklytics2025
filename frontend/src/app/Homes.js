import React from "react";
import Head from "next/head";
import styles from "./components/Home.module.css";

export default function Home() {

 

  return (
    <div className={styles.container}>

      <div className={styles.navbar}>
        <div className={styles.logo}>Project Name</div>
        <div className={styles.left}>
        <button className={styles.button}>Log In</button>
        <button className={styles.button}>Sign Up</button>
      </div>
      </div>
      <div className={styles.main}>
        <h1 className={styles.title}>Empowering Health, Anytime, Anywhere</h1>
        <p className={styles.subtitle}>
        Welcome to our telemedicine platform! Connect with doctors, manage your health, and save time with virtual consultations. It's healthcare at your fingertips.
        </p>
        <div className={styles.center}>
        <button className={styles.button2}>Log In</button>
        <button className={styles.button2}>Sign Up</button>
      </div>
        <p className={styles.members}>Join the <span className={styles.bold}>future</span> of healthcare!</p>
      </div>
    </div>
  );
}

