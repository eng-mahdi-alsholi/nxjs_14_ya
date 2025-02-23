import Image from "next/image";
import React from "react";
import { TiTick } from "react-icons/ti";
import CloudImage from "../../../public/cloud-hosting.png";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroLeft}>
        <h1 className={styles.title}>Cloud Hoisting</h1>
        <p className={styles.desc}>
          The best web hoisting solution for your online success
        </p>
        <div className={styles.services}>
          <div className={styles.servicesItem}>
            <TiTick />
            Easy To Use Control Panel
          </div>
          <div className={styles.servicesItem}>
            <TiTick />
            Secure Hoisting
          </div>
          <div className={styles.servicesItem}>
            <TiTick />
            Website Maintenance
          </div>
        </div>
      </div>
      <div className="">
        <Image src={CloudImage} alt="cloud image" width={500} height={500} />
      </div>
    </div>
  );
};

export default Hero;
