import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Courses from './pages/Courses';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import UserDashboard from './pages/UserDashboard';
import AdminSignup from './components/Admin/AdminSignup';
import AdminSignin from './components/Admin/AdminSignin';
import AdminDashboardPage from './pages/AdminDashboardPage';
import CourseDetails from './components/Courses/CourseDetails';
import Layout from './components/Layout/Layout';
import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext'; // Import AdminProvider
import CourseLearn from './components/Courses/CourseLearn';
import PrivateRoute from './utils/PrivateRoute';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy'; // Import PrivateRoute

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:courseId" element={<CourseDetails />} />
              <Route path="/courses/:courseId/learn" element={<CourseLearn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/admin/signup" element={<AdminSignup />} />
              <Route path="/admin/signin" element={<AdminSignin />} />
              <Route path="/terms-of-service" component={<TermsOfService/>} />
              <Route path="/privacy-policy" component={<PrivacyPolicy/>} />
              <Route
                path="/admin/dashboard"
                element={
                  <PrivateRoute>
                    <AdminDashboardPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Layout>
        </Router>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;