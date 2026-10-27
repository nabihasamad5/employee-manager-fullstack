const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    position: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    salary: { type: Number, default: 0, min: 0 },
    // Data isolation: every employee record belongs to one logged-in user
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);
