import React, { useEffect, useState } from "react";
import useHttp from "../../Hooks/use-http";
import Button from "./Button";
import styles from "./LoginForm.module.css";
import Modal from "./Modal";
const LoginForm = (props) => {
  const [signUpClicked, setSignUpClicked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [tasks, setTasks] = useState([]);

  const transformTasks = (tasks) => {
    const loadedTasks = [];
    for (const taskKey in tasks) {
      loadedTasks.push({ id: taskKey, task: tasks[taskKey].text });
    }
    setTasks(loadedTasks);
  };

  const {
    isLoading,
    error,
    sendRequest: fetchTasks,
  } = useHttp({
    url: "https://react-http-movie-f8b5a-default-rtdb.firebaseio.com/users.json",
    transformTasks,
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const changeToSignUp = (e) => {
    e.preventDefault();
    setSignUpClicked((signUpClicked) => !signUpClicked);
  };

  const changeToSignIn = (e) => {
    e.preventDefault();
    setSignUpClicked((signUpClicked) => !signUpClicked);
  };

  const signInHandler = (e) => {
    e.preventDefault();
    props.onClose();
    props.onLogin();
  };
  const signUpHandler = () => {};

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    if (e.target.value.includes("@")) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length >= 8) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  };

  const isDisabled = !validEmail || !validPassword;

  return (
    <Modal onClose={props.onClose} className={styles.wrapper}>
      {!signUpClicked && (
        <div className={styles.container}>
          <span onClick={props.onClose}>X</span>
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
          <span onClick={props.onClose}>X</span>
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
