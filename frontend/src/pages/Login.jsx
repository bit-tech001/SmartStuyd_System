
// import { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../contexts/AuthContext';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // =========================
//   // LOGIN HANDLER
//   // =========================
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       setLoading(true);
//       await login(email, password);
//       navigate('student/dashboard');
//     } catch (error) {
//       console.log(error);
//       setError(
//         error?.response?.data?.message ||
//         'Invalid credentials. Please try again.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#fff6f6] via-white to-[#fff0f0] flex items-center justify-center px-4 py-12 overflow-hidden relative">
      
//       {/* BACKGROUND BLOBS */}
//       <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-[#c94343]/5 blur-3xl pointer-events-none"></div>
//       <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-[#9f2f2f]/5 blur-3xl pointer-events-none"></div>

//       {/* CARD CONTAINMENT */}
//       <div className="relative w-full max-w-md transition-all duration-300 hover:translate-y-[-2px]">
//         <div className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(159,47,47,0.08)] border border-gray-100/80 overflow-hidden">
          
//           {/* TOP BRAND HEADER */}
//           <div className="bg-gradient-to-br from-[#801c1c] via-[#a62f2f] to-[#c94343] px-8 pt-12 pb-10 text-center text-white relative overflow-hidden">
//             <div className="absolute top-[-30px] right-[-30px] w-44 h-44 rounded-full bg-white/5 blur-xl"></div>
//             <div className="absolute bottom-[-40px] left-[-20px] w-32 h-32 rounded-full bg-black/10 blur-xl"></div>
            
//             <div className="relative z-10 flex flex-col items-center">
//               {/* UNIVERSITY LOGO CONTAINER */}
//               <div className="p-4 rounded-2xl bg-white shadow-xl max-w-[220px] mb-6 transform transition duration-500 hover:scale-105">
//                 <img 
//                   src="/frontend/src/assets/" 
//                   alt="Kaziranga University" 
//                   className="w-full h-auto object-contain"
//                 />
//               </div>

//               <h1 className="text-2xl font-extrabold tracking-tight mt-2">
//                 Welcome Back
//               </h1>
//               <p className="mt-1.5 text-xs text-white/80 tracking-wide font-light uppercase">
//                 Knowledge & Beyond
//               </p>
//             </div>
//           </div>

//           {/* FORM BODY */}
//           <div className="p-8 sm:p-10">
//             {/* ERROR DISPLAY */}
//             {error && (
//               <div className="mb-6 bg-red-50/80 border border-red-100 text-red-600 px-4 py-3.5 rounded-xl text-sm flex items-center gap-2 animate-fade-in">
//                 <svg className="w-5 h-5 shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                 </svg>
//                 <span className="font-medium">{error}</span>
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-5">
              
//               {/* EMAIL FIELD */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#a62f2f] transition-colors">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
//                     </svg>
//                   </div>
//                   <input
//                     type="email"
//                     placeholder="name@university.edu"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50/50 pl-12 pr-4 text-gray-800 outline-none focus:bg-white focus:border-[#a62f2f] focus:ring-4 focus:ring-red-500/10 transition-all placeholder:text-gray-400"
//                   />
//                 </div>
//               </div>

//               {/* PASSWORD FIELD */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
//                   Password
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#a62f2f] transition-colors">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m6 4H6a2 2 0 01-2-2v-6a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2zm-8-10V7a4 4 0 118 0v4" />
//                     </svg>
//                   </div>
//                   <input
//                     type="password"
//                     placeholder="••••••••"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50/50 pl-12 pr-4 text-gray-800 outline-none focus:bg-white focus:border-[#a62f2f] focus:ring-4 focus:ring-red-500/10 transition-all placeholder:text-gray-400"
//                   />
//                 </div>
//               </div>

//               {/* RETRIEVAL OPTIONS */}
//               <div className="flex items-center justify-between pt-1">
//                 <label className="flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer select-none">
//                   <input
//                     type="checkbox"
//                     className="w-4 h-4 rounded border-gray-300 text-[#a62f2f] focus:ring-[#a62f2f] focus:ring-offset-0 cursor-pointer"
//                   />
//                   <span>Remember me</span>
//                 </label>
//                 <button
//                   type="button"
//                   className="text-sm font-semibold text-[#a62f2f] hover:text-[#801c1c] transition-colors duration-200"
//                 >
//                   Forgot password?
//                 </button>
//               </div>

//               {/* ACTION SUBMIT BUTTON */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full h-12 mt-3 rounded-xl bg-gradient-to-r from-[#a62f2f] to-[#c94343] hover:from-[#801c1c] hover:to-[#a62f2f] text-white font-bold tracking-wide shadow-lg shadow-red-600/15 hover:shadow-red-600/25 active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none transition-all duration-200"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                     </svg>
//                     Signing In...
//                   </span>
//                 ) : (
//                   'Sign In'
//                 )}
//               </button>

