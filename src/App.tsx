import { ToastContainer } from 'react-toastify';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import Router from './routes';
import { AppProvider } from './provider';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import useAuthStore from '@/store/auth-store';
import { useEffect } from 'react';

function App() {
  const bootstrapAuth = useAuthStore((s) => s.bootstrapAuth);

  useEffect(() => {
    bootstrapAuth();
  }, []);

  return (
    <AppProvider>
      <div className="min-h-screen">
        <Header />
        <Router />
        <Footer />
      </div>
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
