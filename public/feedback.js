(function () {

  const form = document.getElementById("feedback-form");
  const reviewsContainer = document.getElementById("reviews");
  const template = document.getElementById("review-template");

  // загрузка сохранённых отзывов
  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  function saveReviews() {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }

  function createReviewElement(review, index) {

    const clone = template.content.cloneNode(true);

    clone.querySelector(".review__name").textContent = review.name;
    clone.querySelector(".review__email").textContent = review.email;
    clone.querySelector(".review__text").textContent = review.message;

    const editBtn = clone.querySelector(".review__edit");

    editBtn.addEventListener("click", function () {
      const newText = prompt("Изменить отзыв:", review.message);
      if (newText && newText.length >= 5) {
        review.message = newText;
        reviews[index] = review;
        saveReviews();
        renderReviews();
      }
    });

    reviewsContainer.appendChild(clone);
  }

  function renderReviews() {
    reviewsContainer.innerHTML = "";
    reviews.forEach(createReviewElement);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name.length < 2 || message.length < 5) {
      alert("Проверьте введённые данные");
      return;
    }

    const review = { name, email, message };
    reviews.push(review);

    saveReviews();
    renderReviews();
    form.reset();
  });

  renderReviews();

})();