import Link from "next/link";
import React from "react";
import { GrTechnology } from "react-icons/gr";
import styles from "./headers.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div>
        <Link href="/" className={styles.logo}>
          CLOUD
          <GrTechnology />
          HOISTING
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <Link className={styles.navLink} href="/">
          Home
        </Link>
        <Link className={styles.navLink} href="articles">
          articles
        </Link>
        <Link className={styles.navLink} href="about">
          about
        </Link>
        <Link className={styles.navLink} href="/admin">
          admin
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
