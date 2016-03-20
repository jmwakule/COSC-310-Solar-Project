/**
 * Created by Arya on 2/6/ s
 * */

var map;
//var src = 'https://rawgit.com/jmwakule/COSC-310-Solar-Project/f51eabd45babd46b0e268e8c3291fc70b816cf0e/outlines.kml';
var google = {};
function initMap() {
    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv, {
        center: {lat: 49.8801, lng: -119.4436},
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        labels: true

    });
    map.setTilt(0);
    map.data.loadGeoJson('correctGeoJson.json');
    map.data.setStyle(function () {
        var color = 'orange';
        return ({
            fillColor: color,
            strokeColor: color,
            strokeWeight: 2
        });
    });

    map.data.addListener('mouseover', function (event) {
        map.data.revertStyle();
        map.data.overrideStyle(event.feature, {strokeWeight: 4, fillOpacity: 0.5});
    });

    map.data.addListener('mouseout', function (event) {
        map.data.revertStyle();

    });
    map.data.addListener('click', function (event) {
            var content = event.feature.getProperty("Name");
            var geometry = event.feature.getGeometry("coordinates");
            var area;
            var error = "";
            var infoId = document.getElementById("building_id");
            var infoArea = document.getElementById("area");
            var geoArray;
            var geoPoly;
            var latArray;
            var sumArea = 0;
            geoArray = geometry.getArray();


            for (var i = 0; i < geoArray.length; i++) {
                geoPoly = geoArray[i];
                for (var j = 0; j < geoPoly.getLength(); j++) {
                    latArray = geoPoly.getAt(j).getArray();
                    area = google.maps.geometry.spherical.computeArea(latArray);

                    sumArea += area;
                }

                var color = 'orange';
                if (sumArea > 0 && sumArea < 100) {
                    color = '#66d9ff';
                    map.data.overrideStyle(event.feature, {strokeWeight: 3, fillColor: color, strokeColor: 'grey'});
                }
                else if (sumArea > 100 && sumArea < 200) {
                    color = '#66ff66';
                    map.data.overrideStyle(event.feature, {strokeWeight: 3, fillColor: color, strokeColor: 'grey'});
                }
                else if (sumArea > 200 && sumArea < 500) {
                    color = '#ffff1a';
                    map.data.overrideStyle(event.feature, {strokeWeight: 3, fillColor: color, strokeColor: 'grey'});
                }
                else if (sumArea > 500 && sumArea < 1000) {
                    color = '#ffd11a';
                    map.data.overrideStyle(event.feature, {strokeWeight: 3, fillColor: color, strokeColor: 'grey'});
                }
                else if (sumArea > 1000) {
                    color = '#E65100';
                    map.data.overrideStyle(event.feature, {strokeWeight: 3, fillColor: color, strokeColor: 'grey'});
                }

            }


            // output = latArray.getAt(0);
            //var area = google.maps.spherical.computeArea(geoArray[0].getPath());


            infoId.innerHTML = "Building ID: " + content;
            infoArea.innerHTML = "Area: " + sumArea.toFixed(3) + " m<sup>2</sup>";
        }
    )
    ;


}

//function loadKmlLayer(src, map) {
//    var kmlLayer = new google.maps.KmlLayer(src, {
//        suppressInfoWindows: false,
//        preserveViewport: false,
//        map: map
//
//    });
//    google.maps.event.addListener(kmlLayer, 'click', function (event) {
//
//        var content = event.featureData.infoWindowHtml;
//
//        var info = document.getElementById("info");
//        info.innerHTML = content;
//
//    });
//
//}
