window.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3000/menu')
      .then(data => data.json())
      .then(res => console.log(res));
});