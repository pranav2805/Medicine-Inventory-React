import { useState } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [items, setItems] = useState([]);

  const addItemToCartHandler = (item) => {
    const updatedItems = [...items];
    updatedItems.push(item);
    const mergedItems = {};
    updatedItems.forEach((item) => {
      if (!mergedItems[item.id]) {
        mergedItems[item.id] = { ...item };
      } else {
        mergedItems[item.id].quantity += item.quantity;
      }
    });
    const mergedArray = Object.values(mergedItems);
    // console.log("mergedArray>>", mergedArray);
    setItems(mergedArray);
  };

  const removeItemFromCartHandler = (id) => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        if (Number(items[i].quantity) === 1) {
          const updatedItems = items.filter((item) => item.id !== id);
          setItems(updatedItems);
        } else {
          items[i].quantity -= 1;
          //   console.log(items);
          const updatedItems = [...items];
          setItems(updatedItems);
          break;
        }
      }
    }
  };
  const cartContext = {
    items: items,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
