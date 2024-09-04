import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/api'; // Adjust this import based on your project structure

const Home = () => {
  const [trendingCourses, setTrendingCourses] = useState([]);

  useEffect(() => {
    const fetchTrendingCourses = async () => {
      try {
        const response = await api.get('/course/courses');
        setTrendingCourses(response.data.courses.slice(0, 3)); // Get the first 3 courses
      } catch (error) {
        console.error('Error fetching trending courses:', error);
      }
    };

    fetchTrendingCourses();
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-800 min-h-full text-white">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-20 text-center"
      >
        <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
          Unlock Your Potential with LearnX
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Embark on a journey of discovery. Learn from industry experts and transform your skills with our cutting-edge online courses.
        </p>
        <Link to="/courses" className="bg-pink-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-pink-600 transition duration-300 ease-in-out transform hover:scale-105 mr-4">
          Explore Courses
        </Link>
        <Link to="/admin/signin" className="bg-yellow-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105">
          Admin Access
        </Link>
      </motion.div>

      {/* Trending Courses */}
      <div className="py-16 px-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-center mb-12">Trending Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {trendingCourses.map((course) => (
            <motion.div 
              key={course._id}
              whileHover={{ scale: 1.05 }}
              className="bg-white bg-opacity-20 rounded-xl overflow-hidden shadow-lg"
            >
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.onerror = null; // Prevents infinite loop if fallback image also fails
                  e.target.src = 'https://via.placeholder.com/400x225?text=Course+Image'; // Fallback image
                }}
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{course.title}</h3>
                <p className="text-gray-300 mb-4">{course.description}</p>
                <Link to={`/courses/${course._id}`} className="text-pink-400 hover:text-pink-300">
                  Learn More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Student Success Stories</h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8 max-w-4xl mx-auto">
          {[1, 2].map((index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl p-6 max-w-sm"
            >
              <p className="text-lg mb-4">"LearnX transformed my career. The courses are engaging and the instructors are world-class!"</p>
              <div className="flex items-center">
                <img src={`https://i.pravatar.cc/60?img=${index}`} alt="Student" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h3 className="font-bold">Sarah Johnson</h3>
                  <p className="text-sm text-gray-300">Web Developer</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-pink-500 to-purple-600 py-16 px-4 text-center"
      >
        <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Future?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of learners who have already taken the first step towards their dream career.</p>
        <Link to="/signup" className="bg-white text-purple-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105">
          Start Learning for Free
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
