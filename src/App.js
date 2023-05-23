import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import LoginForm from "./components/UI/LoginForm";
import CartProvider from "./store/CartProvider";
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [loginFormShow, setLoginFormShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    setIsLoggedIn(true);
  };

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showLoginForm = () => {
    setLoginFormShow(true);
  };
  const hideLoginForm = () => {
    setLoginFormShow(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      {loginFormShow && (
        <LoginForm onClose={hideLoginForm} onLogin={handleLogin} />
      )}
      <Header
        onShowCart={showCartHandler}
        onShowLogin={showLoginForm}
        isLoggedIn={isLoggedIn}
      />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
