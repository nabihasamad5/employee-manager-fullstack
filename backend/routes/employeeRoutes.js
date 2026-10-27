const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  getEmployees, createEmployee, updateEmployee, deleteEmployee,
} = require('../controllers/employeeController');

router.use(auth); // all routes in this file are protected

router.get('/', getEmployees);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
