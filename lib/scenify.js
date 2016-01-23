//var Promise = require('promise').Promise();
//var promise = new Promise();
var rp = require('request-promise')

var scenify = {}


function avgDistance(obj) {
    var coord = {}
    coord.lat = (obj.lat1 + obj.lat2) / 2
    coord. long = (obj.long1 + obj.long2) / 2
    return coord;
}

function genNearbyLocations(loc) {
rp('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=45.50, -73.56&radius=5000&key=AIzaSyBf75Ehd-nS0dziMXpwe_4ZAqTuanNcICQ&types=point_of_interest|museum')
.then(function(res){
    var locations = JSON.parse(res).results;
    var places = []
locations.forEach(function(place) {
places.push(place.photos[0].html_attributions)
})
    console.log(places)
})
}

scenify.process = function(loc, cb) {
    return genNearbyLocations(avgDistance(loc))
}
























module.exports = scenify;
