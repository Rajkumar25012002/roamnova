import { useSelector } from "react-redux";
import { getCurrentUser } from "../../features/userSlice";
import { getCarIdListByOwnerId } from "../../features/carSlice";
import { getRentCarsByCarId } from "../../features/rentalCarSlice";
export function getMonthlIncome() {
  const currentUserId = useSelector(getCurrentUser)?.userId;
  const carIdList = useSelector((state) =>
    getCarIdListByOwnerId(state, currentUserId)
  );
  const ownerCarInRentList = useSelector((state) =>
    getRentCarsByCarId(state, carIdList)
  );

  const extractedData = ownerCarInRentList.filter((car)=> new Date(car.dropDate)<new Date()).map((car) => ({
    rentedAmount: car.rentalAmount,
    rentedOn: new Date(car.rentedOn),
  }));
  const rentDataByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  extractedData.forEach((rental) => {
    const { rentedAmount, rentedOn } = rental;
    const month = new Date(rentedOn).getMonth();

    if (!rentDataByMonth[month]) {
      rentDataByMonth[month] = 0;
    }
    rentDataByMonth[month] += Number(rentedAmount);
  });
  return rentDataByMonth;
}
export function getIncomeByCar() {
  const currentUserId = useSelector(getCurrentUser)?.userId;
  let carIdList = useSelector((state) =>
    getCarIdListByOwnerId(state, currentUserId)
  );
  const ownerCarInRentList = useSelector((state) =>
    getRentCarsByCarId(state, carIdList)
  );
  const totalExpensesByCar = new Array(carIdList.length).fill(0);
  ownerCarInRentList.filter((car)=> new Date(car.dropDate)<new Date()).forEach((value) => {
    const { rentedCarId, rentalAmount } = value;
    let index = carIdList.findIndex((carId) => carId === rentedCarId);
    if (index > -1) {
      totalExpensesByCar[index] += Number(rentalAmount);
    }
  });
  return totalExpensesByCar;
}
