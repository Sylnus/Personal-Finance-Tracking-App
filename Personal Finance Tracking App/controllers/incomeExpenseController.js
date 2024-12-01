const User = require('../models/userModel');

exports.addIncomeExpense = async (req, res) => {
    try {
        const { email, type, description, value, category } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.incomeExpenses.push({ type, description, value, category });
        await user.save();
        res.status(200).json({ message: 'Income/Expense added successfully', incomeExpenses: user.incomeExpenses });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

exports.getIncomeExpenses = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ incomeExpenses: user.incomeExpenses });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

exports.deleteIncomeExpense = async (req, res) => {
    try {
        const { email } = req.query;
        const { incomeExpenseId } = req.params;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const incomeExpense = user.incomeExpenses.id(incomeExpenseId);
        if (!incomeExpense) {
            return res.status(404).json({ message: 'Income/Expense item not found' });
        }
        user.incomeExpenses.pull(incomeExpenseId);
        await user.save();
        res.status(200).json({ message: 'Income/Expense deleted successfully', incomeExpenses: user.incomeExpenses });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

exports.bulkAddIncomeExpense = async (req, res) => {
    const { email, income, expenses } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        for (const item of income) {
            user.incomeExpenses.push({ type: 'inc', ...item });
        }
        for (const item of expenses) {
            user.incomeExpenses.push({ type: 'exp', ...item });
        }
        await user.save();
        res.status(200).json({ message: 'Data saved successfully!', incomeExpenses: user.incomeExpenses });
    } catch (error) {
        res.status(500).json({ message: 'Error saving data', error });
    }
};