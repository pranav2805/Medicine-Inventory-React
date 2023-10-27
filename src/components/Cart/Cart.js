import { useContext } from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../store/cart-context";
import MedicineContext from "../store/medicine-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const cartItems = cartCtx.items;
  const medicineCtx = useContext(MedicineContext);
  // console.log("cartItems inside cart component", cartItems);
  const mergedResult = {};
  cartItems.forEach((item) => {
    if (!mergedResult[item.id]) {
      mergedResult[item.id] = { ...item };
    } else {
      mergedResult[item.id].quantity =
        Number(mergedResult[item.id].quantity) + Number(item.quantity);
    }
  });

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
    const medicines = medicineCtx.medicines;
    for (let i = 0; i < medicines.length; i++) {
      if (medicines[i].id === id) {
        medicines[i].quantity += 1;
        break;
      }
    }
    // console.log("after removing>>", cartCtx.items);
  };

  // let flag = false;
  const cartItemAddHandler = (item) => {
    const medicines = medicineCtx.medicines;
    for (let i = 0; i < medicines.length; i++) {
      if (medicines[i].id === item.id) {
        // console.log("inside cart item habdler");
        if (medicines[i].quantity === 0) {
          // flag = true;
          return;
        } else break;
      }
    }
    cartCtx.addItem({ ...item, quantity: 1 });
    // console.log("after adding>>", cartCtx.items);
  };

  const mergedArray = Object.values(mergedResult);
  // console.log("mergedArray inside Cart>>>", mergedArray);
  const cartItemsUL = (
    <ul className={classes["cart-items"]}>
      {mergedArray.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
          // flag={flag}
        />
      ))}
    </ul>
  );

  let totalPrice = 0;
  cartItems.forEach(
    (item) => (totalPrice += Number(item.price) * Number(item.quantity))
  );
  totalPrice = totalPrice.toFixed(2);
  return (
    <Modal onClose={props.onHideCart}>
      {cartItemsUL}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalPrice}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
