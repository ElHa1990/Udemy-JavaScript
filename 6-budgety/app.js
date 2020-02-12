/**************************
BUDGETY APP! :)
*************************/

/* Lecture 77: implementing the module pattern

Topics: 
- How to use the module pattern
- private and public data & seperation concerns

*/

// DOMstrings

function createElement(type, id, className, text, parent) {
    var element = document.createElement(type);
    element.id = id;
    element.className = className;
    element.innerHTML = text;
    parent.appendChild(element);
    return element;
}

var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        overallContainer: '.container',
        dateLabel: '.budget__title--month'
    };

// Budget controller module

var budgetController = (function () {
    
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],  
            inc: []
        },
        
        totals: {
            exp: 0,
            inc: 0
        },

        budget: 0,
        percentage: -1

    };


    var calculateTotal = function(type) {
        var sum = 0;

        data.allItems[type].forEach(function(current) {
            sum = sum + current.value;
        });
        data.totals[type] = sum;
    };

    return {
        addItem: function (type, description, value) {
            var newItem;
            var ID = 0; 

            // create new id
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // create new item based on inc or exp.
            if (type === 'exp') {
                newItem = new Expense(ID, description, value);
            } else if (type === 'inc') {
                newItem = new Income(ID, description, value);
            };
            
            // push it into data structure
            data.allItems[type].push(newItem); 
            // console.log(data);
            //return new element
            return newItem;
        },

        deleteItem: function (type, id) {
            var allIDs, index;
            
            console.log(type, data.allItems[type], data.allItems)
            
            allIDs = data.allItems[type].map(function(current) {
                return current.id;
            });
            console.log(allIDs);

            index = allIDs.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }


        },
        
        calculateBudget: function () {

            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // calculate budget. income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate % expenses of income
            
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            };
            
        },

        getbudget: function(){
            return {
                budget: data.budget,
                totalIncome: data.totals.inc,
                totalExpenses: data.totals.exp,
                percentage: data.percentage,
                allExpenses: data.allItems.exp
            };
        },

        testing: function() {
            console.log(data);
        }
    }
}) ();

