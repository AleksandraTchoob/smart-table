import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);
export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {         // Получаем ключи из объекта и перебираем по именам
        elements[elementName].append(                       // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])          // формируем массив имён, значений опций
                .map(name => {                              // используйте name как значение и текстовое содержимое
                    // @todo: создать и вернуть тег опции
                    const option = document.createElement('option');
                    option.value = name;
                    option.textContent = name;
                    return option;
                })
        )
    })
    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.type === 'click' && action.target.name === 'clear') {
            const button = action.target;
            const fieldName = button.dataset.field;
            const filterWrapper = button.closest('.filter-wrapper');
            if (filterWrapper) {
                const input = filterWrapper.querySelector('input');
                if (input) {
                    input.value = '';       // сбрасываем значение поля
                    state[fieldName] = '';  // сбрасываем значение в состоянии
                }
            }
        }
        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}