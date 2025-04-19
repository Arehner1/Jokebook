document.addEventListener('DOMContentLoaded', () => {
    const randomJokeEl = document.getElementById('random-joke');
    const refreshBtn = document.getElementById('refresh-random');
    const categoryList = document.getElementById('category-list');
    const jokeList = document.getElementById('joke-list');
    const searchInput = document.getElementById('search-category');
    const searchBtn = document.getElementById('search-btn');
    const addForm = document.getElementById('add-joke-form');
  
    // Load random joke
    function loadRandomJoke() {
      fetch('/jokebook/random')
        .then(res => res.json())
        .then(joke => {
          randomJokeEl.textContent = `${joke.setup} - ${joke.delivery}`;
        });
    }
  
    // Load all categories
    function loadCategories() {
      fetch('/jokebook/categories')
        .then(res => res.json())
        .then(categories => {
          categoryList.innerHTML = '';
          categories.forEach(cat => {
            const li = document.createElement('li');
            const btn = document.createElement('button');
            btn.textContent = cat;
            btn.addEventListener('click', () => loadJokesByCategory(cat));
            li.appendChild(btn);
            categoryList.appendChild(li);
          });
        });
    }
  
    // Load jokes from a category
    function loadJokesByCategory(category) {
      fetch(`/jokebook/joke/${category}`)
        .then(res => {
          if (!res.ok) throw new Error('Category not found');
          return res.json();
        })
        .then(jokes => {
          jokeList.innerHTML = '';
          jokes.forEach(j => {
            const li = document.createElement('li');
            li.textContent = `${j.setup} - ${j.delivery}`;
            jokeList.appendChild(li);
          });
        })
        .catch(err => {
          jokeList.innerHTML = `<li>${err.message}</li>`;
        });
    }
  
    // Handle search input
    searchBtn.addEventListener('click', () => {
      const cat = searchInput.value.trim();
      if (cat) loadJokesByCategory(cat);
    });
  
    // Handle add joke form submission
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const category = document.getElementById('new-category').value;
      const setup = document.getElementById('new-setup').value;
      const delivery = document.getElementById('new-delivery').value;
  
      fetch('/jokebook/joke/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, setup, delivery })
      })
      .then(res => res.json())
      .then(updatedJokes => {
        loadJokesByCategory(category);
        addForm.reset();
      })
      .catch(err => console.error('Add failed:', err));
    });
  
    refreshBtn.addEventListener('click', loadRandomJoke);
  
    // Initial load
    loadRandomJoke();
    loadCategories();
  });
  