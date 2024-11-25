class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.isAvailable = true;
  }
}

class Library {
  constructor(items = []) {
    this.items = items;
  }

  addBook(book) {
    this.items.push(book);
    return book;
  }

  borrowBook(isbn) {
    const index = this.items.findIndex(item => item.isbn == isbn);
    this.items[index].isAvailable = false;
  }

  returnBook(isbn) {
    return this.items.find(book => book.isbn == isbn);
  }

  listAvailableBooks() {
    return this.items.filter(book => book.isAvailable);
  }
}

const book1 = new Book('Гарри Поттер', 'Дж.К. Роулинг', 9780807286005);
const book2 = new Book('Теория всего. Происхождение и судьба', 'Стивен Хокинг', 9781893224797);
const book3 = new Book('Краткая история времени', 'Стивен Хокинг', 9788420651996);

console.log(book1);
console.log(book2);
console.log(book3);

const library = new Library([book1, book2]);
library.addBook(book3);

library.borrowBook(9780807286005);

console.log('returned book: ', library.returnBook(9788420651996));

console.log(library.listAvailableBooks());