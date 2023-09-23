import "./App.css";
import Homepage from "./pages/Homepage";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadImage from "./pages/UploadImage";

function App() {
  return (
    <>
      <div className="app-parent">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/image" element={<UploadImage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
