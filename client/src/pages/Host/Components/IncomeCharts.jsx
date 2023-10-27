import { Chart as ChartJS } from "chart.js";
import {
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../../features/userSlice";
import { getCarNameListByOwnerId } from "../../../features/carSlice";
import { getMonthlIncome } from "../../../utils/functions/incomeChart";
import { getIncomeByCar } from "../../../utils/functions/incomeChart";

export const MonthlyIncome = () => {
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  const months = [...Array(12).keys()].map((monthIndex) =>
    new Date(0, monthIndex).toLocaleString("en-US", { month: "short" })
  );
  const chartDataByMonth = {
    labels: months,
    datasets: [
      {
        label: "Total Rent Amount",
        data: getMonthlIncome(),
        backgroundColor: "rgb(40, 167, 69,0.7)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
  };
  return <Bar data={chartDataByMonth} options={options} />;
};

export const IncomeByCar = () => {
  ChartJS.register(ArcElement, CategoryScale, LinearScale, Tooltip, Legend);
  const currentUserId = useSelector(getCurrentUser)?.userId;
  const carList = useSelector((state) =>
    getCarNameListByOwnerId(state, currentUserId)
  );
  const chartDataByCar = {
    labels: carList,
    datasets: [
      {
        label: "Total Rent Amount",
        data: getIncomeByCar(),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgba(40, 167, 69,0.7)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
      },
    ],
  };
  return <Doughnut data={chartDataByCar}></Doughnut>;
};
