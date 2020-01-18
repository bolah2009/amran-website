if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(r => r)
      .catch(e => e);
  });
}

// Menu bar toggle

const menuBar = document.querySelector('#menu-bar');
const menuToggle = document.querySelector('#menu-toggle');
const menuToggleButton = document.querySelector('#menu-toggle-button');

menuToggleButton.addEventListener('click', ({ target }) => {
  target.classList.toggle('d-block');
  menuToggle.classList.toggle('is-clicked');
  menuBar.classList.toggle('is-active');
});