//             </form>

//             {/* CREATION FOOTER */}
//             <div className="mt-8 pt-6 border-t border-gray-100 text-center">
//               <p className="text-sm text-gray-500">
//                 Don't have an account?{' '}
//                 <Link
//                   to="/register"
//                   className="font-bold text-[#a62f2f] hover:text-[#801c1c] transition-colors duration-200 ml-1"
//                 >
//                   Create Account
//                 </Link>
//               </p>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import logo from '../assets/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // =========================
  // LOGIN HANDLER
  // =========================
 const handleSubmit = async (e) => {
  e.preventDefault();

  setError('');

  try {

    setLoading(true);

    // login response
    const response = await login(email, password);

    console.log(response);

    // role
    const role = response?.user?.role;

    console.log(role);

    if (role === 'admin') {
      navigate('/admin/dashboard');

    } else if (role === 'faculty') {
      navigate('/faculty/dashboard');

    } else {
      navigate('/student/dashboard');
    }

  } catch (error) {

    console.log(error);

    setError(
      error?.response?.data?.message ||
      'Invalid credentials'
    );

  } finally {

    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff6f6] via-white to-[#fff0f0] flex items-center justify-center px-4 py-8 overflow-hidden relative">
      
      {/* BACKGROUND BLOBS */}
      <div className="absolute top-[-120px] right-[-120px] w-[350px] h-[350px] rounded-full bg-[#c94343]/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-120px] left-[-120px] w-[350px] h-[350px] rounded-full bg-[#9f2f2f]/5 blur-3xl pointer-events-none"></div>

      {/* COMPACT CARD CONTAINER */}
      <div className="relative w-full max-w-sm transition-all duration-300 hover:translate-y-[-2px]">
        <div className="bg-white rounded-[28px] shadow-[0_20px_40px_rgba(159,47,47,0.06)] border border-gray-100/80 overflow-hidden">
          
          {/* BRAND HEADER */}
          <div className="bg-gradient-to-br from-[#ffffff] via-[#ffffff] to-[#ffffff] px-6 pt-10 pb-8 text-center text-black relative overflow-hidden">
            <div className="absolute top-[-40px] right-[-40px] w-36 h-36 rounded-full bg-white/5 blur-xl"></div>
            <div className="absolute bottom-[-50px] left-[-30px] w-28 h-28 rounded-full bg-black/10 blur-xl"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              {/* COMPACT UNIVERSITY LOGO */}
              <div className="p-3.5 rounded-xl bg-white  max-w-[180px] mb-4 transform transition duration-500 hover:scale-105">
                <img 
                  src={logo} 
                  alt="Kaziranga University" 
                  className="w-full h-auto object-contain"
                />
              </div>

              <h1 className="text-xl font-extrabold tracking-tight mt-1">
                Welcome Back
              </h1>
              <p className="mt-1 text-[10px] text-black/80 tracking-widest font-light uppercase">
                Knowledge & Beyond
              </p>
            </div>
          </div>

          {/* COMPACT FORM BODY */}
          <div className="p-6 sm:p-8">
            {/* ERROR DISPLAY */}
            {error && (
              <div className="mb-4 bg-red-50/80 border border-red-100 text-red-600 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
                <svg className="w-4 h-4 shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4.5">
              
              {/* EMAIL FIELD */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#a62f2f] transition-colors">
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="name@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 text-sm text-gray-800 outline-none focus:bg-white focus:border-[#a62f2f] focus:ring-4 focus:ring-red-500/10 transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* PASSWORD FIELD */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#a62f2f] transition-colors">
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m6 4H6a2 2 0 01-2-2v-6a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2zm-8-10V7a4 4 0 118 0v4" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 text-sm text-gray-800 outline-none focus:bg-white focus:border-[#a62f2f] focus:ring-4 focus:ring-red-500/10 transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* OPTIONS */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 rounded border-gray-300 text-[#a62f2f] focus:ring-[#a62f2f] focus:ring-offset-0 cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-xs font-semibold text-[#a62f2f] hover:text-[#801c1c] transition-colors duration-200"
                >
                  Forgot?
                </button>
              </div>

              {/* COMPACT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 mt-2 rounded-xl bg-gradient-to-r from-[#a62f2f] to-[#c94343] hover:from-[#801c1c] hover:to-[#a62f2f] text-white text-sm font-bold tracking-wide shadow-md shadow-red-600/10 hover:shadow-red-600/20 active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none transition-all duration-200"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>

            </form>

            {/* REGISTER RE-ROUTE */}
            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-500">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-bold text-[#a62f2f] hover:text-[#801c1c] transition-colors duration-200 ml-0.5"
                >
                  Create Account
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

