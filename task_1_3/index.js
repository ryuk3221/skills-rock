//P.s. данный алгоритм прекрасно находит себе примеренение в написании пагинации картчоек товаров
//реализцую функцию в контексте пагинации 
const chunkArray = (array, size) => {
  if (Array.isArray(array) && typeof size == 'number') {
    //страницы с товарами 
    const result = [];
    //количество страниц
    const pageCount = Math.ceil(array.length / size);  //size - кол-во карточек на странице 

    for (let i = 1; i <= pageCount; i++) {
      //i -  текущая страница
      result.push(array.slice(i * size - size, i * size))
    }

    console.log(result);
  }

  return false;
}

chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 4);