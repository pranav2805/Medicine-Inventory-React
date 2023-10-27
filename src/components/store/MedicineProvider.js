import { useState } from "react";
import MedicineContext from "./medicine-context";

const MedicineProvider = (props) => {
  const [medicines, setMedicines] = useState([]);
  const addMedicineHandler = (medicine) => {
    // console.log("inside add medicine handler>>", medicine);
    setMedicines((prevMedicines) => {
      const updatedMedicines = [...prevMedicines];
      updatedMedicines.push({ ...medicine, id: Math.random().toString() });
      return updatedMedicines;
    });
  };

  const removeMedicineHandler = (id) => {
    for (let i = 0; i < medicines.length; i++) {
      if (medicines[i].id === id) {
        medicines[i].quantity -= 1;
        break;
      }
    }
    const updatedMedicines = [...medicines];
    setMedicines(updatedMedicines);
    // console.log("after removing med>>", medicines);
  };
  //   console.log("medicines>>", medicines);
  const medicineContext = {
    medicines: medicines,
    addMedicine: addMedicineHandler,
    removeMedicine: removeMedicineHandler,
  };

  return (
    <MedicineContext.Provider value={medicineContext}>
      {props.children}
    </MedicineContext.Provider>
  );
};

export default MedicineProvider;
