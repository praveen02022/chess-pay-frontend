import { ToastContainer } from 'react-toastify';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import Router from './routes';
import { AppProvider } from './provider';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import useAuthStore from '@/store/auth-store';
import { useMe } from '@/hooks/useme';
import { useAuthBootstrap } from '@/hooks/use-auth-bootstrap';

function App() {
  const { isAuthenticated } = useAuthStore();

  useAuthBootstrap();
  useMe(isAuthenticated);
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
