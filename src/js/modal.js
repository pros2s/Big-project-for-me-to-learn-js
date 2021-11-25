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
    loading: 'img/spinner.svg',
    succes: 'thanks, everything is good',
    failure: 'Error'
  };

  function showThanksModal (message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.remove('show');
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
    }, 1500);
  }

  //Function to post some data with fetch
  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    });

    return await res.json();
  };

  const bindPostData = (form) => {
    form.addEventListener('submit', e => {
      e.preventDefault();

      //Create visuality of textmessages
      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 20px auto 0;

        fill: transparent;
        height: 20px;
        width: 20px;
      `;

      form.insertAdjacentElement('afterend', statusMessage);

      //Create new object XMLHttpRequest()
      //
      // const request = new XMLHttpRequest();
      // request.open('POST', 'php/server.php');

      ///////////////////////////////////////////////////////////////////
      // doesn't work with FormData()
      // request.setRequestHeader('Content-type', 'multipart/form-data');
      ///////////////////////////////////////////////////////////////////

      //Formdata for object
      const formData = new FormData(form);

      const jsonFormData = JSON.stringify(Object.fromEntries(formData.entries()));

      //Data in json format for each form(forEach)
      const object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });

      //Create fetch API
      // fetch('php/server.php', {
      //   method: 'POST',
      //   // headers: {
      //   //   'Content-type': 'multipart/form-data'
      //   // },
      //   body: JSON.stringify(object)
      // })
      postData('http://localhost:3000/requests', jsonFormData)
      // .then(data => data.text())
      .then((/*data*/) => {
        // console.log(data);
        showThanksModal(message.succes);
        statusMessage.remove();
      })
      .catch(() => {
        showThanksModal(message.failure);
      })
      .finally(() => {
        form.reset();
      });
    });
  };

  //Do postData() for each form
  forms.forEach(item => {
    bindPostData(item);
  });
});