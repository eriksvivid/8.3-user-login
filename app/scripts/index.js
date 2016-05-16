var $ = require('jquery');
var Firebase = require('firebase');

$.fn.serializeObject = function() {
  return this.serializeArray().reduce(function(acum, i) {
    acum[i.name] = i.value;
    return acum;
  }, {});
};

$(function(){
  var ref = new Firebase('https://sizzling-fire-3829.firebaseio.com/');
  var auth;
  var formData;

  $('#signup').on('submit', function(event){
    event.preventDefault();
    var $form = $(this);
    var formData = $form.serializeObject();

    ref.createUser(formData, function(error, userData) {
      if (error) {
        switch (error.code) {
        case 'EMAIL_TAKEN':
          console.log('The new user account cannot be created because the email is already in use.');
          break;
        case 'INVALID_EMAIL':
          console.log('The specified email is not a valid email.');
          break;
        default:
          console.log('Error creating user:', error);
        }
      } else {
        console.log('Successfully created user account with uid:', userData.uid);
      }
    });

  });

  $('#login').on('submit', function(event){
    event.preventDefault();
    var $form = $(this);
    formData = $form.serializeObject();
    console.log(formData);

    ref.authWithPassword(formData, function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('Authenticated successfully with payload:', authData);
        auth = authData.token;
      }
    });
  });

  $('#message-box').on('submit', function(e){
    if (e.keyCode === 13){
      e.preventDefault();
      var username = formData.email;
      var msgs = $('#comment').val();
      ref.push({username: username, msgs: msgs});
      $(this).closest('form').find("input[type=text], textarea").val("");
      $(this).closest('form').find("input[type=password], textarea").val("");

    }
    e.preventDefault();
    var username = formData.email;
    var msgs = $('#comment').val();
    ref.push({username: username, msgs: msgs});
  });
  ref.on('child_added', function(snapshot){
    var message = snapshot.val();
    console.log(message);
    $('.messages').append('<div>' + message.username + ': ' + message.msgs + '</div>');
  });

});
