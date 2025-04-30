const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  habitName: String,
  createdAt: { type: String, default: () => new Date().toISOString().split('T')[0] }, // e.g. "2025-04-23"
  completedDates: [String], // Array to store done dates, e.g. ["2025-04-23"]
});

const UserModule = mongoose.model('users', UserSchema);

module.exports = UserModule;
