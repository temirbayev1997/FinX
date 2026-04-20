import {
 BrowserRouter,
 Routes,
 Route
} from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";
import LandingPage from "./pages/LandingPage";

import AuthPage from "./pages/auth/AuthPage";
import RegPage from "./pages/reg/RegPage";

export default function App() {
 return (
  <BrowserRouter>
   <Routes>

    <Route
     path="/"
     element={<LandingPage />}
    />

    <Route
     path="/login"
     element={<AuthPage />}
    />

    <Route
     path="/register"
     element={<RegPage />}
    />

    <Route
     path="/app/*"
     element={<AppLayout />}
    />

   </Routes>
  </BrowserRouter>
 );
}