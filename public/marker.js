// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map;
var infowindow;

function initMap() {
  var montreal = {lat: 45.50, lng: -73.57};

  map = new google.maps.Map(document.getElementById('map'), {
    center: montreal,
    zoom: 15
  });

  infowindow = new google.maps.InfoWindow();

  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: montreal,
    radius: 5000,
    types: ['point_of_interest|museum']
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      // console.log(results[i].name);
      console.log('Result ' + JSON.stringify(results[i]));
      createMarker(results[i]);
    }
    console.log('Number of Results ' + results.length);
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  console.log('placeLoc ' + placeLoc);
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
