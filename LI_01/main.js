const transactions = require('./transaction.json');

class Transaction {
    constructor({ transaction_id, transaction_date, transaction_amount, transaction_type, transaction_description, merchant_name, card_type }) {
        this.transaction_id = transaction_id;
        this.transaction_date = transaction_date;
        this.transaction_amount = transaction_amount;
        this.transaction_type = transaction_type;
        this.transaction_description = transaction_description;
        this.merchant_name = merchant_name;
        this.card_type = card_type;
    }

    /**
     * Возвращает строковое представление транзакции в формате JSON.
     * @return {string} Строковое представление объекта транзакции в формате JSON.
     */
    string() {
        return JSON.stringify({
            transaction_id: this.transaction_id,
            transaction_date: this.transaction_date,
            transaction_amount: this.transaction_amount,
            transaction_type: this.transaction_type,
            transaction_description: this.transaction_description,
            merchant_name: this.merchant_name,
            card_type: this.card_type
        });
    }
}

class TransactionAnalyzer {
    /**
     * Конструктор класса TransactionAnalyzer.
     * @param {Array} transactions - Исходный массив транзакций.
     */
    constructor(transactions) {
        this.transactions = transactions;
    }

    /**
     * Добавляет новую транзакцию в список транзакций.
     * @param {Object} transaction - Объект транзакции, который необходимо добавить.
     */
    addTransaction(transaction) {
        this.transactions.push(transaction);
    }

    /**
     * Возвращает список всех транзакций.
     * @return {Array} Массив всех транзакций.
     */
    getAllTransactions() {
        return this.transactions;
    }

    /**
     * Возвращает уникальные типы транзакций.
     * @return {Array} Массив уникальных типов транзакций.
     */
    getUniqueTransactionType() {
        const uniqueTypes = new Set();
        this.transactions.forEach(transaction => uniqueTypes.add(transaction.transaction_type));
        return Array.from(uniqueTypes);
    }

    /**
     * Рассчитывает общую сумму всех транзакций.
     * @return {number} Общая сумма транзакций.
     */
    calculateTotalAmount() {
        return this.transactions.reduce((total, transaction) => total + transaction.transaction_amount, 0);
    }

    /**
     * Рассчитывает общую сумму транзакций за указанную дату.
     * @param {number} [year] - Год транзакций.
     * @param {number} [month] - Месяц транзакций.
     * @param {number} [day] - День транзакций.
     * @return {number} Общая сумма транзакций за указанную дату.
     */
    calculateTotalAmountByDate(year, month, day) {
        return this.transactions.reduce((total, transaction) => {
            const trDate = new Date(transaction.transaction_date);
            if ((!year || trDate.getFullYear() === year) &&
                (!month || trDate.getMonth() + 1 === month) &&
                (!day || trDate.getDate() === day)) {
                total += transaction.transaction_amount;
            }
            return total;
        }, 0);
    }

    /**
     * Возвращает транзакции указанного типа.
     * @param {string} type - Тип транзакций для фильтрации.
     * @return {Array} Фильтрованный массив транзакций.
     */
    getTransactionByType(type) {
        return this.transactions.filter(transaction => transaction.transaction_type === type);
    }

