import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { AdminContext } from '../../context/AdminContext';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { admin, adminLogout } = useContext(AdminContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = user ? [
    { label: 'Courses', path: '/courses' },
    { label: 'My Learning', path: '/dashboard' },
    { label: 'Logout', action: logout },
  ] : admin ? [
    { label: 'Courses', path: '/courses' },
    { label: 'Admin Dashboard', path: '/admin/dashboard' },
    { label: 'Admin Logout', action: adminLogout },
  ] : [
    { label: 'Courses', path: '/courses' },
    { label: 'Sign In', path: '/signin' },
    { label: 'Sign Up', path: '/signup' },
    { label: 'Admin', path: '/admin/signup' },
  ];

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
            <FaGraduationCap className="text-yellow-300" />
            <span>LearnX</span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            {menuItems.map((item, index) => (
              <motion.li key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                {item.path ? (
                  <Link to={item.path} className="hover:text-yellow-300 transition-colors duration-200">
                    {item.label}
                  </Link>
                ) : (
                  <button onClick={item.action} className="hover:text-yellow-300 transition-colors duration-200">
                    {item.label}
                  </button>
                )}
              </motion.li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-2xl" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.ul 
            className="md:hidden mt-4 space-y-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {menuItems.map((item, index) => (
              <motion.li 
                key={index}
                whileTap={{ scale: 0.95 }}
                className="py-2 px-4 hover:bg-indigo-700 rounded transition-colors duration-200"
              >
                {item.path ? (
                  <Link to={item.path} className="block" onClick={toggleMenu}>
                    {item.label}
                  </Link>
                ) : (
                  <button onClick={() => { item.action(); toggleMenu(); }} className="block w-full text-left">
                    {item.label}
                  </button>
                )}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </nav>

      {/* User/Admin Welcome Message */}
      {(user || admin) && (
        <div className="bg-indigo-700 py-2 px-4 text-center">
          <p className="text-sm">
            Welcome back, <span className="font-semibold">{user ? (user.firstName || 'Learner') : 'Admin'}</span>! 
            {user ? ' Ready to continue your learning journey?' : ' Manage your courses and users.'}
          </p>
        </div>
      )}
    </header>
  );
};

export default Header;