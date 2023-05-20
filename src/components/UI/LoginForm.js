import React, { useState } from "react";
import Button from "./Button";
import styles from "./LoginForm.module.css";
import Modal from "./Modal";
const LoginForm = (props) => {
  const [signUpClicked, setSignUpClicked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const changeToSignUp = (e) => {
    e.preventDefault();
    setSignUpClicked(true);
  };

  const changeToSignIn = (e) => {
    e.preventDefault();

    console.log("Logged");
  };

  const signInHandler = (e) => {
    e.preventDefault();
    console.log("logged");
  };
  const signUpHandler = () => {};

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    if (e.target.value.includes("@")) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
      console.log("Email required");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length >= 8) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
      console.log("Passsword required");
    }
  };

  const isDisabled = !validEmail || !validPassword;

  return (
    <Modal onClose={props.onClose} className={styles.wrapper}>
      {!signUpClicked && (
        <div className={styles.container}>
          <h3>Sign In</h3>
          <form className={styles.form}>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleEmailChange}
                className={!validEmail ? styles.error : ""}
              />

              <input
                type="Password"
                name="Password"
                placeholder="Passowrd"
                onChange={handlePasswordChange}
              />
            </div>
            <Button
              className={styles.btn}
              onClick={signInHandler}
              disabled={isDisabled}
            >
              Login
            </Button>
          </form>
        </div>
      )}
      {signUpClicked && (
        <div className={styles.container}>
          <h3>Sign Up</h3>
          <form className={styles.form}>
            <div>
              <input type="text" name="username" placeholder="Email" required />

              <input
                type="Password"
                name="Password"
                placeholder="Password"
                required
              />
              <input
                type="Password"
                name="Password"
                placeholder="Repeat Password"
              />
            </div>
            <Button className={styles.btn} onClick={signUpHandler}>
              Sign Up
            </Button>
          </form>
        </div>
      )}
      <button
        className={signUpClicked ? styles.signinBtn : styles.signupBtn}
        onClick={signUpClicked ? changeToSignIn : changeToSignUp}
      >
        {!signUpClicked ? "Sign Up" : "Sign In"}
      </button>
    </Modal>
  );
};

export default LoginForm;
