// frontend/src/components/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center text-xl font-bold text-gray-800">
              Rule Engine
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900">
              Rules
            </Link>
            <Link to="/create" className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900">
              Create
            </Link>
            <Link to="/evaluate" className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900">
              Evaluate
            </Link>
            <Link to="/combine" className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900">
              Combine
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
