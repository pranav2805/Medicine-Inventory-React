import { useState } from "react";

import MedicineInput from "./components/Medicine/AddMedicine/medicineInput";
import MedicineProvider from "./components/store/MedicineProvider";
import MedicineList from "./components/Medicine/MedicineList/MedicineList";
import Header from "./components/Layout/Header";
import CartProvider from "./components/store/CartProvider";
import Cart from "./components/Cart/Cart";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <CartProvider>
      <MedicineProvider>
        {cartIsShown && <Cart onHideCart={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <MedicineInput />
        <MedicineList />
      </MedicineProvider>
    </CartProvider>
  );
}

export default App;
