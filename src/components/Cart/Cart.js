import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [ordered, setOrdered] = useState(false);
  const [submitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const orderHandler = () => {
    setOrdered(true);
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://my-first-project-a7aca-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
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
  const modalActions = (
    <div className={styles.actions}>
      <Button className={styles["button--alt"]} onClick={props.onClose}>
        close
      </Button>
      {hasItems && (
        <Button className={styles.button} onClick={orderHandler}>
          Order
        </Button>
      )}
    </div>
  );
  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {ordered && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!ordered && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending Order Data..</p>;

  const didSubmitModalContent = (
    <div className={styles.success}>
      <div className={styles.check}>
        <div className={styles.checkmark}></div>
      </div>
      <p>Successfully sent The Order!</p>
      <Button className={styles.button} onClick={props.onClose}>
        close
      </Button>
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {!submitting && !didSubmit && cartModalContent}
      {submitting && isSubmittingModalContent}
      {!submitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
