let income = 0;
let expense = 0;
let transactions = [];

function router() {

    const route =
        location.hash.replace("#", "") ||
        "dashboard";

    const app =
        document.getElementById("app");

    if(route === "dashboard") {

    app.innerHTML = `
        <div class="container">

            <h2>Dashboard</h2>

            <div class="card-container">

                <div class="card">
                    <h3>Total Income</h3>
                    <p class="income">
                        Rs.${income}
                    </p>
                </div>

                <div class="card">
                    <h3>Total Expense</h3>
                    <p class="expense">
                        Rs.${expense}
                    </p>
                </div>

                <div class="card">
                    <h3>Balance</h3>
                    <p class="balance">
                        Rs.${income-expense}
                    </p>
                </div>

            </div>

        </div>
    `;
}

    if(route === "transactions") {

        app.innerHTML = `
            <div class="container">

                <h2>Add Transaction</h2>

                <input id="desc"
                placeholder="Description">

                <input id="amount"
                type="number"
                placeholder="Amount">

                <select id="type">
                <option value="income">
                        Income
                    </option>

                    <option value="expense">
                        Expense
                    </option>
                    </select>
                <select id="category">
                    
                    <option value="Food">
        Food
    </option>

    <option value="Travel">
        Travel
    </option>

    <option value="Shopping">
        Shopping
    </option>

    <option value="Bills">
        Bills
    </option>

    <option value="Salary">
        Salary
    </option>
                </select>

                <button onclick="addTransaction()">
                    Add
                </button>

                <ul id="list">
                    ${
                    transactions.map(t => `
                        <li>
                        ${t.desc}
-Rs.${t.amount}(${t.type})${t.category}
                        </li>
                    `).join("")
                    }
                </ul>

            </div>
        `;
    }

    if(route === "reports") {

    app.innerHTML = `
        <div class="container">

            <h2>Financial Report</h2>

            <p>Total Income: Rs.${income}</p>

            <p>Total Expense: Rs.${expense}</p>

            <p>Savings: Rs.${income - expense}</p>

            <div style="width:250px; height:250px; margin:auto;">
    <canvas id="financeChart"></canvas>
</div>

        </div>
    `;

    const ctx =
        document.getElementById("financeChart");

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Income", "Expense"],
            datasets: [{
                data: [income, expense],
                backgroundColor: [
                    "#4CAF50",
                    "#F44336"
                ],
                borderWidth: 1
            }]
        },
        options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "bottom"
        }
    }
}
    });
}
}

function addTransaction() {

    const desc =
        document.getElementById("desc").value;

    const amount =
        Number(
            document.getElementById("amount").value
        );

    const type =
        document.getElementById("type").value;
    const category =
        document.getElementById("category").value;

    if(!desc || amount <= 0) {

        alert("Enter valid data");
        return;
    }

    transactions.push({
    desc,
    amount,
    type,
    category
});

    if(type === "income") {
        income += amount;
    }
    else {
        expense += amount;
    }

    router();
}

window.addEventListener(
    "hashchange",
    router
);
function toggleTheme(){
    document.body.classList.toggle("dark");
}

router();