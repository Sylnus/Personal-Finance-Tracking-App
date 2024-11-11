const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const incomeExpenseSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['inc', 'exp']
    },
    description: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: false
    },
    address2: {
        type: String,
        required: false
    },
    zipCode: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    incomeExpenses: [incomeExpenseSchema]
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;