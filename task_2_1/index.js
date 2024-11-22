const drawer = document.querySelector('.drawer');
const todoList = document.querySelector('.todo-list');
const textarea = document.querySelector('.textarea');
const filtersBtn = document.querySelectorAll('.filter-btn');

//инициализирую localStorage
if (!window.localStorage.getItem('todos')) {
  window.localStorage.setItem('todos', JSON.stringify([]));
}

//Вешаю обработчики событий 
window.addEventListener('click', (event) => {
  if (event.target.closest('.header-btn')) {
    drawer.classList.add('show');
  }
  if (event.target.classList.contains('show')) {
    drawer.classList.remove('show');
  }
  if (event.target.closest('.add-btn')) {
    addTodoToStorage();
  }
  if (event.target.closest('.remove-todo')) {
    //извлекаю id
    const id = event.target.closest('.todo-item').id;

    removeTodo(id);
  }
  if (event.target.closest('.todo-toggler') || event.target.closest('.todo-item') && !event.target.closest('.remove-todo')) {
    //извлекаю id
    const id = event.target.closest('.todo-item').id;

    toggleTodoComplete(id);
  }
  if (event.target.closest('.filter-btn')) {
    filtersBtn.forEach(btn => {
      btn.classList.remove('active');
    });
    event.target.classList.add('active');

    const filterBy = event.target.dataset.filter;
    console.log(filterBy);
    filterTodos(filterBy);
  }
});

const addTodoToStorage = () => {
  //извлекаю то что было в localStorage
  const currentData = JSON.parse(window.localStorage.getItem('todos'));

  //Извлекаю из инпута задачу
  const title = textarea.value.trim();

  if (title == '') {
    return alert('Вы не ввели задачу!');
  }

  //формирую дату добавления задачи
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const dateStr = `${day}.${month + 1}.${year}`;

  //формирую время добавления
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const timeStr = `${hours}:${minutes}`;

  //формирую обьект задачи
  const todoObj = {
    title,
    dateStr,
    timeStr,
    isComplete: false,
    id: Date.now()
  };

  console.log(todoObj);

  //добавляю в массив задач, новую задачу
  currentData.push(todoObj);

  //обновляю storage
  window.localStorage.setItem('todos', JSON.stringify(currentData));

  drawer.classList.remove('show');

  renderTodos();

  textarea.value = '';
}

const renderTodos = () => {
  //извлекаю то что было в localStorage
  const currentData = JSON.parse(window.localStorage.getItem('todos'));

  todoList.innerHTML = '';

  //запускаю цикл для отрисовки задач
  currentData.forEach((todo, index) => {
    todoList.insertAdjacentHTML('beforeend', todoComponent(todo, index));
  });
}

//пишем свой функциональный компонент
const todoComponent = (props, index) => {
  return `
      <div class="todo-item ${setActiveClass(props)}" id="${props.id}">
        <span class="number">${index + 1}.</span>
        <div class="todo-item__content">
          <div class="todo-item__title">${props.title}</div>
          <span class="date-wrapper">CreatedAt:<span class="time">${props.timeStr}</span><span class="date">${props.dateStr}</span></span>
        </div>
        <div class="todo-item__controls">
          <button class="todo-toggler">Выполнено</button>
          <button class="remove-todo">Удалить</button>
        </div>
      </div>
  `;
}

//Функция которая проверяет выполнена ли задача, и возвращает active class
const setActiveClass = (props) => {
  if (props.isComplete) return 'active';
}

//Функция удаления из storage задачки
const removeTodo = (id) => {
  //извлекаю то что было в localStorage
  const currentData = JSON.parse(window.localStorage.getItem('todos'));

  //удаляю задачку
  const newTodos = currentData.filter(todo => todo.id != id);

  //обновляю storage
  window.localStorage.setItem('todos', JSON.stringify(newTodos));

  //и оьновляю HTML задач
  renderTodos();
}

//фунция которая помечающая задачу выполненной/невыполненной
const toggleTodoComplete = (id) => {
  //извлекаю то что было в localStorage
  const currentData = JSON.parse(window.localStorage.getItem('todos'));

  const index = currentData.findIndex(todo => todo.id == id);

  currentData[index].isComplete = !currentData[index].isComplete;

  //обновляю storage
  window.localStorage.setItem('todos', JSON.stringify(currentData));

  renderTodos();
}

//функция фильтрайции
const filterTodos = (filterBy) => {
  if (filterBy == 'all') {
    renderTodos()
  } else if (filterBy == 'completed') {
    //извлекаю то что было в localStorage
    const currentData = JSON.parse(window.localStorage.getItem('todos'));
    const filtered = currentData.filter(todo => todo.isComplete);

    todoList.innerHTML = '';

    //запускаю цикл для отрисовки задач
    filtered.forEach((todo, index) => {
      todoList.insertAdjacentHTML('beforeend', todoComponent(todo, index));
    });
  } else if (filterBy == 'waiting') {
    //извлекаю то что было в localStorage
    const currentData = JSON.parse(window.localStorage.getItem('todos'));
    const filtered = currentData.filter(todo => !todo.isComplete);

    todoList.innerHTML = '';

    //запускаю цикл для отрисовки задач
    filtered.forEach((todo, index) => {
      todoList.insertAdjacentHTML('beforeend', todoComponent(todo, index));
    });
  }
}

//Рендерю задачки из storage сразу после открытия приложения
renderTodos();