// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/api';


// const SignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSignIn = async () => {
//     // Add your sign-in logic here
//     try{
//         const response = await api.post("/user/signin", {
//             username: email,
//             password:password
//           })
//           localStorage.setItem("token", response.data.token);
//           navigate("/dashboard")
//     } catch(e){
//         console.log(e)
//     }
   
//   };

// return (
//     <div className="h-screen flex justify-center items-center bg-gray-100">
//         <div className="max-w-md w-full p-4 bg-white rounded shadow-md">
//             <h1 className="text-3xl font-bold mb-4 text-center p-5">Sign In</h1>
//             <form>
//                 <label className="block mb-2 p-5">
//                     <span className="text-gray-700">Email:</span>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="block w-full p-2 pl-10 text-lg text-gray-700"
//                         placeholder="example@example.com"
//                     />
//                 </label>
//                 <label className="block mb-2 p-5">
//                     <span className="text-gray-700">Password:</span>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="block w-full p-2 pl-10 text-lg text-gray-700"
//                         placeholder="●●●●●●●●●●"
//                     />
//                 </label>
//                 <div className="flex justify-center p-5">
//                     <button
//                         type="button"
//                         onClick={handleSignIn}
//                         className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
//                     >
//                         Sign In
//                     </button>
//                 </div>
//             </form>
//         </div>
//     </div>
// );
// };

// export default SignIn;

// src/pages/SignIn.js

import { Link } from 'react-router-dom';
import SignInForm from '../components/Auth/SignInForm';

const SignIn = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignInForm />
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
          Forgot your password?
        </Link>
      </div>
    </div>
  );
};

export default SignIn;