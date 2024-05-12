/**
 * Глобальный массив для хранения всех транзакций.
 * @type {Array<Object>}
 */
let transactions = [];

/**
 * Обрабатывает отправку формы для добавления новой транзакции.
 * Предотвращает стандартную отправку формы, извлекает данные из формы,
 * создает объект транзакции и обновляет пользовательский интерфейс и общую сумму.
 * @param {Event} event - Событие отправки формы.
 */
function addTransaction(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const fullDescription = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const descriptionWords = fullDescription.split(" ");
    const shortDescription = descriptionWords.slice(0, 4).join(" ");

    const transaction = {
        id: transactions.length + 1,
        date: date,
        amount: amount,
        category: category,
        description: shortDescription,  
        fullDescription: fullDescription 
    };

    transactions.push(transaction);
    appendTransactionToTable(transaction);
    calculateTotal();
}

/**
 * Добавляет переданную транзакцию в таблицу на странице.
 * @param {Object} transaction - Объект транзакции для добавления в таблицу.
 */
function appendTransactionToTable(transaction) {
    const table = document.getElementById('transactionTable').querySelector('tbody');
    const row = table.insertRow();
    row.className = transaction.amount >= 0 ? 'positive' : 'negative';
    row.innerHTML = `
        <td>${transaction.id}</td>
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>${transaction.description}</td>
        <td><button onclick="deleteTransaction(${transaction.id})">Удалить</button></td>
    `;

    row.onclick = () => {
        document.getElementById('detailedDescription').innerHTML = `
            id ${transaction.id} || ${transaction.date} || ${transaction.category} || ${transaction.amount} д.е <br>
            ${transaction.fullDescription}
        `;
    };
}


/**
 * Удаляет транзакцию по её ID и обновляет таблицу и общую сумму.
 * @param {number} id - ID транзакции, которую необходимо удалить.
 */
function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    document.querySelector(`#transactionTable tbody`).innerHTML = '';
    transactions.forEach(appendTransactionToTable);
    calculateTotal();
}

/**
 * Рассчитывает и отображает общую сумму всех транзакций.
 */
function calculateTotal() {
    const total = transactions.reduce((acc, t) => acc + t.amount, 0);
    document.getElementById('totalAmount').innerText = `Итого: ${total.toFixed(2)}`;
}

document.getElementById('transactionForm').addEventListener('submit', addTransaction);
