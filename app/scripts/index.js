var $ = require('jquery');
var Firebase = require('firebase');

$.fn.serializeObject = function() {
  return this.serializeArray().reduce(function(acum, i) {
    acum[i.name] = i.value;
    return acum;
  }, {});
};

$(function(){
  var ref = new Firebase("https://sizzling-fire-3829.firebaseio.com/");
  var auth;
  $('#signup').on('submit', function(event){
    event.preventDefault();
    var $form = $(this);
    var formData = $form.serializeObject();
  });

  $('#login').on('submit', function(event){
    event.preventDefault();
    var $form = $(this);
    var formData = $form.serializeObject();
  });

  $('#get-data').click(function(event){
   event.preventDefault();

   $.ajax('https://sizzling-fire-3829.firebaseio.com/menu.json?auth=' + auth).then(function(data){
     console.log(data);
   });

 });
});
