import React from "react";
import Button from "./Button";
import styles from "./SuccessMessage.module.css";
const SuccessMessage = (props) => {
  return (
    <div className={styles.wrapper}>
      <h3>Thanks for Ordering From Burgers Lovers</h3>
      <div>
        <p>Your Order is being Prepared</p>
        <p>We Will Call You Once Its Ready </p>
      </div>
      <Button className={styles["button--alt"]} onClick={props.onClose}>
        close
      </Button>
    </div>
  );
};

export default SuccessMessage;