// UI controller module
var UIController = function () {
    var expenseIndex = 0,
        incomeIndex = 0;
 
    return {
        getInput: function() {

            return {
                type: document.querySelector(DOMstrings.inputType).value, // + of -
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value) 
            }      
        },
        createField: function(input) {
            
            // Incomes
            if (input.type === 'inc') {
                var incomeDiv = createElement('div','income-' + incomeIndex, 'item clearfix', '', document.querySelector('.income__list'));
                var itemDescriptionDivInc = createElement('div', '', 'item__description', input.description, incomeDiv);
                var rightClearFixDivInc = createElement('div', '', 'right clearfix', '' , incomeDiv);    
                var itemValueDivInc = createElement('div', '', 'item__value', this.formatNumber(input.value, input.type), rightClearFixDivInc);
                var itemDeleteDivInc = createElement('div', '', 'item__delete', '', rightClearFixDivInc);
                var buttonItemDeleteDivInc = createElement('div', '', 'item__delete--btn', '', itemDeleteDivInc);
                var iElementDivInc = createElement('div', '', 'ion-ios-close-outline', '', itemDeleteDivInc);

                incomeIndex ++

            } else {
                var expenseDiv = createElement('div', 'expense-' + expenseIndex, 'item clearfix', '', document.querySelector('.expenses__list'));
                var itemDescriptionDivExp = createElement('div', '', 'item__description', input.description, expenseDiv); 
                var rightClearFixDivExp = createElement('div', '', 'right clearfix', '' , expenseDiv);
                var itemValueDivExp = createElement('div', '', 'item__value', this.formatNumber(input.value, input.type), rightClearFixDivExp);
                var itemPercentageDivExp = createElement('div', 'item__percentage-' + expenseIndex, 'item__percentage','', rightClearFixDivExp);
                var itemDeleteDivExp = createElement('div', '', 'item__delete', '', rightClearFixDivExp)
                var buttonItemDeleteDivExp = createElement('div', '', 'item__delete--btn', '', itemDeleteDivExp);
                var iElementDivExp = createElement('div', '', 'ion-ios-close-outline', '', itemDeleteDivExp);

                expenseIndex++;
            };      
        },

        deleteListItem: function (deleteID) {
            var elementDelete = document.getElementById(deleteID);
            elementDelete.parentNode.removeChild(elementDelete);
        },


        clearField: function() {
            var fields, fieldsArray;
            
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(function(current) {
                current.value = "";
                
            });
            
            fieldsArray[0].focus();
        },

        displayBudget: function (object) {
            document.querySelector(DOMstrings.budgetLabel).textContent = object.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = object.totalIncome;
            document.querySelector(DOMstrings.expensesLabel).textContent = object.totalExpenses;
         
        
            if (object.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = object.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '';
            }            
            
            //console.log(object);

            object.allExpenses.forEach(function(expense) {
                console.log(object, expense);
                expense.percentage = Math.round((expense.value / object.totalIncome) * 100);
                document.getElementById("item__percentage-" + expense.id).innerHTML = expense.percentage;
                
            })
        },

        displayDate: function() {
            var now, year, month, months;
            
            now = new Date();

            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();

            year = now.getFullYear();
            //console.log(month, year)
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
      
        },

        changeType: function() {
            
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' + 
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue);
               
            console.log(fields);
            var input = UIController.getInput(); 
            var color = 'red';
            if(input.type === 'inc') {
                color = '#28B9B5';
            } 
            for(var i = 0 ; i< fields.length; i++) {
                fields[i].style.borderColor = color;  
            }

            //set the button
            document.querySelectorAll(DOMstrings.inputButton)[0].style.color = color;
        },

        formatNumber: function (number, type) {
            var number, numberSplit, integer, decimals;
            /* 
            + or - before the number
            two decimals
            a comma separating the thousands

            // 55000 --> 55.000,00

            */

            // 55.000,00

         //   number = Math.abs(number);
            number = number.toFixed(2);   // afronden op 2 decimalen, gescheiden met een punt. = string
            console.log(number);

            numberSplit = number.split('.')     // getal splitsen na de punt. Is array met sub strings
            console.log(numberSplit);
            
            integer = numberSplit[0] + "";
            console.log(integer);
            console.log(integer.length);

            decimals = numberSplit[1];
            var newInteger = "";
            
            if (integer.length <= 3) {
                newInteger = integer 
            } else if (integer.length > 3 && integer.length <= 6) {
                newInteger = integer.substring(0, integer.length - 3) + '.' + integer.substring(integer.length - 3, integer.length); 
                console.log(newInteger); 
            } else {
                newInteger = integer.substring(0, integer.length - 6) + '.' + integer.substring(integer.length - 6, integer.length - 3) + '.' + integer.substring(integer.length - 3, integer.length); 
            }
               
            if (type === 'exp') {
                sign = '-'
            } else {
                sign = '+'
            };
            
            return sign + ' ' + newInteger + "," + decimals;
        },
        
    };    
    
}();

// global app module
var controller = (function(budgetController, UIController) {
    
    var setupEventListeners = function () {
        document.querySelector('.add__btn').addEventListener('click', controlAddItem);
        document.addEventListener('keypress', function(eventEnter) {

            if (eventEnter.keyCode === 13) {
            controlAddItem();
            }   
        });

        document.querySelector(DOMstrings.overallContainer).addEventListener('click', controlDeleteItem);

        document.querySelector(DOMstrings.inputType).addEventListener('change', UIController.changeType);



    };

    var controlDeleteItem = function (eventClick) {
        var itemID, splitID, type, ID;
        
        console.log(eventClick);
        itemID = eventClick.target.parentNode.parentNode.parentNode.id;
        console.log(itemID)
        if (itemID) {
            splitID = itemID.split('-');
            type = splitID[0].substring(0,3);
            ID = parseInt(splitID[1]);

            // delete item from data structure
            budgetController.deleteItem(type, ID);

            // delete item from user interface
            UIController.deleteListItem(itemID);

            // update and show new budget
            updateBudget();
        };
    };

    var updateBudget = function() {
        // 1. calculate the budget
        budgetController.calculateBudget();

        // 2. return the bduget 
        var budgetReturn = budgetController.getbudget();

        // 3. display the budget
        // console.log(budgetReturn);
        UIController.displayBudget(budgetReturn);
    };

    var controlAddItem = function () {       
            
        var input, newItem;

        // 1. get the field input data
        input = UIController.getInput();
        
        if (input.description !== "" &&  !isNaN(input.value) && input.value > 0) {
            // 2. add item to the budget controller
            newItem = budgetController.addItem(input.type, input.description, input.value);

            // 3. add the new item to the UI + clear field
            UIController.createField(input);
            UIController.clearField();
                
            // 4. Calculate and update budget
            updateBudget();
        };
       
    };

    return {
        init: function() {
            setupEventListeners();
            UIController.displayDate();
        }
    };
    
  
}) (budgetController, UIController);

controller.init();
































