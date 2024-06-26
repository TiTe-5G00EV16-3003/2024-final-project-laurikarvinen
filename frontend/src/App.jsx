import { useCallback, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import AddItem from './items/pages/AddItem';
import Items from './items/pages/Items';
import MainNavigation from './shared/navigation/MainNavigation';
import Authenticate from './users/pages/Authenticate';
import Users from './users/pages/Users';

import { AuthContext } from './shared/context/auth-context';

import './App.css';

const queryClient = new QueryClient();
let logoutTimer;

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(false);

  const login = useCallback((uid, token, expiration) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expiration || new Date(new Date().getTime() + 60 * 60 * 1000);
    setTokenExpirationDate(tokenExpirationDate);
    
    localStorage.setItem('userData', JSON.stringify({ userId: uid, token, expiration: tokenExpirationDate.toISOString() }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationDate, logout]);

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Items />} />
        <Route path="/items/new" element={<AddItem />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Items />} />
        <Route path="/auth" element={<Authenticate />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token, userId, login, logout }}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <MainNavigation />
          <main>
            {routes}
          </main>
        </Router>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

export default App;

