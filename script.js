document.addEventListener("DOMContentLoaded",() => {

    const expenseForm = document.getElementById("expense-form")
    const expenseName = document.getElementById("expense-name")
    const expenseAmount = document.getElementById("expense-amount")
    const expenseListDisplay = document.getElementById("expense-list")
    const totalAmountDisplay = document.getElementById("total-amount")

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let totalAmount = calutateTotal();

    renderExpenses()

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const name = expenseName.value.trim()
        const amount =  parseFloat(expenseAmount.value.trim())

        if(name !== "" && !isNaN(amount) && amount>0 ){
            const newExpense = {
                id: Date.now(),
                name: name,
                amount:amount,
            }

            expenses.push(newExpense);
            saveExpensesToLocal();
            renderExpenses();
            updateTotal();

            //clear input
            expenseName.value = ""
            expenseAmount.value = ""
        }

    })

    function renderExpenses(){
        expenseListDisplay.innerHTML = ''

        expenses.forEach(expense => {
            const li = document.createElement("li")
            li.innerHTML = `${expense.name} - $${expense.amount}
            <button data-id = " ${expense.id} ">Delete</button>`

            expenseListDisplay.appendChild(li)
        })
    }

    function calutateTotal(){
        return expenses.reduce((sum,expense) => sum + expense.amount,0)
    }

    function updateTotal(){
        totalAmount = calutateTotal();
        totalAmountDisplay.innerText = totalAmount.toFixed(2);
    }

    function saveExpensesToLocal(){
        localStorage.setItem("expenses",JSON.stringify(expenses))
    }

    expenseListDisplay.addEventListener("click",(e) =>{
        if(e.target.tagName === "BUTTON"){
            const expenseId = parseInt(e.target.getAttribute("data-id"))

            expenses = expenses.filter(expense => expense.id != expenseId)

            saveExpensesToLocal()
            renderExpenses()
            updateTotal()
        }
    })
    updateTotal()

})