import Link from "next/link";
import React from "react"; 
import styles from "./headers.module.css";
import Navbar from "./Navbar";

const Headers = () => {
  return (
    <header className={styles.header}>
      <Navbar />
      <div className={styles.right}>
        <Link className={styles.btn} href="/login">
          login
        </Link>
        <Link className={styles.btn} href="/register ">
          register
        </Link>
      </div>
    </header>
  );
};

export default Headers;
