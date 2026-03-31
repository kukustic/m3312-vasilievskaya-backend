(async function () {
  const form = document.getElementById("feedback-form");
  const reviewsContainer = document.getElementById("reviews");
  const template = document.getElementById("review-template");

  async function fetchReviews() {
    const res = await fetch("/api/feedback");
    return await res.json();
  }

  function createReviewElement(review) {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".review__name").textContent = review.user.name;
    clone.querySelector(".review__email").textContent = review.user.email;
    clone.querySelector(".review__text").textContent = review.message;
    reviewsContainer.appendChild(clone);
  }

  async function renderReviews() {
    reviewsContainer.innerHTML = "";
    const reviews = await fetchReviews();
    reviews.forEach(createReviewElement);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Все поля обязательны");
      return;
    }

    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    form.reset();
    renderReviews();
  });

  renderReviews();
})();