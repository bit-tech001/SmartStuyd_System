// import { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../contexts/AuthContext';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: 'student'
//   });
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [step, setStep] = useState(1);
//   const { register } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return;
//     }

//     try {
//       await register(formData.name, formData.email, formData.password, formData.role);
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed. Please try again.');
//     }
//   };

//   // Password strength checker
//   const getPasswordStrength = (password) => {
//     let strength = 0;
//     if (password.length >= 6) strength++;
//     if (password.length >= 8) strength++;
//     if (/[A-Z]/.test(password)) strength++;
//     if (/[0-9]/.test(password)) strength++;
//     if (/[^A-Za-z0-9]/.test(password)) strength++;
//     return strength;
//   };

//   const passwordStrength = getPasswordStrength(formData.password);
//   const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-400', 'bg-green-500'];
//   const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

//   const isStep1Valid = formData.name.trim() && formData.email.trim();
//   const isStep2Valid = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && formData.password.length >= 6;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//       {/* Background Decorative Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
//       </div>

//       <div className="max-w-md w-full relative z-10 animate-slideUp">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-700 to-primary-500 rounded-2xl mb-5 
//                         shadow-xl shadow-primary-500/30 animate-float">
//             <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                     d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//             </svg>
//           </div>
//           <h2 className="text-3xl font-display font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
//             Create Account
//           </h2>
//           <p className="mt-2 text-gray-600">Join StudyMS and start your learning journey</p>
          
//           {/* Step Indicators */}
//           <div className="flex items-center justify-center gap-3 mt-6">
//             <div className={`flex items-center gap-2 ${step === 1 ? 'opacity-100' : 'opacity-50'}`}>
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
//                 step === 1 
//                   ? 'bg-gradient-to-br from-primary-700 to-primary-500 text-white shadow-lg shadow-primary-500/30' 
//                   : 'bg-gray-200 text-gray-500'
//               }`}>
//                 1
//               </div>
//               <span className="text-xs font-medium text-gray-600 hidden sm:block">Account</span>
//             </div>
//             <div className="w-8 h-0.5 bg-gray-300"></div>
//             <div className={`flex items-center gap-2 ${step === 2 ? 'opacity-100' : 'opacity-50'}`}>
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
//                 step === 2 
//                   ? 'bg-gradient-to-br from-primary-700 to-primary-500 text-white shadow-lg shadow-primary-500/30' 
//                   : 'bg-gray-200 text-gray-500'
//               }`}>
//                 2
//               </div>
//               <span className="text-xs font-medium text-gray-600 hidden sm:block">Security</span>
//             </div>
//           </div>
//         </div>

//         {/* Form Card */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-primary-900/10 border border-primary-100/50 p-8">
//           {/* Error Alert */}
//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-fadeIn">
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                   <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-red-800">Error</p>
//                   <p className="text-sm text-red-700">{error}</p>
//                 </div>
//                 <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-600">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           )}
          
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Step 1: Account Info */}
//             {step === 1 && (
//               <div className="animate-fadeIn space-y-5">
//                 {/* Full Name */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
//                   <div className="relative group">
//                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                       <svg className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                               d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                       </svg>
//                     </div>
//                     <input
//                       type="text"
//                       name="name"
//                       placeholder="Enter your full name"
//                       className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none 
//                                focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 
//                                transition-all duration-300 text-gray-900 placeholder-gray-400"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                     />
//                     {formData.name && (
//                       <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
//                         <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
//                   <div className="relative group">
//                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                       <svg className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                               d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                       </svg>
//                     </div>
//                     <input
//                       type="email"
//                       name="email"
//                       placeholder="you@example.com"
//                       className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none 
//                                focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 
//                                transition-all duration-300 text-gray-900 placeholder-gray-400"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                     />
//                     {formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
//                       <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
//                         <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Role Selection */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">I want to register as</label>
//                   <div className="grid grid-cols-2 gap-3">
//                     <button
//                       type="button"
//                       onClick={() => setFormData({...formData, role: 'student'})}
//                       className={`relative p-4 text-center rounded-xl border-2 transition-all duration-300 group overflow-hidden ${
//                         formData.role === 'student'
//                           ? 'border-primary-500 bg-primary-50 shadow-lg shadow-primary-500/10'
//                           : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
//                       }`}
//                     >
//                       {formData.role === 'student' && (
//                         <div className="absolute top-2 right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
//                           <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                           </svg>
//                         </div>
//                       )}
//                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 transition-all ${
//                         formData.role === 'student' ? 'bg-primary-100' : 'bg-gray-100 group-hover:bg-gray-200'
//                       }`}>
//                         <svg className={`w-5 h-5 ${formData.role === 'student' ? 'text-primary-600' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path d="M12 14l9-5-9-5-9 5 9 5z" />
//                           <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
//                         </svg>
//                       </div>
//                       <span className={`font-semibold text-sm ${formData.role === 'student' ? 'text-primary-700' : 'text-gray-600'}`}>
//                         Student
//                       </span>
//                       <p className="text-xs text-gray-400 mt-1">Take exams & submit work</p>
//                     </button>

