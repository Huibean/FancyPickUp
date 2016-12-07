if (Number.prototype.toRadians === undefined) {
    Number.prototype.toRadians = function() { return this * Math.PI / 180; };
}

var EARTH_R = 6371e3; // metres

var geoCalculator = {
  calDistance: function(position1, position2) {
    console.log("position1: ", position1)
    console.log("position2: ", position2)
    var φ1 = position1.latitude.toRadians();
    var φ2 = position2.latitude.toRadians();
    var Δφ = (position2.latitude-position1.latitude).toRadians();
    var Δλ = (position2.longitude-position1.longitude).toRadians();

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = EARTH_R * c;
    console.log("distance: ", d)
    return d;
  }
};

export default geoCalculator;
