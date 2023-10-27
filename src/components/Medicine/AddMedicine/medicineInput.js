import classes from "./medicineInput.module.css";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import MedicineContext from "../../store/medicine-context";
import { useRef, useContext } from "react";

const MedicineInput = (props) => {
  const nameInputRef = useRef();
  const descInputRef = useRef();
  const priceInputRef = useRef();
  const quantityInputRef = useRef();

  const medicineCtx = useContext(MedicineContext);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    let enteredName = nameInputRef.current.value;
    let enteredDesc = descInputRef.current.value;
    let enteredPrice = priceInputRef.current.value;
    let enteredQty = quantityInputRef.current.value;

    if (
      enteredName.trim().length === 0 ||
      enteredDesc.trim().length === 0 ||
      enteredPrice.trim().length === 0 ||
      enteredQty.trim().length === 0
    ) {
      return;
    }

    if (+enteredPrice < 0 || +enteredQty < 0) return;

    const medicineObj = {
      name: enteredName,
      desc: enteredDesc,
      price: +enteredPrice,
      quantity: +enteredQty,
    };
    medicineCtx.addMedicine(medicineObj);

    nameInputRef.current.value = "";
    descInputRef.current.value = "";
    priceInputRef.current.value = "";
    quantityInputRef.current.value = "";

    console.log(medicineCtx.medicines);
  };
  return (
    <Card>
      <form onSubmit={formSubmitHandler} className={classes.form}>
        <label htmlFor="name">Medicine</label>
        <input type="text" id="name" ref={nameInputRef}></input>
        <label htmlFor="description">Description</label>
        <input type="text" id="description" ref={descInputRef}></input>
        <label htmlFor="price">Price</label>
        <input type="number" id="price" ref={priceInputRef}></input>
        <label htmlFor="quantity">Quantity</label>
        <input type="number" id="quantity" ref={quantityInputRef}></input>
        <Button type="submit">Add</Button>
      </form>
    </Card>
  );
};

export default MedicineInput;
