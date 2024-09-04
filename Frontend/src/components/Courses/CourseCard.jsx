import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  // Function to get a valid image URL
  const getImageUrl = (url) => {
    // If url is undefined or null, return a placeholder
    if (!url) {
      return 'https://via.placeholder.com/400x225?text=Course+Image';
    }
    // If it's an iStock URL, use a placeholder image
    if (url.includes('istockphoto.com')) {
      return 'https://via.placeholder.com/400x225?text=Course+Image';
    }
    return url;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <img 
        src={getImageUrl(course.image)} 
        alt={course.title} 
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.onerror = null; // Prevents infinite loop if fallback image also fails
          e.target.src = 'https://via.placeholder.com/400x225?text=Course+Image'; // Fallback image
        }}
      />
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 text-gray-800">{course.title}</h3>
        <p className="text-gray-600 mb-4">{course.description.substring(0, 100)}...</p>
        <div className="flex justify-between items-center">
          <span className="text-indigo-600 font-bold">Rs.{course.price}</span>
          <Link 
            to={`/courses/${course._id}`} 
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;


