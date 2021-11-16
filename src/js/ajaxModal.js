window.addEventListener('DOMContentLoaded', function() {
  /////////////////////////////////////////////////////////////////////////////
  //form's data with backend
  const forms = document.querySelectorAll('form');

  const message = {
    loading: "Загрузка...",
    success: "Спасибо, скоро мы с вами свяжемся",
    failure: "Ошибка"
  };

  forms.forEach(item => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener('submit', event => {
      event.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const request = new XMLHttpRequest();
      request.open('POST', 'php/server.php');

      // request.setRequestHeader('Content-type', 'multipart/form-data');
      const formData = new FormData(form);

      request.send(formData);

      request.addEventListener('load', () => {
        if(request.status === 200) {
          console.log(request.response);
          statusMessage.textContent = message.succes;
        }
        else {
          statusMessage.textContent = message.failure;
        }
      });
    });
  }
});