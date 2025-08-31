const chartCommonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { position: 'bottom' },
        tooltip: { mode: 'index', intersect: false }
    },
    hover: {
        mode: 'nearest',
        intersect: false
    },
    active: {
        mode: 'nearest',
        intersect: false
    }
};

// Line Chart
const lineChart = new Chart(
    document.getElementById('sensorLineChart').getContext('2d'),
    {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Device Temperature (°C)',
                    borderColor: '#e74c3c',
                    tension: 0.3,
                    data: [],
                    fill: false
                },
                {
                    label: 'Air Temperature (°C)',
                    borderColor: '#3498db',
                    tension: 0.3,
                    data: [],
                    fill: false
                },
                {
                    label: 'Light (%)',
                    borderColor: '#f1c40f',
                    tension: 0.3,
                    data: [],
                    fill: false
                }
            ]
        },
        options: {
            ...chartCommonOptions,
            scales: {
                x: { title: { display: true, text: 'Time' } },
                y: { beginAtZero: true, title: { display: true, text: 'Values' } }
            }
        }
    }
);

// Pie Chart
const pieChart = new Chart(
    document.getElementById('sensorPieChart').getContext('2d'),
    {
        type: 'pie',
        data: {
            labels: ['Device Temp', 'Air Temp', 'Light'],
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: ['#e74c3c', '#3498db', '#f1c40f'],
                borderColor: ['#c0392b', '#2980b9', '#f39c12'],
                borderWidth: 1
            }]
        },
        options: chartCommonOptions
    }
);

// Bar Chart
const barChart = new Chart(
    document.getElementById('sensorBarChart').getContext('2d'),
    {
        type: 'bar',
        data: {
            labels: ['Device Temp', 'Air Temp', 'Light'],
            datasets: [{
                label: 'Current Values',
                data: [0, 0, 0],
                backgroundColor: ['#e74c3c', '#3498db', '#f1c40f' ], // Red, Yellow, Blue
                borderColor: ['#c0392b',  '#2980b9', '#f39c12'],
                borderWidth: 1
            }]
        },
        options: {
            ...chartCommonOptions,
            scales: {
                y: { beginAtZero: true }
            }
        }
    }
);

// Radar Chart
const radarChart = new Chart(
    document.getElementById('sensorRadarChart').getContext('2d'),
    {
        type: 'radar',
        data: {
            labels: ['Device Temp', 'Air Temp', 'Light'],
            datasets: [{
                label: 'Sensor Data',
                data: [0, 0, 0],
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: '#3498db',
                borderWidth: 1
            }]
        },
        options: {
            ...chartCommonOptions,
            scales: { r: { beginAtZero: true } }
        }
    }
);

// Unified Update Function
function updateDashboard() {
    fetch('/api/sensors')
        .then(res => res.json())
        .then(data => {
            const now = new Date().toLocaleTimeString();

            // Update Line Chart
            lineChart.data.labels.push(now);
            lineChart.data.datasets[0].data.push(data.device_temperature);
            lineChart.data.datasets[1].data.push(data.air_temperature);
            lineChart.data.datasets[2].data.push(data.light);

            // Update other charts
            pieChart.data.datasets[0].data = [data.device_temperature, data.air_temperature, data.light];
            barChart.data.datasets[0].data = [data.device_temperature, data.air_temperature, data.light];
            radarChart.data.datasets[0].data = [data.device_temperature, data.air_temperature, data.light];

            // Trim old data
            if (lineChart.data.labels.length > 30) {
                lineChart.data.labels.shift();
                lineChart.data.datasets.forEach(ds => ds.data.shift());
            }

            // Update display values
            document.getElementById('device-temp-value').textContent = data.device_temperature.toFixed(1);
            document.getElementById('air-temp-value').textContent = data.air_temperature.toFixed(1);
            document.getElementById('light-value').textContent = data.light.toFixed(1);

            // Update all charts
            lineChart.update();
            pieChart.update();
            barChart.update();
            radarChart.update();
        })
        .catch(console.error);
}

setInterval(updateDashboard, 2000);
updateDashboard();
