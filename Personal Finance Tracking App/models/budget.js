var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
};

var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
};

let data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : {
    allItems: {
        exp: [],
        inc: []
    },
    total: {
        exp: 0,
        inc: 0
    },
    budget: 0,
    percentage: -1
};

var calculateTotal = function (type) {
    var sum = 0;
    data.allItems[type].forEach(function (curr) {
        sum += curr.value;
    });
    data.total[type] = sum;
};

var budgetController = {
    addItem: function (type, des, val) {
        var newItem, ID;
        if (data.allItems[type].length > 0) {
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        } else {
            ID = 0;
        }
        if (type === 'exp') {
            newItem = new Expense(ID, des, val);
        } else if (type === 'inc') {
            newItem = new Income(ID, des, val);
        }
        data.allItems[type].push(newItem);
        budgetController.persistData();

        return newItem;
    },

    calculateBudget: function () {
        calculateTotal('exp');
        calculateTotal('inc');
        data.budget = data.total.inc - data.total.exp;
        if (data.total.inc > 0) {
            data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
        } else {
            data.percentage = -1;
        }
    },

    getBudget: function () {
        return {
            budget: data.budget,
            totalInc: data.total.inc,
            totalExp: data.total.exp,
            percentage: data.percentage
        };
    },

    persistData: function () {
        localStorage.setItem('data', JSON.stringify(data));
    },

    readStorage: function () {
        return JSON.parse(localStorage.getItem('data')) || {
            allItems: {
                exp: [],
                inc: []
            },
            total: {
                exp: 0,
                inc: 0
            },
            budget: 0,
            percentage: -1
        };
    }
};