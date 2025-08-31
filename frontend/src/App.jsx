import { Route, Routes } from 'react-router-dom';
import Footer from '../src/components/Footer';
import Header from '../src/components/Header';
import Dashboard from './pages/Dashboard';
import Documentation from './pages/Documentation';
import Home from './pages/Home';
import Live from './pages/Live';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/live" element={<Live />} />
          <Route path="/Documentation" element={<Documentation />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
