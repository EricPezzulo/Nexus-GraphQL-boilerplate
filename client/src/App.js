import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PersonPage from "./components/PersonPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/person/:userId" element={<PersonPage />} />
      </Routes>
    </Router>
  );
}

export default App;
