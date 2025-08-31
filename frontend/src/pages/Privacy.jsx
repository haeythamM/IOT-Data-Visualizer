import { Link } from "react-router-dom";

function Privacy() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-100 bg-gray-900 min-h-screen flex flex-col justify-between mt-16">
      <div>
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4 text-gray-300">Last updated: May 21, 2025</p>

        <h2 className="text-xl font-semibold mb-2 mt-6">1. Data Collection</h2>
        <p className="text-gray-300 mb-4">
          This project does not collect or store any personal data. All data
          processed and displayed is sensor-related and used solely for
          demonstration and educational purposes.
        </p>

        <h2 className="text-xl font-semibold mb-2 mt-6">
          2. Use of Sensor Data
        </h2>
        <p className="text-gray-300 mb-4">
          Sensor readings are shown in real time and may be stored temporarily
          for analysis. This data includes device temperature, air temperature,
          and light levels.
        </p>

        <h2 className="text-xl font-semibold mb-2 mt-6">
          3. Third-Party Services
        </h2>
        <p className="text-gray-300 mb-4">
          This project does not share data with third-party services. All
          processing happens locally or on a self-hosted server.
        </p>

        <h2 className="text-xl font-semibold mb-2 mt-6">4. Security</h2>
        <p className="text-gray-300 mb-4">
          While this project takes basic precautions, it is not intended for use
          in production environments and should not be relied upon for secure or
          critical applications.
        </p>

        <h2 className="text-xl font-semibold mb-2 mt-6">
          5. Updates to Policy
        </h2>
        <p className="text-gray-300 mb-4">
          We may revise this privacy policy occasionally. Changes will be
          reflected on this page with an updated revision date.
        </p>

        <p className="mt-8 text-sm text-gray-400">
          © {new Date().getFullYear()} Haeytham Almalak - All rights reserved.
        </p>

        <div className="mt-20 text-center">
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
