import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import ProtectedRoute from "./components/ProtectedRoute";
import Home from './components/pages/Home';
import Calendar from './components/pages/Calendar';
import Events from './components/pages/Events';
import DayDetails from './components/pages/DayDetails';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={
            <Calendar />
        } />
        <Route path="/event" element={
          <ProtectedRoute>
          <Events />
          </ProtectedRoute>}
         />
        <Route path="/day/:date" element={
          <ProtectedRoute>
          <DayDetails />
          </ProtectedRoute>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
