//var Promise = require('promise').Promise();
//var promise = new Promise();
var rp = require('request-promise')
var Promise = require('bluebird')
var http = require('http')
var fs = require('fs'),
    request = require('request');

var scenify = {}

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
//console.log(res.body)
    //console.log('content-type:', res.headers['content-type']);
    //console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};


function avgDistance(obj) {
    var coord = {}
    coord.lat = (obj.lat1 + obj.lat2) / 2
    coord. long = (obj.long1 + obj.long2) / 2
    return coord;
}

function genNearbyLocations(loc, cb) {
    rp('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + loc.lat + ',' + loc.long + '&radius=5000&key=AIzaSyBf75Ehd-nS0dziMXpwe_4ZAqTuanNcICQ&types=point_of_interest|museum')
        .then(function(res){
            var locations = JSON.parse(res).results;
            var places = []
            locations.forEach(function(place) {
                var object = {}
                object.ref = place.photos[0].photo_reference
                object.loc = place.geometry.location
                places.push(object)
            })
            console.log(places)
            var img_list = []

            places.forEach(function(obj, index, array) {
                var img = obj.ref;
                img_list.push(img)
                console.log(img)
                var url = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + img+ '&key=AIzaSyBLitVhje1ES3H2h7vDaj4vIjErtGPPJng'
                //console.log(url)
                    download(url, 'public/images/' + img + '.png', function(){
                        if (index == array.length - 1) {
                            console.log("done )")

                            var sceney = require('sceney')
                            sceney.rateImage(['http://jying.ca:6969/images/CmRdAAAABtTXL61Ovh9V6_6ONVN21E0OZjWp1tvAtISVgVag8RYJngvCTvE-N9dcEfUs1F--xrHuzcPwbaDtisqXv0N5L3uRh20WATT0lSupsX49CQPlPvIrzdCMirnsuZIS-DZ9EhC2zGIaDZ1gImWBNVIsDhsDGhSfQsF7mwgOvvIZ78WXn8u60BmrTQ.png'], function (ratings) {
                            console.log(ratings);
                            });
                            // do some shit with sceney and callback with ratings?

                            cb(null, "done :)")
                        }

                })

            //rp(url)
                //.then(function(res) {
                    //console.log(res)
                    //cb(null, res)
                    ////var download = function(uri, filename, callback){
                    ////request.head(uri, function(err, res, body){
                        ////console.log('content-type:', res.headers['content-type']);
                        ////console.log('content-length:', res.headers['content-length']);

                        ////request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    ////});
                    ////};

                    ////download('url', 'test.png', function(){
                    //////console.log('done');
                    ////});


                //})
            })
    })
}

scenify.process = function(loc, cb) {
    return genNearbyLocations(avgDistance(loc), cb)
}
























module.exports = scenify;
