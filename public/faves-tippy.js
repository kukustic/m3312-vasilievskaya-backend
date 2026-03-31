document.querySelectorAll('.faves__item').forEach(item => {
  tippy(item, {
    content: `Нори очень любит "${item.textContent}"!`,
    placement: 'top',
    theme: 'light',
    animation: 'scale',
  });
});