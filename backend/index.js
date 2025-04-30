const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModule = require('./components/Habit'); // This is your Habit model


const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Habit', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.delete("/deleteHabis/:id",(req , res) =>{
    const id = req.params.id;
    UserModule.findByIdAndDelete({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))

})

// Get all habits
app.get('/getHabit', (req, res) => {
  UserModule.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

// Mark a habit as done
app.post('/toggleDone', async (req, res) => {
    const { habitId, date, remove } = req.body;
  
    try {
      const habit = await UserModule.findById(habitId);
      if (!habit) {
        return res.status(404).json({ message: 'Habit not found' });
      }
  
      if (remove) {
        habit.completedDates = habit.completedDates.filter(d => d !== date);
      } else {
        if (!habit.completedDates.includes(date)) {
          habit.completedDates.push(date);
        }
      }
  
      await habit.save();
      res.status(200).json({ message: 'Status updated' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

// Create a new habit
app.post('/createHabit', (req, res) => {
  UserModule.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

// Start server
app.listen(3001, () => {
  console.log('Server is Running on port 3001');
});
