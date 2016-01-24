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

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({
       suppressMarkers: true
   });

  infowindow = new google.maps.InfoWindow();
  directionsDisplay.setMap(map);

  google.maps.event.addListener(map, 'click', function(event) {
    startMarker = false;
    if (!startEnd.hasOwnProperty("lat2")) {
      createMarker2(event.latLng);
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

function calcRoute() {

    var waypts = [];

    stop = new google.maps.LatLng(45.4985219, -73.5794001)
    waypts.push({
        location: stop,
        stopover: true
    });
    createMarker(stop);

    stop = new google.maps.LatLng(45.5046334, -73.5516726)
    waypts.push({
        location: stop,
        stopover: true
    });
    createMarker(stop);

    stop = new google.maps.LatLng(45.5044753, -73.577584)
    waypts.push({
        location: stop,
        stopover: true
    });
    createMarker(stop);

    start = new google.maps.LatLng(startEnd.lat1, startEnd.lng1);
    end = new google.maps.LatLng(startEnd.lat2, startEnd.lng2);

    createMarker(start);
    createMarker(end);

    var request = {
        origin: start,
        destination: end,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.DirectionsTravelMode.WALKING
    };

    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
        }
    });
}

function createMarker(latlng) {

    var marker = new google.maps.Marker({
        position: latlng,
        map: map

    });
}

function createMarker2(latLng) {
  // var placeLoc = place.geometry.location;
  if (!startEnd.hasOwnProperty("lat1")) {
    startEnd.lat1 = latLng.lat();
    startEnd.lng1 = latLng.lng();
  } else if (!startEnd.hasOwnProperty("lat2")) {
    startEnd.lat2 = latLng.lat();
    startEnd.lng2 = latLng.lng();

    // console.log(JSON.stringify(startEnd));
    calcRoute();

    // $.post("http://jying.ca:6969/api/coord", startEnd,
    // function(data, status){
    //     alert("Data: " + data + "\nStatus: " + status);
    // });
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
