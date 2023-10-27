import { useContext } from "react";
import Card from "../../UI/Card";
import MedicineContext from "../../store/medicine-context";
import MedicineItem from "../MedicineItem/MedicineItem";

const MedicineList = (props) => {
  const medicineCtx = useContext(MedicineContext);
  //   console.log("inside medicine list comp>>", medicineCtx.medicines);
  return (
    <Card>
      <ul>
        {medicineCtx.medicines.map((medicine) => (
          <MedicineItem
            key={medicine.id}
            id={medicine.id}
            name={medicine.name}
            desc={medicine.desc}
            price={medicine.price}
            quantity={medicine.quantity}
            item={medicine}
          ></MedicineItem>
        ))}
      </ul>
    </Card>
  );
};

export default MedicineList;
