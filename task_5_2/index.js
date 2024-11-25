function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepClone);
  }


  const clone = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }

  return clone;
}

// Пример использования
const original = {
  name: 'John',
  address: {
    city: 'New York',
    country: 'USA',
  },
};

const copy = deepClone(original);

// Изменяем копию
copy.address.city = 'Los Angeles';

// Проверяем
console.log(original.address.city);
console.log(copy.address.city);
