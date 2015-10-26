    var Firebase = require('firebase');
    var _ = require('lodash');

    var firebase = new Firebase("https://fiery-inferno-7517.firebaseio.com/");
    var users = [];

    var stats = {
        totalNumberOfEvents : -4,
        totalNumberOfSpheroEvents : -1,
        totalNumberOfGameEvents : -1,
        totalNumberOfLampEvents : -1,
        totalNumberOfUserEvents : -1
    };


    if (require.main === module) {

        console.log("Start");

        firebase.child("gadgets/sphero").on("value", function(snapshot){
            if(snapshot.val()){
                stats.totalNumberOfSpheroEvents++;
                stats.totalNumberOfEvents++;
                firebase.child("stats").set(stats);
            }
        });

        firebase.child("gadgets/game").on("value", function(snapshot){
            if(snapshot.val()){
                stats.totalNumberOfGameEvents++;
                stats.totalNumberOfEvents++;
                firebase.child("stats").set(stats);
            }
        });

        firebase.child("gadgets/lamp").on("value", function(snapshot){
            if(snapshot.val()){
                stats.totalNumberOfLampEvents++;
                stats.totalNumberOfEvents++;
                firebase.child("stats").set(stats);
            }
        });

        firebase.child("users").on("value", function(snapshot){
            if(snapshot.val()){
                stats.totalNumberOfEvents++;
                stats.totalNumberOfUserEvents++;
                firebase.child("stats").set(stats);
            }
        });
    }