//                     <button
//                       type="button"
//                       onClick={() => setFormData({...formData, role: 'admin'})}
//                       className={`relative p-4 text-center rounded-xl border-2 transition-all duration-300 group overflow-hidden ${
//                         formData.role === 'admin'
//                           ? 'border-primary-500 bg-primary-50 shadow-lg shadow-primary-500/10'
//                           : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
//                       }`}
//                     >
//                       {formData.role === 'admin' && (
//                         <div className="absolute top-2 right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
//                           <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                           </svg>
//                         </div>
//                       )}
//                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 transition-all ${
//                         formData.role === 'admin' ? 'bg-primary-100' : 'bg-gray-100 group-hover:bg-gray-200'
//                       }`}>
//                         <svg className={`w-5 h-5 ${formData.role === 'admin' ? 'text-primary-600' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                                 d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                         </svg>
//                       </div>
//                       <span className={`font-semibold text-sm ${formData.role === 'admin' ? 'text-primary-700' : 'text-gray-600'}`}>
//                         Faculty
//                       </span>
//                       <p className="text-xs text-gray-400 mt-1">Create & manage content</p>
//                     </button>
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => setStep(2)}
//                   disabled={!isStep1Valid}
//                   className="w-full py-3.5 bg-gradient-to-r from-primary-700 to-primary-500 text-white rounded-xl font-semibold 
//                            shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 
//                            transform hover:-translate-y-0.5 transition-all duration-200 
//                            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
//                            flex items-center justify-center gap-2"
//                 >
//                   Continue
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                   </svg>
//                 </button>
//               </div>
//             )}

//             {/* Step 2: Security */}
//             {step === 2 && (
//               <div className="animate-fadeIn space-y-5">
//                 {/* Password */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
//                   <div className="relative group">
//                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                       <svg className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                               d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                       </svg>
//                     </div>
//                     <input
//                       type={showPassword ? 'text' : 'password'}
//                       name="password"
//                       placeholder="Create a strong password"
//                       className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none 
//                                focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 
//                                transition-all duration-300 text-gray-900 placeholder-gray-400"
//                       value={formData.password}
//                       onChange={handleChange}
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
//                     >
//                       {showPassword ? (
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M6.58 16.42L17.42 5.58" />
//                         </svg>
//                       ) : (
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                         </svg>
//                       )}
//                     </button>
//                   </div>
                  
