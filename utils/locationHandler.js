$(document).ready(function(){
  $('#search-form').on('submit', function(event) {
    if (!$('#location-input').val()) {
      event.preventDefault();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          $('#user-location').val(`${position.coords.latitude},${position.coords.longitude}`);
          $('#search-form').off('submit').submit();
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
  });
});
