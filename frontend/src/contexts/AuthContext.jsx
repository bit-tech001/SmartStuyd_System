import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      api.get('/auth/me')
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          logout();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', {
      email,
      password,
    });

    localStorage.setItem('token', res.data.token);

    if (res.data.user) {
      localStorage.setItem(
        'user',
        JSON.stringify(res.data.user)
      );

      setUser(res.data.user);
    }

    api.defaults.headers.common['Authorization'] =
      `Bearer ${res.data.token}`;

    return res.data;
  };

  const register = async (name, email, password, role) => {
    console.log('Registering with role:', role);

    const res = await api.post('/auth/register', {
      name,
      email,
      password,
      role,
    });

    console.log('Register Response:', res.data);

    localStorage.setItem('token', res.data.token);

    api.defaults.headers.common['Authorization'] =
      `Bearer ${res.data.token}`;

    if (res.data.user) {
      localStorage.setItem(
        'user',
        JSON.stringify(res.data.user)
      );

      setUser(res.data.user);
    }

    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    delete api.defaults.headers.common['Authorization'];

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};