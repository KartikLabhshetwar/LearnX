import React from 'react';
import { motion } from 'framer-motion';
import CourseList from '../components/Courses/CourseList';

const Courses = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-indigo-800 mb-2">Explore Our Courses</h1>
          <p className="text-xl text-gray-600">Discover a world of knowledge and unlock your potential</p>
        </motion.div>
        <CourseList />
      </div>
    </div>
  );
};

export default Courses;