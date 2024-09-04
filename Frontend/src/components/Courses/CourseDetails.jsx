import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/api';
import PaymentButton from '../Payments/PaymentButton';
import { motion } from 'framer-motion';
import { FaPlay, FaBook, FaClock, FaUser, FaStar } from 'react-icons/fa';

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchaseStatus, setPurchaseStatus] = useState(null);
  const { courseId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchCourse = async (retryCount = 0) => {
    setLoading(true);
    try {
      const response = await api.get(`/course/${courseId}`);
      if (response.data && response.data.courses) {
        setCourse(response.data.courses);
        if (user) {
          try {
            const purchasedResponse = await api.get('/course/purchasedCourses');
            const isPurchased = purchasedResponse.data.courses.some(c => c._id === courseId);
            setPurchaseStatus(isPurchased ? 'purchased' : 'not-purchased');
          } catch (purchaseError) {
            console.error('Error fetching purchased courses:', purchaseError);
            if (purchaseError.response && purchaseError.response.status === 404) {
              setPurchaseStatus('not-purchased');
            } else if (retryCount < 3) {
              setTimeout(() => fetchCourse(retryCount + 1), 1000);
              return;
            } else {
              console.warn('Unable to verify purchase status after multiple attempts.');
            }
          }
        } else {
          setPurchaseStatus(null);
        }
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (err) {
      console.error('Error fetching course:', err);
      let errorMessage = 'An unexpected error occurred while fetching the course.';
      if (err.response) {
        errorMessage = err.response.data.error || err.response.data.message || errorMessage;
      } else if (err.request) {
        errorMessage = 'No response received from the server. Please check your internet connection.';
      } else {
        errorMessage = err.message;
      }
      setError(`Failed to load course details: ${errorMessage} Please try again later.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchCourse();
    }
  }, [courseId, user]);

  const handlePurchaseSuccess = async () => {
    setLoading(true);
    try {
      const response = await api.post(`/course/${courseId}/purchase`, {}, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (response.data && response.data.message) {
        setPurchaseStatus('purchased');
        alert(response.data.message);
        // Fetch the updated course details
        await fetchCourse();
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Error updating purchased courses:', err);
      let errorMessage = 'Failed to add course to your account. Please try refreshing the page.';
      if (err.response) {
        if (err.response.status === 403) {
          errorMessage = 'You are not authorized to make this purchase. Please try logging in again.';
        } else if (err.response.status === 404) {
          errorMessage = 'The course purchase endpoint was not found. Please check the API implementation.';
        } else if (err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleStartLearning = () => {
    navigate(`/courses/${courseId}/learn`);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );
  if (error) return (
    <div className="text-center mt-8">
      <p className="text-red-600 text-xl mb-4">{error}</p>
      <p className="text-gray-600 mb-4">We're experiencing technical difficulties. Our team has been notified and is working on a solution.</p>
      <button 
        onClick={() => {
          setError(null);
          setLoading(true);
          fetchCourse();
        }}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
      >
        Try Again
      </button>
    </div>
  );
  if (!course) return <div className="text-center mt-8 text-xl">Course not found</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto mt-8 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-xl"
    >
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4 text-indigo-800">{course.title}</h1>
          <p className="text-gray-600 mb-6 text-lg">{course.description}</p>
          <div className="flex items-center space-x-4 mb-6">
            <span className="flex items-center"><FaClock className="text-indigo-500 mr-2" /> 10 hours</span>
            <span className="flex items-center"><FaBook className="text-indigo-500 mr-2" /> 5 modules</span>
            <span className="flex items-center"><FaStar className="text-yellow-400 mr-2" /> 4.8 (120 reviews)</span>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">What you'll learn</h2>
            <ul className="grid grid-cols-2 gap-4">
              {['Master key concepts', 'Build real-world projects', 'Gain industry insights', 'Earn a certificate'].map((item, index) => (
                <li key={index} className="flex items-start">
                  <FaPlay className="text-green-500 mr-2 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">Course Curriculum</h2>
            {course.curriculum ? (
              <ul className="space-y-2">
                {course.curriculum.map((item, index) => (
                  <li key={index} className="flex items-center bg-white p-3 rounded-lg shadow">
                    <FaBook className="text-indigo-500 mr-3" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Curriculum details not available.</p>
            )}
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="sticky top-8">
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <img src={course.image || 'https://via.placeholder.com/400x225?text=Course+Image'} alt={course.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              <div className="text-3xl font-bold text-indigo-600 mb-4">Rs.{course.price}</div>
              {!user && (
                <button
                  onClick={() => navigate('/signin', { state: { from: `/course/${courseId}` } })}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                >
                  Sign in to purchase
                </button>
              )}
              {user && purchaseStatus === 'not-purchased' && (
                <PaymentButton
                  courseId={courseId}
                  amount={course.price}
                  user={user}
                  onSuccess={handlePurchaseSuccess}
                />
              )}
              {user && purchaseStatus === 'purchased' && (
                <button
                  onClick={handleStartLearning}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Start Learning
                </button>
              )}
            </div>
            {course.instructor && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-indigo-700">Instructor</h2>
                <div className="flex items-center mb-4">
                  <FaUser className="text-indigo-500 mr-3 text-3xl" />
                  <div>
                    <p className="font-semibold text-lg">{course.instructor.name}</p>
                    <p className="text-gray-600">{course.instructor.title || 'Course Instructor'}</p>
                  </div>
                </div>
                <p className="text-gray-600">{course.instructor.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseDetails;
