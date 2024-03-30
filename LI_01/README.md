# Индивидуальная (лабораторная) работа №1


## Инструкции по запуску проекта

- Установить `Node.js`
- Зайти в  `Visual Studio Code` 
- Файл `transaction.json` и `main.js` поместить в одной директории

## Описание лабораторной работы

Создание консольного приложения для анализа транзакций


## Краткая документация к проекту 

В этом проекте были реализованы два основных класса для работы с финансовыми транзакциями: `Transaction` и `TransactionAnalyzer`.
1. **Класс `Transaction`:**
- Представляет собой финансовую транзакцию с основными атрибутами,`id`, `date`, `amount`, `type`, `description`, `merchant` и `cardType`.
- Включает метод `toString()`, который возвращает строковое представление транзакции в формате JSON.

2. **Класс `TransactionAnalyzer`:**
Управляет набором транзакций и предоставляет различные аналитические методы для работы с этим набором

- **Добавление и получение транзакций:**

    - `addTransaction(transactionData)`: Добавляет новую транзакцию в анализатор.
    - `getAllTransactions()`: Возвращает массив всех транзакций.

- **Фильтрация и поиск:**

    - `getUniqueTransactionTypes()`: Возвращает массив уникальных типов транзакций.
    - `getTransactionByType(type)`: Фильтрует транзакции по заданному типу.
    - `getTransactionsByMerchant(merchantName)`: Возвращает транзакции определенного торговца.
    - `findTransactionById(id)`: Ищет транзакцию по ее идентификатору.
    - `getTransactionsInDateRange(startDate, endDate)`: Фильтрует транзакции по датам.
    - `getTransactionsByAmountRange(minAmount, maxAmount)`: Фильтрует транзакции по диапазону сумм.
    - `getTransactionsBeforeDate(date)`: Возвращает транзакции, совершенные до указанной даты.

- **Аналитика:**

    - `calculateTotalAmount()`: Вычисляет общую сумму всех транзакций.
    - `calculateAverageTransactionAmount()`: Вычисляет среднюю сумму транзакций.
    - `calculateTotalDebitAmount()`: Суммирует суммы всех дебетовых транзакций.
    - `mapTransactionDescriptions()`: Возвращает массив описаний всех транзакций.
    - `findMostTransactionsMonth()`: Определяет месяц с наибольшим количеством транзакций.
    - `findMostDebitTransactionMonth()`: Определяет месяц с наибольшим количеством дебетовых транзакций.
    - `mostTransactionTypes()`: Анализирует и возвращает преобладающий тип транзакций (дебет или кредит).
    - `calculateTotalAmountByDate(year, month, day)`: Вычисляет общую сумму транзакций за определенную дату.

## Примеры использования проекта с приложением фрагментов кода

Функция `getUniqueTransactionType()`, которая возвращает массив уникальных типов транзакций 

```js
getUniqueTransactionType() {
    const uniqueTypes = new Set();
    this.transactions.forEach(transaction => uniqueTypes.add(transaction.transaction_type));
    return Array.from(uniqueTypes);
}

const uniqueTransactionTypes = analyzer.getUniqueTransactionType();
console.log('Unique Transaction Types:', uniqueTransactionTypes); 
// Unique Transaction Types: [ 'debit', 'credit' ]
```
Функция `getTransactionsByMerchant(merchantName)`: Возвращает транзакции у определенного торговца.
```js
getTransactionsByMerchant(merchantName) {
        return this.transactions.filter(transaction => transaction.merchant_name === merchantName);
    }
const tByMerchant = analyzer.getTransactionsByMerchant("Cafe123");
console.log("Transactions By Your Merchant:", tByMerchant);
/* Transactions By Your Merchant: [
  {
    transaction_id: '7',
    transaction_date: '2019-01-07',
    transaction_amount: 40,
    transaction_type: 'debit',
    transaction_description: 'Lunch with colleagues',
    merchant_name: 'Cafe123',
    card_type: 'Visa'
  },
  {
    transaction_id: '96',
    transaction_date: '2019-04-06',
    transaction_amount: 40,
    transaction_type: 'debit',
    transaction_description: 'Coffee and cookies',
    merchant_name: 'Cafe123',
    card_type: 'Discover'
  }
]*/
```
Функция, `calculateAverageTransactionAmount()`,которая вычисляет среднее значение суммы транзакций.

```js
calculateAverageTransactionAmount() {
        return this.transactions.reduce((sum, transaction) => sum + transaction.transaction_amount, 0) / this.transactions.length;
    }

const srznach = analyzer.calculateAverageTransactionAmount();
console.log("Average Transactionc Amount: ", srznach)

//Average Transactionc Amount:  66.66666666666667
```

## Ответы на контрольные вопросы

1. **Какие примитивные типы данных существуют в JavaScript?**
    1. `number`
    2. `undefined`
    3. `boolean`
    4. `string`
    5. `symbol`
    6. `bigint`

2. **Какие методы массивов вы использовали для обработки и анализа данных в вашем приложении, и как они помогли в выполнении задачи?**

`forEach()`: Использовался для итерации по всем элементам массива транзакций при выполнении различных операций, таких как подсчет общей суммы, определение уникальных типов транзакций и т. д.

`reduce()`: Применялся для выполнения операций агрегации данных, таких как подсчет общей суммы транзакций, подсчет общей суммы дебетовых транзакций и определение месяца с наибольшим количеством транзакций.

`filter()`: Использовался для фильтрации транзакций по различным критериям, таким как тип транзакции, диапазон дат, название торгового места и диапазон сумм.

`find()`: Использовался для поиска транзакции по уникальному идентификатору.

`getMonth()`, `getFullYear()` и `getDate()`: Используются для получения компонентов даты из объекта Date

3. **В чем состоит роль конструктора класса?**

Роль конструктора класса в `JavaScript` заключается в инициализации новых объектов, устанавливая начальные значения и выполняя другие операции, необходимые при создании экземпляра класса. Конструктор вызывается автоматически при использовании оператора `new` для создания нового объекта класса.

4. **Каким образом вы можете создать новый экземпляр класса в JavaScript?**

Ключевое слово `new` в JavaScript используется для создания экземпляра объекта с использованием функции-конструктора.
## Список использованных источников

https://github.com/MSU-Courses/javascript_typescript/tree/main/docs

https://chat.openai.com

