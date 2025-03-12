import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Registrar os módulos necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Dados padrão para evitar erro de 'undefined'
const defaultBarData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Sales",
      data: [30, 20, 40, 50, 60, 80],
      backgroundColor: "rgba(54, 162, 235, 0.6)",
    },
  ],
};

const defaultDoughnutData = {
  labels: ["Desktop", "Tablet", "Phone"],
  datasets: [
    {
      data: [63, 15, 22],
      backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
    },
  ],
};

// Gráfico de Barras
export const BarChart = ({ data = defaultBarData }) => (
  <Bar data={data} options={{ responsive: true, plugins: { legend: { display: true } } }} />
);

// Gráfico Doughnut
export const DoughnutChart = ({ data = defaultDoughnutData }) => (
  <Doughnut data={data} options={{ responsive: true, plugins: { legend: { display: true } } }} />
);
