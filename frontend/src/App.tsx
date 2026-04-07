import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";

function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Login />} />
     
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddExpense />} />
      </Routes>
   
  );
}

export default App;