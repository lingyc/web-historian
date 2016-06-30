$(document).ready( () => {

  $('form').submit (e => {
    e.preventDefault();
    var query = $('input').val();
    sendRequest(query);
  });
  
});

var sendRequest = q => $.ajax({
  url: 'http://127.0.0.1:8080/' + q,
  type: 'POST',
  success: function() {
    
  }
});