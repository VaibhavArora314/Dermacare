import "./App.css";
import Homepage from "./pages/Homepage";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadImage from "./pages/UploadImage";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./context/AuthContext";

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
            </Routes>
          </Router>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
