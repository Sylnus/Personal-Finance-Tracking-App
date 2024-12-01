const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const incomeExpenseController = require('../controllers/incomeExpenseController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/user/update', userController.updateUser);
router.get('/user', userController.getUserByEmail);

router.post('/income-expense', incomeExpenseController.addIncomeExpense);
router.get('/income-expense', incomeExpenseController.getIncomeExpenses);
router.delete('/income-expense/:incomeExpenseId', incomeExpenseController.deleteIncomeExpense);
router.post('/income-expense/bulk', incomeExpenseController.bulkAddIncomeExpense);

module.exports = router;