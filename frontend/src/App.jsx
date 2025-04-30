import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import AddHabit from './Componets/AddHabit';
import HabitHistory from './Componets/HabitHistory';

function App() {
  return (
    <BrowserRouter>
      {/* Navigation Bar */}
      <nav className="bg-blue-500 p-4 text-white flex gap-4">
        
        <Link to="/add" className="hover:underline">Add Habit</Link>
        <Link to="/history" className="hover:underline">Habit History</Link>
       
      </nav>

      {/* Routes */}
      <Routes>
        
        <Route path="/add" element={<AddHabit />} />
        <Route path="/history" element={<HabitHistory />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