    /**
     * Возвращает транзакции в указанном диапазоне дат.
     * @param {string} startDate - Начальная дата диапазона.
     * @param {string} endDate - Конечная дата диапазона.
     * @return {Array} Фильтрованный массив транзакций.
     */
    getTransactionsInDateRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return this.transactions.filter(transaction => {
            const trDate = new Date(transaction.transaction_date);
            return trDate >= start && trDate <= end;
        });
    }

    /**
     * Возвращает транзакции, совершенные с указанным торговым местом или компанией.
     * @param {string} merchantName - Название торгового места или компании.
     * @return {Array} Фильтрованный массив транзакций.
     */
    getTransactionsByMerchant(merchantName) {
        return this.transactions.filter(transaction => transaction.merchant_name === merchantName);
    }

    /**
     * Рассчитывает среднее значение сумм транзакций.
     * @return {number} Среднее значение сумм транзакций.
     */
    calculateAverageTransactionAmount() {
        return this.transactions.reduce((sum, transaction) => sum + transaction.transaction_amount, 0) / this.transactions.length;
    }

    /**
     * Возвращает транзакции, сумма которых находится в заданном диапазоне.
     * @param {number} minAmount - Минимальная сумма транзакции.
     * @param {number} maxAmount - Максимальная сумма транзакции.
     * @return {Array} Транзакции в заданном диапазоне сумм.
     */
    getTransactionsByAmountRange(minAmount, maxAmount) {
        return this.transactions.filter(({ transaction_amount }) => transaction_amount >= minAmount && transaction_amount <= maxAmount);
    }

    /**
     * Рассчитывает общую сумму дебетовых транзакций.
     * @return {number} Общая сумма дебетовых транзакций.
     */
    calculateTotalDebitAmount() {
        return this.transactions.filter(transaction => transaction.transaction_type === 'debit').reduce((sum, transaction) => sum + transaction.transaction_amount, 0);
    }

    /**
     * Определяет месяц с наибольшим количеством транзакций.
     * @return {number} Месяц с наибольшим количеством транзакций (1-12).
     */
    findMostTransactionsMonth() {
        const monthCounts = {};
    
        for (const { transaction_date } of this.transactions) {
            const month = new Date(transaction_date).getMonth();
            monthCounts[month] = (monthCounts[month] || 0) + 1;
        }
    
        let maxMonth = 0;
        let maxCount = 0;
    
        for (const month in monthCounts) {
            if (monthCounts[month] > maxCount) {
                maxMonth = parseInt(month);
                maxCount = monthCounts[month];
            }
        }
    
        return maxMonth + 1; 
    }

    /**
     * Определяет месяц с наибольшим количеством дебетовых транзакций.
     * @return {string} Месяц с наибольшим количеством дебетовых транзакций (название месяца).
     */
    findMostDebitTransactionMonth() {
        const monthCounts = {};
        
        for (const transaction of this.transactions) {
            if (transaction.transactionType === 'debit') {
                const month = new Date(transaction.transactionDate).getMonth() + 1; 
                monthCounts[month] = (monthCounts[month] || 0) + 1;
            }
        }

        let mostDebitTransactionsMonth = 1; 
        let maxDebitTransactions = 0;

        for (const month in monthCounts) {
            if (monthCounts[month] > maxDebitTransactions) {
                maxDebitTransactions = monthCounts[month];
                mostDebitTransactionsMonth = month;
            }
        }

        return new Date(0, mostDebitTransactionsMonth - 1).toLocaleString('default', { month: 'long' }); 
    }

    /**
     * Определяет, каких транзакций больше: дебетовых или кредитовых.
     * @return {string} 'debit', 'credit' или 'equal', в зависимости от того, каких транзакций больше.
     */
    mostTransactionTypes() {
        const counts = { debit: 0, credit: 0 };
    
        this.transactions.forEach(transaction => {
            if (transaction.transaction_type === 'debit') counts.debit++;
            else if (transaction.transaction_type === 'credit') counts.credit++;
        });
    
        if (counts.debit > counts.credit) return 'debit';
        else if (counts.credit > counts.debit) return 'credit';
        return 'equal';
    }
    
    /**
     * Возвращает транзакции, совершенные до указанной даты.
     * @param {string} date - Дата, до которой нужно вернуть транзакции.
     * @return {Array} Транзакции, совершенные до указанной даты.
     */
    getTransactionsBeforeDate(date) {
        const tBeforeDate = new Date(date);
        return this.transactions.filter(transaction => new Date(transaction.transaction_date) < tBeforeDate);
    }

    /**
     * Возвращает транзакцию по уникальному идентификатору.
     * @param {string} id - Уникальный идентификатор транзакции.
     * @return {Object|null} Транзакция с указанным идентификатором или null, если транзакция не найдена.
     */
    findTransactionById(id) {
        return this.transactions.find(transaction => transaction.transaction_id === id);
    }

    /**
     * Возвращает массив описаний всех транзакций.
     * @return {Array} Описания транзакций.
     */
    mapTransactionDescriptions() {
        const descriptions = [];
        for (const transaction of this.transactions) {
            descriptions.push(transaction.transaction_description);
        }
        return descriptions;
    }
}


const analyzer = new TransactionAnalyzer(transactions);

const uniqueTransactionTypes = analyzer.getUniqueTransactionType();
console.log('Unique Transaction Types:', uniqueTransactionTypes);

const totalAmount = analyzer.calculateTotalAmount();
console.log('Total Amount:', totalAmount);

const totalAmountByDate = analyzer.calculateTotalAmountByDate(2019, 2);
console.log("Total Amount for 2019-02: ", totalAmountByDate);

const debitTransactions = analyzer.getTransactionByType('debit');
console.log('Debit Transactions:', debitTransactions);

const tInRange = analyzer.getTransactionsInDateRange('2019-01-01', '2019-01-04');
console.log("Transactions In Date Range:", tInRange);

const tByMerchant = analyzer.getTransactionsByMerchant("Cafe123");
console.log("Transactions By Merchant:", tByMerchant);

const srznach = analyzer.calculateAverageTransactionAmount();
console.log("Average TransactioncAmount: ", srznach)

const tByAmountRange = analyzer.getTransactionsByAmountRange(120, 150);
console.log("TransactionsByAmountRange: ", tByAmountRange);

const debitAm = analyzer.calculateTotalDebitAmount();
console.log("TotalDebitAmount: ", debitAm);

const tMounth = analyzer.findMostTransactionsMonth();
console.log("Most Transactions are in Month №: ", tMounth);

const mostDMounth = analyzer.findMostDebitTransactionMonth();
console.log("Most Debit Transaction Month is ", mostDMounth);

const mTrTypes = analyzer.mostTransactionTypes();
console.log("most Transaction Types are: ", mTrTypes);

const trBeforeDate = analyzer.getTransactionsBeforeDate('2019-01-05');
console.log("Transactions Before your Date are: ", trBeforeDate); 

const trById = analyzer.findTransactionById('40');
console.log("Transaction By your Id: ", trById);

const description = analyzer.mapTransactionDescriptions();
console.log("Transaction Descriptions: ", description);

analyzer.addTransaction({
    transaction_id: "123",
    transaction_date: "2024-03-30",
    transaction_amount: 100,
    transaction_type: "debit",
    transaction_description: "Something",
    merchant_name: "Something",
    card_type: "Visa"
});

const allTr = analyzer.getAllTransactions()
console.log("All transactions: ", allTr);
