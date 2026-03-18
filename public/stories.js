(function() {
  const container = document.getElementById("posts-container");
  const template = document.getElementById("story-template");
  const preloader = document.getElementById("preloader");
  const errorMessage = document.getElementById("error-message");

  async function loadStories() {
    try {
      preloader.style.display = "block";
      errorMessage.textContent = "";


      const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
      if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);

      const data = await response.json();

      container.innerHTML = ""; // очищаем старые истории
      data.forEach(story => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".post__title").textContent = story.title;
        clone.querySelector(".post__body").textContent = story.body;
        container.appendChild(clone);
      });

    } catch (err) {
      errorMessage.textContent = "Не удалось загрузить данные: " + err.message;
    } finally {
      preloader.style.display = "none"; // скрываем прелоадер
    }
  }

  loadStories();
})();