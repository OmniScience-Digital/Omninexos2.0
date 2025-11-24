import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { fetchAuthSession } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';
import Navbar from './components/layout/navbar';
import { AuthScreen } from './components/auth/auth_screen';
import Footer from './components/layout/footer';
import FormsLanding from './app/forms';
import Landing from './app/landing';
import Loading from './components/widgets/loading';

function Layout() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const isAuthPage = location.pathname === '/';

  // Auth check - only for protected routes
  useEffect(() => {
    if (isAuthPage) {
      setIsAuthenticated(false); // Don't check auth on login page
      return;
    }

    const checkAuth = async () => {
      try {
        const session = await fetchAuthSession();
        setIsAuthenticated(!!session.tokens);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [isAuthPage]);

  // Show loading while checking auth on protected routes
  if (!isAuthPage && isAuthenticated === null) {
    return <Loading />;
  }

  // Redirect to login if not authenticated on protected routes
  if (!isAuthPage && isAuthenticated === false) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<AuthScreen />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/forms" element={<FormsLanding />} />
      </Routes>
      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;