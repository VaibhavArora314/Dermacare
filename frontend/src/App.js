import "./App.css";
import Homepage from "./pages/Homepage";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadImage from "./pages/UploadImage";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./context/AuthContext";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";
import ReportPage from "./pages/ReportPage";
import DiseasePage from "./pages/DiseasePage";

function App() {
  return (
    <>
      <div className="app-parent">
        <AuthProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/image" element={<UploadImage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/contact-us" element={<ContactPage />} />
              <Route path="/report/:id" element={<ReportPage />} />
              <Route path="/disease-search" element={<DiseasePage />}></Route>
            </Routes>
          </Router>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
