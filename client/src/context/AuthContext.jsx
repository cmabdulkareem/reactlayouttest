// AuthContext.js
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/userinfo', { withCredentials: true })
      .then(res => {
        const { role } = res.data;
        setIsLoggedIn(true);
        setIsAdmin(role === 'admin');
      })
      .catch(() => {
        setIsLoggedIn(false);
        setIsAdmin(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (role) => {
    setIsLoggedIn(true);
    setIsAdmin(role === 'admin');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export { AuthContext }