//                   {/* Password Strength Meter */}
//                   {formData.password && (
//                     <div className="mt-3 animate-fadeIn">
//                       <div className="flex gap-1.5 mb-2">
//                         {[1, 2, 3, 4, 5].map((level) => (
//                           <div
//                             key={level}
//                             className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
//                               passwordStrength >= level 
//                                 ? strengthColors[passwordStrength - 1] 
//                                 : 'bg-gray-200'
//                             }`}
//                           ></div>
//                         ))}
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <p className={`text-xs font-medium ${
//                           passwordStrength <= 1 ? 'text-red-500' :
//                           passwordStrength <= 2 ? 'text-orange-500' :
//                           passwordStrength <= 3 ? 'text-yellow-500' :
//                           'text-green-500'
//                         }`}>
//                           {strengthLabels[passwordStrength - 1] || 'Very Weak'}
//                         </p>
//                         <div className="flex gap-1">
//                           {formData.password.length >= 8 && (
//                             <span className="text-xs text-green-500 flex items-center gap-1">
//                               <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                               </svg>
//                               8+ chars
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Confirm Password */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
//                   <div className="relative group">
//                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                       <svg className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                               d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                       </svg>
//                     </div>
//                     <input
//                       type={showConfirmPassword ? 'text' : 'password'}
//                       name="confirmPassword"
//                       placeholder="Confirm your password"
//                       className={`w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 rounded-xl focus:outline-none 
//                                transition-all duration-300 text-gray-900 placeholder-gray-400
//                                ${formData.confirmPassword 
//                                  ? (formData.password === formData.confirmPassword 
//                                    ? 'border-green-500 focus:border-green-500 focus:ring-4 focus:ring-green-500/10' 
//                                    : 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10')
//                                  : 'border-gray-200 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10'
//                                }`}
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                       className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
//                     >
//                       {showConfirmPassword ? (
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M6.58 16.42L17.42 5.58" />
//                         </svg>
//                       ) : (
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                         </svg>
//                       )}
//                     </button>
//                     {formData.confirmPassword && formData.password === formData.confirmPassword && (
//                       <div className="absolute inset-y-0 right-10 pr-2 flex items-center">
//                         <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Navigation Buttons */}
//                 <div className="flex gap-3 pt-2">
//                   <button
//                     type="button"
//                     onClick={() => setStep(1)}
//                     className="flex-1 py-3.5 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold 
//                              hover:bg-gray-50 hover:border-gray-300 transition-all duration-200
//                              flex items-center justify-center gap-2"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                     </svg>
//                     Back
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={!isStep2Valid}
//                     className="flex-1 py-3.5 bg-gradient-to-r from-primary-700 to-primary-500 text-white rounded-xl font-semibold 
//                              shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 
//                              transform hover:-translate-y-0.5 transition-all duration-200 
//                              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
//                              flex items-center justify-center gap-2"
//                   >
//                     Create Account
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </form>

//           {/* Footer */}
//           <div className="mt-6 pt-6 border-t border-gray-100 text-center">
//             <p className="text-sm text-gray-600">
//               Already have an account?{' '}
//               <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors">
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;






