import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  // =========================
  // LOGIN
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError('');

    try {

      setLoading(true);

      await login(email, password);

      navigate('student/dashboard');

    } catch (error) {

      console.log(error);

      setError(
        error?.response?.data?.message ||
        'Invalid credentials. Please try again.'
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#fff5f5] via-white to-[#ffecec] flex items-center justify-center px-4 py-12 overflow-hidden relative">

      {/* BACKGROUND BLOBS */}
      <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full bg-red-200/40 blur-3xl"></div>

      <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-red-300/30 blur-3xl"></div>

      {/* CARD */}
      <div className="relative w-full max-w-md">

        <div className="bg-white rounded-[35px] shadow-2xl border border-gray-100 overflow-hidden">

          {/* TOP HEADER */}
          <div className="bg-gradient-to-r from-[#c94343] to-[#9f2f2f] px-8 py-12 text-center text-white relative overflow-hidden">

            <div className="absolute top-[-50px] right-[-50px] w-40 h-40 rounded-full bg-white/10 blur-2xl"></div>

            <div className="relative z-10">

              {/* ICON */}
              <div className="w-20 h-20 mx-auto rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center shadow-xl">

                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>

              </div>

              <h1 className="text-4xl font-black mt-6">
                Welcome Back
              </h1>

              <p className="mt-3 text-white/80">
                Login to continue your learning journey
              </p>

            </div>

          </div>

          {/* FORM */}
          <div className="p-8">

            {/* ERROR */}
            {error && (

              <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm">

                {error}

              </div>

            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* EMAIL */}
              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Email Address
                </label>

                <div className="relative">

                  {/* ICON */}
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">

                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12H8m0 0l4-4m-4 4l4 4"
                      />
                    </svg>

                  </div>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                    className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 outline-none focus:border-[#c94343] focus:ring-4 focus:ring-red-100 transition-all"
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Password
                </label>

                <div className="relative">

                  {/* ICON */}
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">

                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m6 4H6a2 2 0 01-2-2v-6a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2zm-8-10V7a4 4 0 118 0v4"
                      />
                    </svg>

                  </div>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                    className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 outline-none focus:border-[#c94343] focus:ring-4 focus:ring-red-100 transition-all"
                  />

                </div>

              </div>

              {/* OPTIONS */}
              <div className="flex items-center justify-between">

                <label className="flex items-center gap-2 text-sm text-gray-600">

                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-red-500"
                  />

                  Remember me

                </label>

                <button
                  type="button"
                  className="text-sm font-semibold text-[#c94343] hover:underline"
                >
                  Forgot password?
                </button>

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#c94343] to-[#9f2f2f] hover:from-[#b63a3a] hover:to-[#8f2626] text-white font-bold shadow-xl shadow-red-200 transition-all duration-300 hover:scale-[1.02]"
              >

                {loading
                  ? 'Signing In...'
                  : 'Sign In'}

              </button>

            </form>

            {/* FOOTER */}
            <div className="mt-8 text-center">

              <p className="text-gray-600">

                Don't have an account?{' '}

                <Link
                  to="/register"
                  className="font-bold text-[#c94343] hover:underline"
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