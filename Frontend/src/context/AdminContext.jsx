import { createContext, useState, useEffect, useCallback } from 'react';
import api from '../api/api';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearAdminSession = useCallback(() => {
    localStorage.removeItem('adminToken');
    delete api.defaults.headers.common['Authorization'];
    setAdmin(null);
  }, []);

  const fetchAdmin = useCallback(async (token) => {
    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.get('/admin/me'); // Updated endpoint
      setAdmin(response.data.admin);
    } catch (error) {
      console.error('Error fetching admin:', error);
      clearAdminSession();
    } finally {
      setLoading(false);
    }
  }, [clearAdminSession]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      fetchAdmin(token);
    } else {
      setLoading(false);
    }
  }, [fetchAdmin]);

  const adminLogin = async (credentials) => {
    clearAdminSession(); // Clear any old session data before login
    try {
      const response = await api.post('/admin/signin', credentials);
      const { token } = response.data;
      localStorage.setItem('adminToken', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await fetchAdmin(token);
      return true;
    } catch (error) {
      console.error('Error logging in as admin:', error);
      return false;
    }
  };

  const adminLogout = useCallback(() => {
    clearAdminSession();
  }, [clearAdminSession]);

  const value = {
    admin,
    loading,
    adminLogin,
    adminLogout,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};