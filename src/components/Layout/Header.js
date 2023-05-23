import React, { Fragment } from "react";
import mainImage from "../../assets/main-slider.jpg";
import Button from "../UI/Button";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  // const [userIsLogged, setUserIsLogged] = useState(false);

  // const logged = () => {
  //   props.isLoggedIn();
  // };

  return (
    <Fragment>
      <header className={styles.header}>
        <div className={styles.logo}>
          <h1>Burgers Lovers</h1>
        </div>
        <div className={styles["links-container"]}>
          <a href="/">Home</a>
          <a href="/">About Us</a>
          <a href="/">Products</a>
          <a href="/">Contact Us</a>
        </div>
        <div className={styles.action}>
          {!props.isLoggedIn ? (
            <Button className={styles.button} onClick={props.onShowLogin}>
              Login
            </Button>
          ) : (
            <HeaderCartButton onClick={props.onShowCart} />
          )}
        </div>
      </header>
      <div className={styles["main-image"]}>
        <img src={mainImage} alt="A Burger" />
      </div>
    </Fragment>
  );
};

export default Header;
