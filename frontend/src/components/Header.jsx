import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-900 text-white py-6 shadow">
<div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 space-y-4 sm:space-y-0 sm:space-x-4">

        {/* Make title a link to home */}
        <Link to="/" className="text-lg sm:text-xl font-bold truncate hover:text-blue-400 transition">
          LabJack Dashboard
        </Link>

        <nav className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-blue-400 font-semibold' : 'hover:text-blue-400'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? 'text-blue-400 font-semibold' : 'hover:text-blue-400'
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/Documentation"
            className={({ isActive }) =>
              isActive ? 'text-blue-400 font-semibold' : 'hover:text-blue-400'
            }
          >
            Documentation
          </NavLink>
          <NavLink
            to="/terms"
            className={({ isActive }) =>
              isActive ? 'text-blue-400 font-semibold' : 'hover:text-blue-400'
            }
          >
            Terms
          </NavLink>
          <NavLink
            to="/privacy"
            className={({ isActive }) =>
              isActive ? 'text-blue-400 font-semibold' : 'hover:text-blue-400'
            }
          >
            Privacy
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
