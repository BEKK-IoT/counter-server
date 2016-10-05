const Firebase = require('firebase');

const firebase = new Firebase("https://beacon-wallboard.firebaseio.com/");
const users = [];

let stats = {
    totalNumberOfEvents: -4,
    totalNumberOfSpheroEvents: -1,
    totalNumberOfGameEvents: -1,
    totalNumberOfLampEvents: -1,
    totalNumberOfUserEvents: -1,
    beacons: {}
};

if (require.main === module) {

    console.log("Start");

    firebase.child("gadgets/sphero").on("value", function (snapshot) {
        if (snapshot.val()) {
            stats.totalNumberOfSpheroEvents++;
            stats.totalNumberOfEvents++;
            firebase.child("stats").set(stats);
        }
    });

    firebase.child("gadgets/game").on("value", function (snapshot) {
        if (snapshot.val()) {
            stats.totalNumberOfGameEvents++;
            stats.totalNumberOfEvents++;
            firebase.child("stats").set(stats);
        }
    });

    firebase.child("gadgets/lamp").on("value", function (snapshot) {
        if (snapshot.val()) {
            stats.totalNumberOfLampEvents++;
            stats.totalNumberOfEvents++;
            firebase.child("stats").set(stats);
        }
    });

    firebase.child("users").on("value", function (snapshot) {
        if (snapshot.val()) {
            stats.totalNumberOfEvents++;
            stats.totalNumberOfUserEvents++;
            firebase.child("stats").set(stats);
        }
    });

    firebase.child("users").on("value", function (snapshot) {
        if (snapshot.val()) {
          var obj = snapshot.val();
          for(var name in obj) {
              var team = name;
              var registered = obj[name].registered;
              var beacons = obj[name].beacons;
              createBeaconStats(team, registered, beacons);
          }
        }
    });
}

let beaconsMap = [
  {name:"chocolateicecream", teams:new Map()},
  {name:"mint", teams:new Map()},
  {name:"blueberry", teams:new Map()},
  {name:"ice", teams:new Map()},
  {name:"mint1", teams:new Map()},
  {name:"lemon", teams:new Map()},
  {name:"bubblegum", teams:new Map()},
  {name:"merlot", teams:new Map()}
]

var createBeaconStats = function(team, registered, beacons) {
  for(var minor in beacons) {
    if(minor < beaconsMap.length && beacons[minor] > Date.now()-6000) {
      beaconsMap[minor].teams.set(team, minor)
    }
  }
}

setInterval(function() {
  sendBeaconStats();
  whipeBeaconsMap();
}, 3000);

var sendBeaconStats = function() {
  for(var beacon of beaconsMap) {
    stats.beacons[beacon.name] = beacon.teams.size;
  }
  firebase.child("stats").set(stats);
}

var whipeBeaconsMap = function() {
  for(var beacon of beaconsMap) {
    beacon.teams = new Map();
  }
}
