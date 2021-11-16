window.addEventListener('DOMContentLoaded', function() {
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
          statusMessage.textContent = message.succes;
          form.reset();

          setTimeout(() => {
            statusMessage.remove();
          }, 2000);
        }
        else {
          statusMessage.textContent = message.failure;
        }
      });
    });
  };

  //Do postData() for each form
  forms.forEach(item => {
    postData(item);
  });
});