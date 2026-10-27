const Employee = require('../models/Employee');

// Every query filters by user: req.userId, so User A can never access User B's data

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { name, email, position, department, salary } = req.body;
    if (!name || !email || !position || !department)
      return res.status(400).json({ message: 'Name, email, position and department are required' });
    const employee = await Employee.create({
      name, email, position, department, salary, user: req.userId,
    });
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { name, email, position, department, salary } = req.body;
    const employee = await Employee.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { name, email, position, department, salary },
      { new: true, runValidators: true }
    );
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid request' });
  }
};
