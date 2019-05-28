
// ************  DECLARING VARIABLE **************

const descInput = document.querySelector('.description-input');
const amountInput = document.querySelector('.amount-input');
const addBtn = document.querySelector('button');
const clearBtn = document.querySelector('.clear-button');
let accBalance = 0;
let transactions = [];

// ************  FUNCTIONS **************

// Adding array to Local Storage
function arrayToStorage(arr) {
    let arrJSON = JSON.stringify(arr, undefined, 2);
    localStorage.setItem('transactions', arrJSON);
}

// Getting array from Local Storage
function getFromStorage() {
    if (localStorage.getItem('transactions')) transactions = JSON.parse(localStorage.getItem('transactions'))
}

// Creating a transaction array
function createTransaction() {
    if (descInput.value != '' && amountInput.value != 0) {
    let checkbox = document.querySelector('.onoffswitch-checkbox');
    let transaction;
    if (!checkbox.checked) {
        transaction = [descInput.value, Number(amountInput.value) * -1, currentDate()];
    } else {
        transaction = [descInput.value, Number(amountInput.value), currentDate()];
    };  
    transactions.push(transaction);
    arrayToStorage(transactions);
} else {
    alert('Please, enter the transaction description and amount!');
}
}

// Rendering the transactions
function renderTransactions(transactions) {


    // Rendering the account balance 

    document.querySelector('.balance-container').innerHTML = '';
    let balanceInfo = document.createElement('div');
    balanceInfo.className = 'balance';
    let balanceAmount = (calcBalance()).toLocaleString();
    if (calcBalance() >= 0) {
        balanceInfo.innerHTML = `Account Balance: <span class="positive">${balanceAmount}</span> €`;
    } else {
        balanceInfo.innerHTML = `Account Balance: <span class="negative">${balanceAmount}</span> €`;
    };
    document.querySelector('.balance-container').appendChild(balanceInfo);



    // Creating transaction boxes

    transactions.forEach(function(transaction, index) {
        let transactionBox = document.createElement('div');
        transactionBox.id = index;
        transactionBox.className = 'transaction ';
        if (transaction[1] > 0) {
            transactionBox.innerHTML = `
                                    <div class="trans-description">${transaction[0]}</div>
                                    <div class="trans-date">${transaction[2]}</div>
                                    <div class="trans-amount green">${transaction[1].toLocaleString()} €</div>
                                    <i class="far fa-trash-alt delete-icon"></i>`;
        }
        else {
            transactionBox.innerHTML = `
                                    <div class="trans-description">${transaction[0]}</div>
                                    <div class="trans-date">${transaction[2]}</div>
                                    <div class="trans-amount">${transaction[1].toLocaleString()} €</div>
                                    <i class="far fa-trash-alt delete-icon"></i>`};
        
    document.querySelector('.balance-container').appendChild(transactionBox);    
})
}


// Getting the current date
function currentDate() {
    var currentDate = new Date();
    day = "00" + currentDate.getDate();
    day = day.substr(-2);
    month = "00" + (currentDate.getMonth() + 1);
    month = month.substr(-2);
    year = "0000" + currentDate.getFullYear();
    year = year.substr(-4);
    return `${day}/${month}/${year}`
}

// Calculating the account balance
function calcBalance() {
    let balanceSum = 0;
    transactions.forEach(function(transaction) {
        balanceSum += transaction[1];
    })
    return balanceSum;
}

// Clearing Local Storage
function clearStorage() {
    localStorage.clear();
    transactions = [];
    renderTransactions(transactions);
}

// Deleting a transaction
function deleteElementFromArray(arr, index) {
    arr.splice(index, 1);
    arrayToStorage(arr);
    renderTransactions(transactions);
    assignEventListenerToDeleteIcons();
}

// Assigning an event listener to Delete Icons
function assignEventListenerToDeleteIcons(){

    let deleteIcon = document.querySelectorAll('.delete-icon');
    deleteIcon.forEach(function(el){
            el.addEventListener('click', e => {
                deleteElementFromArray(transactions, e.currentTarget.parentNode.id);
            });
    });    

}
// Initializition
function init() {
    getFromStorage();
    renderTransactions(transactions);
    }


// ************  EVENT LISTENERS **************

clearBtn.addEventListener('click', e => {
    clearStorage();
})

addBtn.addEventListener('click', e => {
    createTransaction();
    renderTransactions(transactions);
    assignEventListenerToDeleteIcons();
})



// ************  EXECUTING **************


init();
