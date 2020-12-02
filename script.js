window.onload = function(){
    this.fetchExpences(); // line 45
    this.updateValues(); // line 67
}

var form = document.getElementById('form');
form.addEventListener('submit',submitForm);

function submitForm(e){

    var d=new Date();
    const getId = d.getTime();

    const itemName = document.getElementById('text-name').value;
    const itemAmount = document.getElementById('amount').value;

    if(!validateForm(itemName, itemAmount)){
        return false;
    }

    var expense = {
        id:getId,
        item_name:itemName,
        item_amount:itemAmount
    }

    if(localStorage.getItem('expenses')===null){
        var expenses = [];
        expenses.push(expense);
        localStorage.setItem('expenses',JSON.stringify(expenses));
    }else{
        var expenses = JSON.parse(localStorage.getItem('expenses'));
        expenses.push(expense);
        localStorage.setItem('expenses',JSON.stringify(expenses));

    }
    form.reset();
    fetchExpences();
    updateValues();
    e.preventDefault();
}

// Fetch the Expenses Data from LocalStorage

function fetchExpences(){
    const list = document.getElementById('list');
    const transactions = JSON.parse(localStorage.getItem('expenses'));

    list.innerHTML = ' ';
    for(var i=0;i<transactions.length;i++){
        var id = transactions[i].id;
        var item = transactions[i].item_name;
        var amount = transactions[i].item_amount;
        //console.log(amount);
        var sign = amount>0?'+':'';
        var plus_minus = (sign=='+')?'plus':'minus';

        list.innerHTML +=  `<li class="${plus_minus}">
                                ${item} <span>${sign}${amount}</span>
                                <button class="delete-btn" onclick="deleteItem(${id})">x</button>
                            </li>`;
    }
}

// Update Value of Income, Expense and Total

function updateValues(){
    var total = document.getElementById('total-currency');
    var income = document.getElementById('income-currency');
    var expenses = document.getElementById('expense-currency');

    let transactions = JSON.parse(localStorage.getItem('expenses'));
    
    // Total Balance
    let amount = transactions.map(e=>parseInt(e.item_amount));
    let totalBalance = amount.reduce((acc,cuv) => (acc += cuv),0).toFixed(2);
    total.innerHTML = `<i class="fa fa-rupee"></i>${totalBalance}`;

    // Income Balance
    let incomeAmount = transactions.map(e=>parseInt(e.item_amount)).filter(e=>e>0);
    let totalIncome = incomeAmount.reduce((acc,cuv) => (acc += cuv),0).toFixed(2);
    income.innerHTML = `<i class="fa fa-rupee"></i>${totalIncome}`;

    // Expense Balance
    let expenseAmount = transactions.map(e=>parseInt(e.item_amount)).filter(e=>e<0);
    let totalExpense = ((expenseAmount.reduce((acc,cuv) => (acc += cuv),0))*-1).toFixed(2);
    expenses.innerHTML = `<i class="fa fa-rupee"></i>${totalExpense}`;

}

// Delete a Item
function deleteItem(id){
    let expenses = JSON.parse(localStorage.getItem('expenses'));
   
    for(let i=0;i<expenses.length;i++){
        if(expenses[i].id == id){
            expenses.splice(i,1);
        }
    }

    localStorage.setItem('expenses',JSON.stringify(expenses))
    fetchExpences();
    updateValues()
}

// Form Validation

function validateForm(item, amount){
    if(!item || !amount){
      alert('Please fill Text and Amount');
      return false;
    }

    return true;
}
