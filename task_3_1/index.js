const loadingHtml = document.querySelector('.dot-spinner');
const userList = document.querySelector('.user-list');

const fetchRandomUsers = async () => {
  try {
    const res = await fetch('https://randomuser.me/api/?results=10');
    const { results } = await res.json();
    loadingHtml.style.display = 'none';


    results.forEach(el => {
      console.log(el);
      const component = `
        <div class="user-item">
          <img src="${el.picture.thumbnail}" alt="">
          <div class="user-item__content">
            <div class="name">${el.name.first}</div>
            <div class="email">${el.email}</div>
          </div>
        </div>
      `;

      userList.insertAdjacentHTML('beforeend', component);
    });
  } catch (err) {
    console.warn(err)
    alert('Не удалось закгрузить пользователей');
  }
}

fetchRandomUsers();