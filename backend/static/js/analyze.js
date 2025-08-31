let chart;

function updateChart(stats) {
  if (chart) chart.destroy();

  const ctx = document.getElementById("summaryBarChart").getContext("2d");

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Device Temp", "Air Temp", "Light"],
      datasets: [
        {
          label: "Min",
          data: [stats.device[0], stats.air[0], stats.light[0]],
          backgroundColor: "rgba(75, 192, 192, 0.6)"
        },
        {
          label: "Max",
          data: [stats.device[1], stats.air[1], stats.light[1]],
          backgroundColor: "rgba(153, 102, 255, 0.6)"
        },
        {
          label: "Range",
          data: [stats.device[2], stats.air[2], stats.light[2]],
          backgroundColor: "rgba(255, 159, 64, 0.6)"
        }
      ]
    }
  });

  // Update values using IDs instead of selectors
  document.getElementById("device-min").textContent = stats.device[0];
  document.getElementById("device-max").textContent = stats.device[1];
  document.getElementById("device-range").textContent = stats.device[2];

  document.getElementById("air-min").textContent = stats.air[0];
  document.getElementById("air-max").textContent = stats.air[1];
  document.getElementById("air-range").textContent = stats.air[2];

  document.getElementById("light-min").textContent = stats.light[0];
  document.getElementById("light-max").textContent = stats.light[1];
  document.getElementById("light-range").textContent = stats.light[2];
}

async function fetchAndUpdate() {
  try {
    const res = await fetch("/api/analyze");
    const data = await res.json();
    updateChart(data);
  } catch (error) {
    console.error("Failed to fetch analysis data:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAndUpdate();
  setInterval(fetchAndUpdate, 5000);
});
