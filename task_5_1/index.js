function debounce(func, delay) {
  let timer;

  return function (...args) {
    // Сброс таймера при каждом вызове
    clearTimeout(timer);

    // Установка нового таймера
    timer = setTimeout(() => {
      func.apply(this, args); // Вызов функции с сохранением контекста и аргументов
      console.log(args);
    }, delay);
  };
}

// Пример использования:
const debouncedFunction = debounce(() => {
  console.log('Вызвана функция с задержкой');
}, 2000);

// Тестирование:
debouncedFunction('args');
debouncedFunction('args');
debouncedFunction('args');
debouncedFunction('args');
