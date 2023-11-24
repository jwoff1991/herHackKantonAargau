import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideSignIn from "./components/signin";
import Dashboard from "./components/dashboard";
import './App.css'
import CompanySearch from "./components/search";

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SideSignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<CompanySearch />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
