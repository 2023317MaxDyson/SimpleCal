import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Calendar from './components/pages/Calendar';
import Events from './components/pages/Events';
function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Calendar/>} />
      <Route path="/event" element={<Events />} />
     </Routes>
    </BrowserRouter>
  );
}

export default App;
