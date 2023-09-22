import "./App.css";
import Homepage from "./pages/Homepage";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <div className="app-parent">
        <Navbar />

        <Homepage />
      </div>
    </>
  );
}

export default App;
