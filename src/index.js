if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(r => r)
      .catch(e => e);
  });
}

// Menu bar toggle

const mainElement = document.querySelector('#main');
const navElement = document.querySelector('#nav');
const menuBar = document.querySelector('#menu-bar');
const menuToggle = document.querySelector('#menu-toggle');
const menuToggleButton = document.querySelector('#menu-toggle-button');

menuToggleButton.addEventListener('click', ({ target }) => {
  target.classList.toggle('d-block');
  menuToggle.classList.toggle('is-clicked');
  menuBar.classList.toggle('is-active');
});

// Home page slideshow

const slideElements = document.querySelectorAll('.preview');

const slideShow = (elements, activePos = 0) => {
  let [activeIndex, nextIndex] = [activePos, activePos + 1];

  const checkRange = (a, n) => {
    if (a > elements.length - 1 || a < 0) {
      return [0, 1];
    }
    if (n > elements.length - 1) {
      return [a, 0];
    }
    return [a, n];
  };

  const changeSlide = (a, n) => {
    elements[a].classList.remove('active');
    elements[n].classList.add('active');
  };

  const isActive = pos => elements[pos].classList.contains('active');

  const findActive = () => {
    let foundActive = 0;
    elements.forEach(({ classList }, index) => {
      if (classList.contains('active')) {
        foundActive = index;
      }
    });
    const [newActive, newNextActive] = checkRange(foundActive, foundActive + 1);
    return [newActive, newNextActive];
  };

  [activeIndex, nextIndex] = checkRange(activeIndex, nextIndex);
  if (isActive(activeIndex)) {
    changeSlide(activeIndex, nextIndex);
  } else {
    [activeIndex, nextIndex] = findActive();
    changeSlide(activeIndex, nextIndex);
  }
  setTimeout(slideShow, 5000, elements, nextIndex + 1);
};

slideShow(slideElements);

// Change navbar on scroll

const styleNavBar = () => {
  if (mainElement.firstChild.id !== 'home') {
    navElement.classList.add('scroll');
    return;
  }
  if (window.scrollY < 40) {
    navElement.classList.remove('scroll');
  } else {
    navElement.classList.add('scroll');
  }
};

document.addEventListener('scroll', styleNavBar, { passive: true });
