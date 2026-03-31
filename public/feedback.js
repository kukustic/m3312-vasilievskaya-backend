(async function () {
  const reviewsContainer = document.getElementById("reviews");
  const template = document.getElementById("review-template");
  const toastRoot = document.getElementById("toast-root");

  async function fetchReviews() {
    const res = await fetch("/api/feedback");
    return await res.json();
  }

  function createReviewElement(review) {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".review__name").textContent = review.user.name;
    clone.querySelector(".review__email").textContent = review.user.email;
    clone.querySelector(".review__text").textContent = review.message;
    const link = clone.querySelector(".review__edit");
    if (link) {
      link.textContent = "Открыть";
      link.setAttribute("href", `/feedback/${review.id}`);
    }
    reviewsContainer.appendChild(clone);
  }

  async function renderReviews() {
    reviewsContainer.innerHTML = "";
    const reviews = await fetchReviews();
    reviews.forEach(createReviewElement);
  }

  function showToast(text) {
    if (!toastRoot) return;

    const el = document.createElement("div");
    el.textContent = text;
    el.style.position = "fixed";
    el.style.right = "16px";
    el.style.bottom = "16px";
    el.style.padding = "12px 14px";
    el.style.borderRadius = "12px";
    el.style.background = "#111";
    el.style.color = "#fff";
    el.style.boxShadow = "0 10px 25px rgba(0,0,0,.2)";
    el.style.zIndex = "9999";
    toastRoot.appendChild(el);

    setTimeout(() => el.remove(), 3000);
  }

  function attachSse() {
    const es = new EventSource("/feedback/sse");
    es.addEventListener("message", async (event) => {
      try {
        const payload = JSON.parse(event.data);
        const mapText = {
          created: "Добавлен новый отзыв",
          updated: "Отзыв обновлён",
          deleted: "Отзыв удалён",
        };
        showToast(mapText[payload.type] ?? "Обновление отзывов");
        await renderReviews();
      } catch {
      }
    });
  }

  renderReviews();
  attachSse();
})();