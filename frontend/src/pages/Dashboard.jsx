import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    RadialLinearScale,
    Title,
    Tooltip
} from "chart.js";

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useState } from "react";
import { Bar, Line, Pie, Radar } from "react-chartjs-2";
import LiveChart from "../components/LiveChart";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const baseColors = {
  min: "#facc15",
  max: "#3b82f6",
  range: "#ef4444"
};

function Dashboard() {
  const [tab, setTab] = useState("dashboard");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/analyze")
      .then((res) => res.json())
      .then((json) => {
        setData({
          labels: ["Device Temp", "Air Temp", "Light"],
          datasets: [
            {
              label: "Min",
              data: json.device && json.air && json.light ? [json.device[0], json.air[0], json.light[0]] : [],
              backgroundColor: baseColors.min,
              borderColor: baseColors.min,
              borderWidth: 2,
            },
            {
              label: "Max",
              data: json.device && json.air && json.light ? [json.device[1], json.air[1], json.light[1]] : [],
              backgroundColor: baseColors.max,
              borderColor: baseColors.max,
              borderWidth: 2,
            },
            {
              label: "Range",
              data: json.device && json.air && json.light ? [json.device[2], json.air[2], json.light[2]] : [],
              backgroundColor: baseColors.range,
              borderColor: baseColors.range,
              borderWidth: 2,
            }
          ]
        });
      })
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#cbd5e1"
        }
      },
      tooltip: {
        enabled: true
      },
      datalabels: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#cbd5e1"
        },
        grid: {
          color: "#475569"
        }
      },
      y: {
        ticks: {
          color: "#cbd5e1"
        },
        grid: {
          color: "#475569"
        }
      },
      r: {
        angleLines: {
          color: "#475569"
        },
        grid: {
          color: "#475569"
        },
        pointLabels: {
          color: "#cbd5e1"
        },
        ticks: {
          color: "#cbd5e1",
          backdropColor: "transparent",
          z: 1
        }
      }
    }
  };

  const renderNumericSummary = data && (
    <div className="text-sm text-slate-300 mt-8 mb-4 text-center ">
      <p>Device: Min {data.datasets[0].data[0].toFixed(1)}, Max {data.datasets[1].data[0].toFixed(1)}, Range {data.datasets[2].data[0].toFixed(1)}</p>
      <p>Air: Min {data.datasets[0].data[1].toFixed(1)}, Max {data.datasets[1].data[1].toFixed(1)}, Range {data.datasets[2].data[1].toFixed(1)}</p>
      <p>Light: Min {data.datasets[0].data[2].toFixed(1)}, Max {data.datasets[1].data[2].toFixed(1)}, Range {data.datasets[2].data[2].toFixed(1)}</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 text-white mt-16">
      <h1 className="text-3xl font-bold text-center text-white mb-10">
        LabJack Sensors Dashboard
      </h1>

      <div className="flex justify-center mb-6 space-x-4">
        <button
          className={`px-4 py-2 rounded ${
            tab === "dashboard" ? "bg-blue-600" : "bg-gray-700"
          }`}
          onClick={() => setTab("dashboard")}
        >
          Collected Data
        </button>
        <button
          className={`px-4 py-2 rounded ${
            tab === "live" ? "bg-blue-600" : "bg-gray-700"
          }`}
          onClick={() => setTab("live")}
        >
          Live
        </button>
      </div>

      {tab === "dashboard" && (!data ? (
        <p className="text-center">Loading sensor analysis...</p>
      ) : (
        <>
          {renderNumericSummary}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div className="bg-gray-800 p-4 rounded shadow">
              <h2 className="text-xl mb-2">Bar Chart</h2>
              <Bar data={data} options={chartOptions} />
            </div>

            <div className="bg-gray-800 p-4 rounded shadow">
              <h2 className="text-xl mb-2">Line Chart</h2>
              <Line data={data} options={chartOptions} />
            </div>

            <div className="bg-gray-800 p-4 rounded shadow">
              <h2 className="text-xl mb-2">Pie Chart</h2>
              <Pie
                data={{
                  labels: data.labels,
                  datasets: [
                    {
                      label: "Max",
                      data: data.datasets[1].data,
                      backgroundColor: ["#facc15", "#3b82f6", "#ef4444"]
                    }
                  ]
                }}
                options={{
                  plugins: {
                    legend: {
                      labels: {
                        color: "#cbd5e1"
                      }
                    }
                  }
                }}
              />
            </div>

            <div className="bg-gray-800 p-4 rounded shadow">
              <h2 className="text-xl mb-2">Radar Chart</h2>
              <Radar data={data} options={chartOptions} />
            </div>
          </div>
        </>
      ))}

      {tab === "live" && <LiveChart />}
    </div>
  );
}

export default Dashboard;
