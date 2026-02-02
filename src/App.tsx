import { ToastContainer } from "react-toastify";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import Router from "./routes";
import { AppProvider } from "./provider";
import { BrowserRouter } from "react-router-dom"; 
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <Header />
          <Router />
          <Footer />
        </div>
      </BrowserRouter>
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
