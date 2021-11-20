window.addEventListener('DOMContentLoaded', function() {
  const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    clearInterval(modalTimerId);
  }

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 30000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

  /////////////////////////////////////////////////////////////////////////////////////
  //ajax MODAL                                                                       //
  /////////////////////////////////////////////////////////////////////////////////////
  const forms = document.querySelectorAll('form');

  //List of stages' messages
  const message = {
    loading: 'loading',
    succes: 'thanks, everything is good',
    failure: 'Error'
  };

  const postData = (form) => {
    form.addEventListener('submit', e => {
      e.preventDefault();

      //Create visuality of textmessages
      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      //Create new object XMLHttpRequest()
      const request = new XMLHttpRequest();
      request.open('POST', 'php/server.php');

      ///////////////////////////////////////////////////////////////////
      // doesn't work with FormData()
      // request.setRequestHeader('Content-type', 'multipart/form-data');
      ///////////////////////////////////////////////////////////////////

      //Formdata of object
      const formData = new FormData(form);

      //Data in json format
      const object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });

      const json = JSON.stringify(object);
      request.send(json /*or formData*/);

      //Output response and message on 'load'
      request.addEventListener('load', () => {
        if (request.status === 200) {
          console.log(request.response);
          showThanksModal(message.succes);
          form.reset();
          statusMessage.remove();
        }
        else {
          showThanksModal(message.failure);
        }
      });
    });
  };

  function showThanksModal (message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }

  //Do postData() for each form
  forms.forEach(item => {
    postData(item);
  });
});