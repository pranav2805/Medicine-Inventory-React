import { useContext } from "react";
import CartContext from "../../store/cart-context";
import MedicineContext from "../../store/medicine-context";
// import { useState } from "react";

const MedicineItem = (props) => {
  const cartCtx = useContext(CartContext);
  const medicineCtx = useContext(MedicineContext);
  //   const [quantity, setQuantity] = useState(props.item.quantity);
  const addItemToCart = (event) => {
    event.preventDefault();
    cartCtx.addItem({ ...props.item, quantity: 1 });
    medicineCtx.removeMedicine(props.item.id);
  };

  return (
    <li key={props.id}>
      Name:{props.name} Desc:{props.desc} Price:{props.price} Qty:
      {props.quantity}
      {props.quantity > 0 && (
        <button onClick={addItemToCart}>Add to Cart</button>
      )}
      {props.quantity === 0 && (
        <span>
          {" "}
          <b>Out of Stock</b>
        </span>
      )}
    </li>
  );
};

export default MedicineItem;
