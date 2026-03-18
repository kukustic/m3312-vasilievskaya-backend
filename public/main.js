(function () {

  window.addEventListener("load", function () {

  const loadTime = performance.now();

  const footer = document.querySelector(".site-footer");

  if (footer) {
    const info = document.createElement("p");
    info.textContent = "Страница загружена за " + loadTime.toFixed(2) + " мс";
    footer.appendChild(info);
  }

});

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  const links = document.querySelectorAll(".nav__link");

  links.forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("nav__link--active");
    }
  });

})();

  const authButton = document.getElementById('authButton');

authButton.addEventListener('click', () => {
  const isLoggedIn = authButton.classList.toggle('auth-logged-in');
  authButton.textContent = isLoggedIn ? 'Вы вошли как admin_kust' : 'Войти';
});