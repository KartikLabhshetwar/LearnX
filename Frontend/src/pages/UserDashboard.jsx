import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import { motion } from 'framer-motion';
import { FaBook, FaClock, FaPlay, FaGraduationCap } from 'react-icons/fa';

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        const response = await api.get('/course/purchasedCourses');
        setPurchasedCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching purchased courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedCourses();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-extrabold text-indigo-800 mb-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Welcome back, {user?.firstName}!
          </motion.h1>
          <p className="text-xl text-gray-600">Your learning journey continues here.</p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6">Your Learning Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-white rounded-lg shadow-lg p-6 flex items-center"
              variants={itemVariants}
            >
              <FaBook className="text-4xl text-indigo-500 mr-4" />
              <div>
                <p className="text-gray-600">Courses in Progress</p>
                <p className="text-2xl font-bold text-indigo-800">{purchasedCourses.length}</p>
              </div>
            </motion.div>
            <motion.div 
              className="bg-white rounded-lg shadow-lg p-6 flex items-center"
              variants={itemVariants}
            >
              <FaClock className="text-4xl text-green-500 mr-4" />
              <div>
                <p className="text-gray-600">Total Learning Time</p>
                <p className="text-2xl font-bold text-green-700">0 hours</p>
              </div>
            </motion.div>
            <motion.div 
              className="bg-white rounded-lg shadow-lg p-6 flex items-center"
              variants={itemVariants}
            >
              <FaGraduationCap className="text-4xl text-purple-500 mr-4" />
              <div>
                <p className="text-gray-600">Certificates Earned</p>
                <p className="text-2xl font-bold text-purple-700">0</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-indigo-700 mb-6">Your Purchased Courses</h2>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : purchasedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchasedCourses.map((course) => (
                <motion.div 
                  key={course._id} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                  variants={itemVariants}
                >
                  <img 
                    src={course.image || 'https://via.placeholder.com/400x200?text=Course+Image'} 
                    alt={course.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 text-indigo-800">{course.title}</h3>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 flex items-center">
                        <FaClock className="mr-1" /> 10 hours
                      </span>
                      <Link 
                        to={`/courses/${course._id}`} 
                        className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300 flex items-center"
                      >
                        <FaPlay className="mr-2" /> Continue Learning
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.p 
              className="text-center text-gray-600 text-lg"
              variants={itemVariants}
            >
              You haven't purchased any courses yet. 
              <Link to="/courses" className="text-indigo-600 hover:underline ml-1">
                Explore our courses!
              </Link>
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UserDashboard;