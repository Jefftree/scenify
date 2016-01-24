var map;
var infowindow;
var marker;
var startEnd = {};
var directionsDisplay;
var directionsService;

function initMap() {
  var montreal = {lat: 45.50, lng: -73.57}; // user input

  map = new google.maps.Map(document.getElementById('map'), {
    center: montreal,
    zoom: 15
  });

  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();

  infowindow = new google.maps.InfoWindow();

  google.maps.event.addListener(map, 'click', function(event) {
    startMarker = false;
    if (!startEnd.hasOwnProperty("lat2")) {
      createMarker(event.latLng);
    }
  });
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {

      console.log(results[i].place_id);
      // place_id = results[i].place_id;
      console.log('Result ' + JSON.stringify(results[i]));
      createMarker(results[i]);
    }
    console.log('Number of Results ' + results.length);
  }
}

function createMarker(latLng) {
  // var placeLoc = place.geometry.location;
  if (!startEnd.hasOwnProperty("lat1")) {
    startEnd.lat1 = latLng.lat();
    startEnd.lng1 = latLng.lng();
  } else if (!startEnd.hasOwnProperty("lat2")) {
    startEnd.lat2 = latLng.lat();
    startEnd.lng2 = latLng.lng();

    calcRoute(); // send in specific params later

    $.post("/api/coord", startEnd,
    function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
  }

  var marker = new google.maps.Marker({
    map: map,
    position: latLng
  });

  // google.maps.event.addListener(marker, 'click', function() {
  //   infowindow.setContent(place.name);
  //   infowindow.open(map, this);
  // });
}
