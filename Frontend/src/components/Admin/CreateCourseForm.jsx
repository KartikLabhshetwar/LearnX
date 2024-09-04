import { useState, useContext } from 'react';
import api from '../../api/api';
import { AdminContext } from '../../context/AdminContext';
import { FaBook, FaMoneyBillWave, FaPencilAlt, FaImage } from 'react-icons/fa';

const CreateCourseForm = ({ onCourseCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: '', // Make sure this field is included
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { admin } = useContext(AdminContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No admin token found. Please log in again.');
      }
      // Make sure all fields, including image, are being sent
      await api.post('/admin/courses', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onCourseCreated();
      setFormData({ title: '', description: '', price: '', image: '' });
      alert('Course created successfully!');
    } catch (error) {
      console.error('Error creating course:', error);
      setError(error.response?.data?.message || error.message || 'An error occurred while creating the course');
    } finally {
      setLoading(false);
    }
  };

  if (!admin) {
    return <p className="text-red-500">You must be logged in as an admin to create courses.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      <div className="relative">
        <FaBook className="absolute top-3 left-3 text-indigo-500" />
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Course Title"
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <div className="relative">
        <FaPencilAlt className="absolute top-3 left-3 text-indigo-500" />
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Course Description"
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          rows="4"
        ></textarea>
      </div>
      <div className="relative">
        <FaMoneyBillWave className="absolute top-3 left-3 text-indigo-500" />
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          placeholder="Course Price"
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <div className="relative">
        <FaImage className="absolute top-3 left-3 text-indigo-500" />
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
          placeholder="Course Image URL"
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Please provide a direct link to the image file (e.g., https://example.com/image.jpg). 
        Stock photo website links won't work directly.
      </p>
      <button 
        type="submit" 
        className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Course'}
      </button>
    </form>
  );
};

export default CreateCourseForm;