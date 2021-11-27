window.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prevSlide = document.querySelector('.offer__slider-prev'),
        nextSlide = document.querySelector('.offer__slider-next'),
        slidesField = document.querySelector('.offer__slider-inner'),
        totalSlides = document.querySelector('#total'),
        currentSlide = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),

        width = window.getComputedStyle(slidesWrapper).width;

  //Optitmization of my code
  const beautyfullNumbers = i => {
          if (slides.length < 10) {
            currentSlide.textContent = `0${i}`;
          }
          else {
            currentSlide.textContent = i;
          }
        },
        activeDots = (arr, i) => {
          arr.forEach(dot => dot.style.opacity = '.5');
          arr[i - 1].style.opacity = '1';
        };



  let slideIndex = 1,
      //start width
      offset = 0;

  //Zero if slide.length or slideIndex < 10
  if (slides.length < 10) {
    totalSlides.textContent = `0${slides.length}`;
    currentSlide.textContent = `0${slideIndex}`;
  }
  else {
    totalSlides.textContent = slides.length;
    currentSlide.textContent = slideIndex;
  }


  slidesField.style.width = 100 * slides.length + '%';//Width whole slide carousel
  slidesField.style.display = 'flex';//Display style
  slidesField.style.transition = '.5s all';//Transition parametrs

  slidesWrapper.style.overflow = 'hidden';//Hide unnesessary slides

  //Same width(=slide wrapper) for all slides
  slides.forEach(slide => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  //Slide indicators
  const indicators = document.createElement('ol'),
        dots = [];

  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;
    indicators.append(dot);
    dots.push(dot);
    dots[0].style.opacity = '1';
  }

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
    beautyfullNumbers(slideIndex);
    //Dots logic
    activeDots(dots, slideIndex);
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
    beautyfullNumbers(slideIndex);
    //Dots logic
    activeDots(dots, slideIndex);
  });

  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      //Zero if slide number < 10
      beautyfullNumbers(slideIndex);
      //Dots logic
      activeDots(dots, slideIndex);
    });
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