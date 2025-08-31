import { Link } from 'react-router-dom';

function Terms() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-100 bg-gray-900 min-h-screen flex flex-col justify-between mt-16">
      <div>
        <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
        <p className="mb-4 text-gray-300">Last updated: May 21, 2025</p>

        <h2 className="text-xl font-semibold mb-2 mt-6">1. Educational Purpose Only</h2>
        <p className="text-gray-300 mb-4">
          This project is developed strictly for educational and personal learning purposes. It is intended to demonstrate real-time sensor data handling using LabJack hardware and a Flask-based backend.
        </p>

        <h2 className="text-xl font-semibold mb-2 mt-6">2. No Commercial Use</h2>
        <p className="text-gray-300 mb-4">
          Commercial use, redistribution, or deployment of this project in any form for business, profit, or resale is strictly prohibited.
        </p>

        <h2 className="text-xl font-semibold mb-2 mt-6">3. No Warranties</h2>
        <p className="text-gray-300 mb-4">
          This project is provided “as is” without warranty of any kind, either expressed or implied.
        </p>

        <h2 className="text-xl font-semibold mb-2 mt-6">4. Sensor Data Disclaimer</h2>
        <p className="text-gray-300 mb-4">
          The live sensor data is for demonstration purposes only and should not be used for safety-critical applications.
        </p>

        <h2 className="text-xl font-semibold mb-2 mt-6">5. Changes to These Terms</h2>
        <p className="text-gray-300 mb-4">
          We reserve the right to update or modify these terms at any time without prior notice.
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

export default Terms;
