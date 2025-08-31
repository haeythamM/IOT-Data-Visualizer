import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { io } from 'socket.io-client';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const socket = io('http://localhost:5000');

function LiveChart() {
  const [labels, setLabels] = useState([]);
  const [deviceTemp, setDeviceTemp] = useState([]);
  const [airTemp, setAirTemp] = useState([]);
  const [light, setLight] = useState([]);
  const [latest, setLatest] = useState({
    device_temperature: '--',
    air_temperature: '--',
    light: '--',
  });

  useEffect(() => {
    socket.on('sensor_update', (data) => {
      const timestamp = new Date().toLocaleTimeString();
      setLabels((prev) => [...prev.slice(-29), timestamp]);
      setDeviceTemp((prev) => [...prev.slice(-29), data.device_temperature]);
      setAirTemp((prev) => [...prev.slice(-29), data.air_temperature]);
      setLight((prev) => [...prev.slice(-29), data.light]);
      setLatest(data);
    });
    return () => socket.off('sensor_update');
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#cbd5e1',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#cbd5e1' },
        grid: { color: '#334155' },
      },
      y: {
        ticks: { color: '#cbd5e1' },
        grid: { color: '#334155' },
      },
    },
  };

  const lineData = {
    labels,
    datasets: [
      {
        label: 'Device Temp (°C)',
        data: deviceTemp,
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14,165,233,0.3)',
        tension: 0.4,
      },
      {
        label: 'Air Temp (°C)',
        data: airTemp,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16,185,129,0.3)',
        tension: 0.4,
      },
      {
        label: 'Light (%)',
        data: light,
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245,158,11,0.3)',
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: 'Device Temp (°C)',
        data: deviceTemp,
        backgroundColor: '#0ea5e9',
      },
      {
        label: 'Air Temp (°C)',
        data: airTemp,
        backgroundColor: '#10b981',
      },
      {
        label: 'Light (%)',
        data: light,
        backgroundColor: '#facc15',
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-4 text-white space-y-10">
      <h1 className="text-3xl font-bold text-center mb-6">Live Sensor Data</h1>

      {/* Current values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-gray-800 rounded-lg p-4 shadow-md">
          <h2 className="text-xl mb-2">Device Temp</h2>
          <p className="text-3xl text-cyan-400">{latest.device_temperature} °C</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 shadow-md">
          <h2 className="text-xl mb-2">Air Temp</h2>
          <p className="text-3xl text-emerald-400">{latest.air_temperature} °C</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 shadow-md">
          <h2 className="text-xl mb-2">Light</h2>
          <p className="text-3xl text-yellow-400">{latest.light} %</p>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-gray-800 p-6 rounded shadow" style={{ height: '400px' }}>
        <h2 className="text-xl mb-2">Line Chart (All Sensors)</h2>
        <Line data={lineData} options={chartOptions} />
      </div>

      {/* Bar Chart */}
      <div className="bg-gray-800 p-6 rounded shadow" style={{ height: '400px' }}>
        <h2 className="text-xl mb-2">Bar Chart (All Sensors)</h2>
        <Bar data={barData} options={chartOptions} />
      </div>
    </div>
  );
}

export default LiveChart;
