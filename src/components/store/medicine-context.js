import React from "react";
const MedicineContext = React.createContext({
  medicines: [],
  addMedicine: (medicine) => {},
});

export default MedicineContext;
