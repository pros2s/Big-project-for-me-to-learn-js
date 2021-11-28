window.addEventListener('DOMContentLoaded', function() {
  const result = document.querySelector('.calculating__result span');//Result placement
  let sex, height, weight, age, ratio;

  //Set default value of sex depending on localStorage
  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  }
  else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  //Set default value of ratio depending on localStorage
  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  }
  else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }
        //Calculate function
  const calcTotal = () => {
        if (!sex || !height || !weight || !age || !ratio) {
          result.textContent = '____';
          return;
        }

        if (sex === 'female') {
          result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }
        else {
          result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
      },
      //Set values and calculate ccal on click function
      getStaticInformation = (selector, activeClass) => {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
          elem.addEventListener('click', e => {

            //if element has data-ratio
            if (e.target.getAttribute('data-ratio')) {
              ratio = +e.target.getAttribute('data-ratio');
              localStorage.setItem('ratio', ratio);//set localStorage data
          }
            //if element has id(male or female)
            else {
              sex = e.target.getAttribute('id');
              localStorage.setItem('sex', sex);//set localStorage data
          }

            //Set activeClass
            elements.forEach(elem => elem.classList.remove(activeClass));
            e.target.classList.add(activeClass);

            //Calculate on 'click'
            calcTotal();
          });
        });
      },
      //Set values and calculate ccal on 'input' function
      getDynamicInformation = (selector) => {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

          //Red border if inside is not digits(regular extantion)
          if (input.value.match(/\D/g)) {
            input.style.border = '1px solid red';
          }
          else {
            input.style.border = 'none';
          }

          switch(input.getAttribute('id')) {
            case 'height':
              height = +input.value;
              break;
            case 'weight':
              weight = +input.value;
              break;
            case 'age':
              age = +input.value;
              break;
          }

          calcTotal();
        });
      },
      //Set activeClass depending on localStorage data
      initLocalSettings = (selector, activeClass) => {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
          elem.classList.remove(activeClass);

          if (elem.getAttribute('id') === localStorage.getItem('sex')) {
            elem.classList.add(activeClass);
          }

          if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(activeClass);
          }
        });
      };

  calcTotal();
  
  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose.calculating__choose_big div', 'calculating__choose-item_active');

  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose.calculating__choose_big div', 'calculating__choose-item_active');

  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
});