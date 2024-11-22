const isPalindrome = (str) => {
  if (typeof str == 'string') {
    //преобразовываю строку в единый регистр и удаляю пробелы
    const lowerStr = str.toLowerCase().replaceAll(' ', '');
    //создаю регулярное выражение которое вернет только буквы или цифры
    const reg = /[^a-zа-я0-9]+/g;  //про цифры в тз ничего не сказано по этому я буду их учитывать

    const newStr = lowerStr.replace(reg, '');

    console.log(newStr.split('').reverse().join('') === newStr);
    return newStr.split('').reverse().join('') === newStr;
  }

  return false;
}

isPalindrome('А роза упала на лапу Азора');
isPalindrome('Привет');
isPalindrome('заказ');
isPalindrome('1довоД1');
isPalindrome('№##21заказ12##№');
isPalindrome(1234);