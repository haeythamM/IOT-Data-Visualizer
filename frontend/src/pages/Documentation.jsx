import { Link } from 'react-router-dom';

function Documentation() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-100 bg-gray-900 min-h-screen flex flex-col justify-between mt-16">
      <div>
        <h1 className="text-3xl font-bold mb-4">Documentation</h1>
        <p className="mb-4 text-gray-300">Last updated: May 21, 2025</p>

        <h2 className="text-xl font-semibold mb-2 mt-6">1. Security Best Practices</h2>
        <p className="text-gray-300 mb-4">
          To enhance the security of this project, consider the following:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4">
          <li>Use HTTPS in production to encrypt communication between the client and server.</li>
          <li>Sanitize and validate all user inputs to prevent injection attacks.</li>
          <li>Implement proper CORS policies and secure API endpoints with authentication if required.</li>
          <li>Update dependencies regularly and avoid exposing sensitive data in public repositories.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2 mt-6">2. Hardware & Circuit Documentation</h2>
        <p className="text-gray-300 mb-4">
          The project uses LabJack U3-HV as the main data acquisition device. Three sensors are connected:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4">
          <li><strong>Air Temperature Sensor:</strong> connected to AIN0. Voltage is converted to °C using the formula: <code>(Voltage * 100) / 10</code>.</li>
          <li><strong>Light Sensor:</strong> connected to AIN1. Converted to percentage with: <code>(Voltage / 5.0) * 100</code>.</li>
          <li><strong>Internal Temperature:</strong> read directly from LabJack’s internal sensor and converted from Kelvin to Celsius.</li>
        </ul>
        <p className="text-gray-300 mb-4">
          If using resistive sensors (e.g., thermistors or photoresistors), consider placing a fixed resistor in a voltage divider configuration and apply Ohm’s law to calculate resistance.
        </p>

        <h2 className="text-xl font-semibold mb-2 mt-6">3. About LabJack U3-HV</h2>
        <p className="text-gray-300 mb-4">
          The LabJack U3-HV is a USB-based data acquisition device with analog and digital I/O. It supports high-voltage (HV) analog inputs for direct sensor interfacing. Ideal for learning and small automation projects.
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

export default Documentation;
