
/**
 * Получает случайную активность с внешнего API.
 * Эта функция асинхронно обращается к API BoredAPI для получения предложений о случайных активностях.
 * В случае успешного получения данных возвращает текст активности.
 * При ошибке возвращается соответствующее сообщение об ошибке.
 *
 * @returns {Promise<string>} Промис, который разрешается в текст активности или сообщение об ошибке.
 */
export async function getRandomActivity() {
    try {
        const response = await fetch('https://www.boredapi.com/api/activity/');
        const data = await response.json();
        return data.activity;  
    } catch (error) {
        console.error('Failed to fetch activity:', error);
        return "К сожалению, произошла ошибка";  
    }
}

/**
 * Обновляет текстовое содержимое HTML элемента с id 'activity' .
 * Получает случайную активность и обновляет DOM элемент с ее значением.
 * @returns {Promise<void>} Промис без возвращаемого значения
 */
export async function updateActivity() {
    const activity = await getRandomActivity();
    document.getElementById('activity').innerText = activity;
    setTimeout(updateActivity, 60000);  
}