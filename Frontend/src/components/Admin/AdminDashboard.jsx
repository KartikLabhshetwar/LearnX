import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import CreateCourseForm from './CreateCourseForm';
import api from '../../api/api';
import CourseCard from '../Courses/CourseCard';
import { AdminContext } from '../../context/AdminContext';
import { FaGraduationCap, FaPlus } from 'react-icons/fa';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { admin } = useContext(AdminContext);

  useEffect(() => {
    if (admin) {
      handleCourseCreated();
    }
  }, [admin]);

  const handleCourseCreated = async () => {
    try {
      const response = await api.get('/admin/courses');
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!admin) {
    return <Navigate to="/admin/signin" />;
  }

  return (
    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-5xl font-bold mb-8 text-center text-indigo-800">
          <FaGraduationCap className="inline-block mr-4" />
          Admin Dashboard
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-3xl font-semibold mb-6 text-indigo-700">Courses Overview</h2>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map(course => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-lg">No courses available. Create your first course below!</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-3xl font-semibold mb-6 text-indigo-700">Manage Courses</h2>
          {showCreateForm ? (
            <CreateCourseForm onCourseCreated={handleCourseCreated} />
          ) : (
            <button
              onClick={() => setShowCreateForm(true)}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            >
              <FaPlus className="mr-2" />
              Create New Course
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;