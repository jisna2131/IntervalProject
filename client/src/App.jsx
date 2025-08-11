import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';    // Make sure filename case matches
import RegisterPage from './pages/Regisrerpage';
import Totalemployees from './pages/Totalemployees';
import AbsentEmployees from './pages/AbsentEmployees'
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/register" element={<RegisterPage/>} />
         <Route path="/totalemployees" element={<Totalemployees/>} />
          <Route path="/absentemployees" element={<AbsentEmployees/>} />

      </Routes>
    </>
  );
}

export default App;
