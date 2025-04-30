import { useState } from 'react';
import axios from 'axios';

const AddHabit = () => {
  const [habitName, setHabitName] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/createHabit", { habitName, createdAt })
      .then(result => {
        console.log(result);
        setMessage("Habit added successfully!");
        setError('');
        setHabitName('');
        setCreatedAt('');
        setTimeout(() => setMessage(''), 3000); // auto-clear message after 3s
      })
      .catch(err => {
        console.log(err);
        setError("Failed to add habit.");
        setMessage('');
        setTimeout(() => setError(''), 3000); // auto-clear error after 3s
      });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Add New Habit</h1>

      {/* Notification messages */}
      {message && <div className="bg-green-100 text-green-700 p-2 rounded mb-3">{message}</div>}
      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-3">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="e.g. Exercise"
          className="border p-2 rounded w-full"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          required
        />
        <input
          type="date"
          className="border p-2 rounded w-full"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Add Habit</button>
      </form>
    </div>
  );
};

export default AddHabit;
