import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.main}>
      <div className={styles.desc}>
        <h4>Burgers Lovers</h4>
        <div className={styles.address}>
          <p>16 lorem . lorem . Lorem ipsum dolor sit amet</p>
          <form>
            <input type="email" placeholder="Enter Your Email." />
            <button>Subscribe</button>
          </form>
        </div>
      </div>
      <div>Hyper Links</div>
      <div>Social Media</div>
    </div>
  );
};

export default Footer;
