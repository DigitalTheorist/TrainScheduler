

//THIS IS APP1

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBjq2Vj8MkTlkdUkIh7DNZx8aXxXi8ATkg",
  authDomain: "train-scheduler-d8c5c.firebaseapp.com",
  databaseURL: "https://train-scheduler-d8c5c.firebaseio.com",
  projectId: "train-scheduler-d8c5c",
  storageBucket: "train-scheduler-d8c5c.appspot.com",
  messagingSenderId: "765894655054"
};

firebase.initializeApp(config);

                    // INITIALIZE GLOBAL VARIABLES.
//----------------------------------------------------------------------------------
var database = firebase.database();

var nameOfTrain
var whereTo
var firstTrainTime
var freq

                  //FIREBASE RETRIVAL FUNCTION.
//----------------------------------------------------------------------------------
database.ref("user-train-input").on("child_added", function(childSnapshot, prevChildKey) { // This function is the setting function from Firebase.

// console.log(childSnapshot.val());

nameOfTrain = childSnapshot.val().train;
whereTo = childSnapshot.val().destination;
firstTrainTime = childSnapshot.val().departure;
freq = childSnapshot.val().frequency;

console.log(firstTrainTime);
console.log(freq);

var a = moment(firstTrainTime, "HH:mm");
console.log("this is firstTrainTime " + a);
//
var b = moment(freq, "minutes");
console.log("this is freq " + b)

var nextArrival = moment(a, "HH:mm").add(b, "minutes").format("HH:mm");
console.log(nextArrival);


//Dynamically inserts table rows w/ concatenated variables.
var tableRow =
$ ("<tr><td>" + nameOfTrain
+ "</td><td>" + whereTo
+ "</td><td>" + freq
+ "</td><td>" + nextArrival // calculation function (variable) for NEXT ARRIVAL field goes here.
+ "</td><td>" + // calculation function (variable) for MINUTES AWAY field goes here.
+ "</td></tr>");

// appends tablename (user data) into trainTable table on DOM.
$("#trainTable").append(tableRow);

}, function (errorObject) {
console.log("Data not read from Firebase");

}); //Setting function endtag

                //FIREBASE PUSH FUNCTION.
//----------------------------------------------------------------------------------
// onclick for submit buttons.
$("#formSubmission").on("click", function(event){
  event.preventDefault();

//Pulls user input data from fields.
nameOfTrain =    $("#trainName").val().trim();
whereTo =        $("#destination").val().trim();
firstTrainTime = $("#firstTrain").val().trim();
freq =           $("#frequency").val().trim();
// console.log("this is freq " + freq);

// firstTrainTime = firstTrainTime.slice(0, 2) + firstTrainTime.slice(3);
// console.log("firstTrainTime " +  firstTrainTime);

// freq = freq.slice(0, 2) + freq.slice(3);
// console.log(freq);

//Sets user data to Firebase.
database.ref("user-train-input").push({
  train: nameOfTrain,
  destination: whereTo,
  departure: firstTrainTime,
  frequency: freq
});

// clears user input fields.
$("#trainName").val(' ');
$("#destination").val(' ');
// $("#firstTrain").val(' ');
// $("#frequency").val(' ');
//----------------------------------------------------------------------------------

}); //Onclick function endtag
