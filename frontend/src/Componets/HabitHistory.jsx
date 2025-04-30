import { useEffect, useState } from 'react';
import axios from 'axios';

const HabitHistory = () => {
  const [habits, setHabits] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const result = await axios.get("http://localhost:3001/getHabit");
      setHabits(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleDone = async (habitId, isDoneToday) => {
    try {
      await axios.post("http://localhost:3001/toggleDone", {
        habitId,
        date: today,
        remove: isDoneToday
      });
      fetchHabits();
    } catch (err) {
      alert(err.response?.data?.message || "Error toggling done status");
    }
  };

  const deleteHabit = (id) => {
    axios.delete("http://localhost:3001/deleteHabis/" + id)
      .then(result => {
        console.log(result);
        setMessage("Habit deleted successfully!");
        setError('');
        fetchHabits();
        setTimeout(() => setMessage(''), 3000);
      })
      .catch(error => {
        console.log(error);
        setError("Failed to delete habit.");
        setMessage('');
        setTimeout(() => setError(''), 3000);
      });
  };

  const completedHabits = habits.filter(habit =>
    habit.completedDates?.includes(today)
  );

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Habit History</h1>

      {/* Notifications */}
      {message && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{message}</div>}
      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}

      {/* Completed Today Section */}
      {completedHabits.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-green-700 mb-2">Completed Today</h2>
          <ul className="space-y-2">
            {completedHabits.map(habit => (
              <li key={habit._id} className="bg-green-100 p-2 rounded">
                ✅ {habit.habitName}
              </li>
            ))}
          </ul>
        </div>
      )}

      {habits.length === 0 ? (
        <p className="text-gray-500">No habits found.</p>
      ) : (
        <ul className="space-y-3">
          {habits.map((habit) => {
            const isDoneToday = habit.completedDates?.includes(today);
            return (
              <li key={habit._id} className="border p-3 rounded shadow">
                <div className="font-medium text-lg">{habit.habitName}</div>
                <div className="text-sm text-gray-600">
                  Created At: {habit.createdAt}
                </div>
                <div className={`mt-2 font-semibold ${isDoneToday ? 'text-green-600' : 'text-red-600'}`}>
                  {isDoneToday ? "Done Today" : "Not Done Today"}
                </div>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => toggleDone(habit._id, isDoneToday)}
                    className={`px-3 py-1 rounded ${
                      isDoneToday ? 'bg-red-600' : 'bg-blue-600'
                    } text-white`}
                  >
                    {isDoneToday ? "Mark as Not Done" : "Mark as Done"}
                  </button>
                  <button
                    onClick={() => deleteHabit(habit._id)}
                    className="px-3 py-1 rounded bg-gray-600 text-white"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default HabitHistory;
