window.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.offer__slide'),
        prevSlide = document.querySelector('.offer__slider-prev'),
        nextSlide = document.querySelector('.offer__slider-next'),
        totalSlides = document.querySelector('#total'),
        currentSlide = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  //start width
  let offset = 0;

  //Zero if slideIndex < 10
  if (slides.length < 10) {
    totalSlides.textContent = `0${slides.length}`;
    currentSlide.textContent = `0${slideIndex}`;
  }
  else {
    totalSlides.textContent = slides.length;
    currentSlide.textContent = slideIndex;
  }

  //Width whole slide carousel
  slidesField.style.width = 100 * slides.length + '%';
  //Display style
  slidesField.style.display = 'flex';
  //Transition parametrs
  slidesField.style.transition = '.5s all';

  //Hide unnesessary slides
  slidesWrapper.style.overflow = 'hidden';

  //Same width(=slide wrapper) for all slides
  slides.forEach(slide => {
    slide.style.width = width;
  });

  //Event on next arrow
  nextSlide.addEventListener('click', () => {
    //At the end of slider
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    }
    else {
      //Movement of slide
      offset += +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    //Logic of slide numbers
    if (slideIndex == slides.length) {
      slideIndex = 1;
    }
    else {
      slideIndex++;
    }

    //Zero if slide number < 10
    if (slides.length < 10) {
      currentSlide.textContent = `0${slideIndex}`;
    }
    else {
      currentSlide.textContent = slideIndex;
    }
  });

  //Event on previous arrow
  prevSlide.addEventListener('click', () => {
    //At the start of slider
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    }
    else {
      //Movement of slide
      offset -= +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    //Logic of slide numbers
    if (slideIndex == 1) {
      slideIndex = slides.length;
    }
    else {
      slideIndex--;
    }

    //Zero if slide number < 10
    if (slides.length < 10) {
      currentSlide.textContent = `0${slideIndex}`;
    }
    else {
      currentSlide.textContent = slideIndex;
    }
  });


  // if (slides.length < 10) {
  //   totalSlides.textContent = `0${slides.length}`;
  // }
  // else {
  //   totalSlides.textContent = slides.length;
  // }

  // function showSlides(n) {
  //   if (n > slides.length) {
  //     slideIndex = 1;
  //   }
  //   else if (n < 1) {
  //     slideIndex = slides.length;
  //   }

  //   slides.forEach(item => item.style.display = 'none');

  //   slides[slideIndex - 1].style.display = 'block';

  //   if (slides.length < 10) {
  //     currentSlide.textContent = `0${slideIndex}`;
  //   }
  //   else {
  //     currentSlide.textContent = slideIndex;
  //   }
  // }

  // showSlides(slideIndex);

  // function plusSlides(n) {
  //   showSlides(slideIndex += n);
  // }

  // prevSlide.addEventListener('click', () => {
  //   plusSlides(-1);
  // });

  // nextSlide.addEventListener('click', () => {
  //   plusSlides(1);
  // });
});