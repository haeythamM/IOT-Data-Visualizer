import labjackImage from "../assets/images/labjack-u3-hv-726670.webp";

function Home() {
  return (
    <div className="flex flex-col flex-grow bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white mt-20">
      <main className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Welcome to the LabJack Sensor Dashboard
        </h2>

        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Monitor real-time environmental data using our smart sensor system
          powered by Flask and LabJack U3-HV.
        </p>

        <div className="flex justify-center mb-6">
          <img
            src={labjackImage}
            alt="LabJack U3-HV Device"
            className="rounded-lg shadow-lg max-w-md w-full h-auto"
          />
        </div>

        <p className="text-md text-gray-300 max-w-xl mx-auto mb-8">
          This project collects sensor data (temperature, light) using LabJack
          U3-HV, streams it live with Socket.IO, and visualizes insights through
          a modern dashboard.
        </p>

        <div className="mt-10 text-center">
          <a
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition"
          >
            Go to Dashboard →
          </a>
        </div>
      </main>
    </div>
  );
}

export default Home;
