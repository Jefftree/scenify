// function calcRoute(x1, y1, x2, y2) {
//   var start = new google.maps.LatLng(x1, y1);
//   var end = new google.maps.LatLng(x2, y2);
//   var request = {
//     origin: start,
//     destination: end,
//     travelMode: google.maps.TravelMode.WALKING
//   };
//   directionsService.route(request, function(response, status) {
//     if (status == google.maps.DirectionsStatus.OK) {
//       directionsDisplay.setDirections(response);
//       directionsDisplay.setMap(map);
//     } else {
//       alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
//     }
//   });
// }