import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password, formData.role);
      if(formData.role == 'faculty')  {
        navigate('/faculty/dashboard');
      }else  {
        navigate('student/dashboard');
      }
      
      
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-400', 'bg-green-500'];
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

  const isStep1Valid = formData.name.trim() && formData.email.trim();
  const isStep2Valid = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && formData.password.length >= 6;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-12 min-h-[580px] border border-gray-100">
        
        {/* Left Branding Content Pane */}
        <div className="md:col-span-5 bg-gradient-to-br from-primary-700 to-primary-600 p-10 flex flex-col justify-between text-white relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent)] pointer-events-none"></div>
          
          <div>
                   
                  <h2 className="text-2xl font-bold tracking-tight">Welcome to StudyMS </h2>
             {/* <div >
             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJLvxqseFFq1JGEpf9dimnJsiKlswlAHJBUQ&s" alt="Registration Illustration" className="w-full h-auto mt-6 opacity-90  rounded-b-full" />
           </div> */}
            {/* <div className="inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-xl mb-8 border border-white/10">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              </svg>
            </div> */}
      
            {/* <p className="mt-0 text-sm text-primary-100/80 leading-relaxed font-light">
              Access assignment execution tracking 
            </p> */}
          </div>
         

          {/* Minimalist Tab/Step Indicators aligned to bottom of banner */}
          {/* <div className="space-y-4 mt-8 md:mt-0 border-t border-white/10 pt-6">
            <div className="flex items-center gap-4">
              <div className={`h-1 w-6 rounded-full transition-all duration-300 ${step === 1 ? 'bg-white w-10' : 'bg-white/20'}`}></div>
              <span className={`text-[11px] uppercase tracking-widest font-semibold transition-opacity duration-300 ${step === 1 ? 'opacity-100' : 'opacity-40'}`}>
                01. Core Identity
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className={`h-1 w-6 rounded-full transition-all duration-300 ${step === 2 ? 'bg-white w-10' : 'bg-white/20'}`}></div>
              <span className={`text-[11px] uppercase tracking-widest font-semibold transition-opacity duration-300 ${step === 2 ? 'opacity-100' : 'opacity-40'}`}>
                02. Access Keys
              </span>
            </div>
          </div> */}
        </div>

        {/* Right Active Interactive Form Window */}
        <div className="md:col-span-7 p-10 flex flex-col justify-between bg-white">
          
          {/* Top Header Group */}
          {/* <div className="mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-700 bg-primary-50 px-2.5 py-1 rounded-md inline-block">
              Secure Enrollment Gateway
            </span>
            <h3 className="text-2xl font-bold text-gray-900 mt-2 tracking-tight">Create Account</h3>
          </div> */}

          {/* Dynamic Error Messaging Space */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2.5 animate-fadeIn">
              <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <p className="text-xs text-red-700 leading-tight">{error}</p>
              </div>
              <button onClick={() => setError('')} className="text-red-400 hover:text-red-600 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 my-auto">
            {/* Step 1: Core Fields Context */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Alexander Wright"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none 
                             focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/5 
                             transition-all duration-200 text-gray-900 placeholder-gray-400 text-sm"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="alex@domain.com"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none 
                             focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/5 
                             transition-all duration-200 text-gray-900 placeholder-gray-400 text-sm"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">System Segment</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, role: 'student'})}
                      className={`p-3.5 text-left rounded-xl border transition-all duration-200 ${
                        formData.role === 'student'
                          ? 'border-primary-500 bg-primary-50/20 ring-1 ring-primary-500'
                          : 'border-gray-200 bg-white hover:bg-gray-50/50'
                      }`}
                    >
                      <span className="block font-bold text-xs text-gray-900">
                        Student Domain
                      </span>
                      <span className="text-[10px] text-gray-400 block mt-0.5 leading-tight">Execution & tracking access</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({...formData, role: 'faculty'})}
                      className={`p-3.5 text-left rounded-xl border transition-all duration-200 ${
                        formData.role === 'faculty'
                          ? 'border-primary-500 bg-primary-50/20 ring-1 ring-primary-500'
                          : 'border-gray-200 bg-white hover:bg-gray-50/50'
                      }`}
                    >
                      <span className="block font-bold text-xs text-gray-900">
                        Faculty Node
                      </span>
                      <span className="text-[10px] text-gray-400 block mt-0.5 leading-tight">Content control pipelines</span>
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!isStep1Valid}
                  className="w-full mt-2 py-3 bg-gradient-to-r from-primary-700 to-primary-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider
                           shadow-md shadow-primary-500/10 hover:from-primary-600 hover:to-primary-500 transition-all duration-200 disabled:opacity-40"
                >
                  Proceed to Security keys
                </button>
              </div>
            )}

            {/* Step 2: Verification/Secret Keys Configuration */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Master Key</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="••••••••"
                      className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none 
                               focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/5 
                               transition-all duration-200 text-gray-900 placeholder-gray-400 text-sm"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Password Entropy Output Module */}
                  {formData.password && (
                    <div className="mt-2.5 flex items-center justify-between gap-4">
                      <div className="flex gap-1 flex-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              passwordStrength >= level ? strengthColors[passwordStrength - 1] : 'bg-gray-100'
                            }`}
                          ></div>
                        ))}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wide ${
                        passwordStrength <= 1 ? 'text-red-500' :
                        passwordStrength <= 2 ? 'text-orange-500' :
                        passwordStrength <= 3 ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {strengthLabels[passwordStrength - 1] || 'Very Weak'}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Verify Master Key</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="••••••••"
                      className={`w-full pl-4 pr-10 py-2.5 bg-gray-50 border rounded-xl focus:outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 text-sm
                               ${formData.confirmPassword 
                                 ? (formData.password === formData.confirmPassword ? 'border-green-500 focus:border-green-500' : 'border-red-500 focus:border-red-500')
                                 : 'border-gray-200 focus:border-primary-500'
                               }`}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 border border-gray-200 text-gray-500 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!isStep2Valid}
                    className="flex-1 py-2.5 bg-gradient-to-r from-primary-700 to-primary-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider
                             shadow-md shadow-primary-500/10 hover:from-primary-600 hover:to-primary-500 transition-all duration-200 disabled:opacity-40"
                  >
                    Initialize Account
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Persistent Inline Form Navigation Footer */}
          <div className="border-t border-gray-100 pt-4 flex items-center justify-between mt-6">
            <span className="text-xs text-gray-400">Already registered?</span>
            <Link to="/login" className="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors uppercase tracking-wider">
              Sign In
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Register;

