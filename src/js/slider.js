window.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.offer__slide'),
        prevSlide = document.querySelector('.offer__slider-prev'),
        nextSlide = document.querySelector('.offer__slider-next'),
        totalSlides = document.querySelector('#total'),
        currentSlide = document.querySelector('#current');

  let slideIndex = 1;

  if (slides.length < 10) {
    totalSlides.textContent = `0${slides.length}`;
  }
  else {
    totalSlides.textContent = slides.length;
  }

  function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }
    else if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach(item => item.style.display = 'none');

    slides[slideIndex - 1].style.display = 'block';

    if (slides.length < 10) {
      currentSlide.textContent = `0${slideIndex}`;
    }
    else {
      currentSlide.textContent = slideIndex;
    }
  }

  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  prevSlide.addEventListener('click', () => {
    plusSlides(-1);
  });

  nextSlide.addEventListener('click', () => {
    plusSlides(1);
  });
});