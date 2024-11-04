const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ firstName, lastName, email, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { email, oldPassword, newPassword, ...updatedFields } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (oldPassword && !(await user.comparePassword(oldPassword))) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        if (newPassword) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            updatedFields.password = hashedPassword;
        }
        Object.keys(updatedFields).forEach(key => {
            user[key] = updatedFields[key];
        });

        await user.save();

        res.status(200).json({ message: 'User information updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getUserByEmail = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};