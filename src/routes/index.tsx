import { Routes, Route } from "react-router-dom";
import Home from "@/features/home/pages";
import Contact from "@/features/contact/pages";
import Tournaments from "@/features/tournaments/pages";
import PublicRoute from "./public-route";

const Router = () => (
  <Routes>
    <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
    <Route path="/contact" element={<PublicRoute><Contact /></PublicRoute>} />
    <Route path="/tournaments/*" element={<PublicRoute><Tournaments /></PublicRoute>} />
  </Routes>
);

export default Router;
