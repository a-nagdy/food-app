import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import SuccessMessage from "../UI/SuccessMessage";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
const Cart = (props) => {
  const [ordered, setOrdered] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const orderHandler = () => {
    setOrdered(true);
    cartCtx.clearCart();
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {ordered && <SuccessMessage onClose={props.onClose} />}
      {!ordered && hasItems && (
        <>
          {cartItems}
          <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className={styles.actions}>
            <Button className={styles["button--alt"]} onClick={props.onClose}>
              close
            </Button>
            <Button className={styles.button} onClick={orderHandler}>
              Order
            </Button>
          </div>
        </>
      )}
      {!ordered && !hasItems && (
        <>
          <p>Your Cart Is Empty</p>
          <div className={styles.actions}>
            <Button className={styles["button--alt"]} onClick={props.onClose}>
              close
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default Cart;
