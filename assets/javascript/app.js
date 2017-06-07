
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
                    // GLOBAL VARIABLES. 
//----------------------------------------------------------------------------------
var database = firebase.database();

var nameOfTrain, whereTo, firstTrainTime, freq;


//----------------------------------------------------------------------------------
database.ref().on("value", function(snapshot) { // This function is the setting function from Firebase.

console.log(snapshot.val());

nameOfTrain = snapshot.val().train;
whereTo = snapshot.val().destination;
firstTrainTime = snapshot.val().departure;
freq = snapshot.val().frequency;

//Dynamically inserts table rows with concatenated variables.
var tableRow =
$("<tr><td>" + nameOfTrain
+ "</td><td>" + whereTo
+ "</td><td>" + freq
+ "</td><td>" + // calculation function (variable) for NEXT ARRIVAL field goes here.
+ "</td><td>" + // calculation function (variable) for MINUTES AWAY field goes here.
+ "</td></tr>");

// appends tablename (user data) into trainTable table on DOM.
$("#trainTable").append(tableRow);

}); //Setting function endtag

//----------------------------------------------------------------------------------

// onclick for submit buttons.
$("#formSubmission").on("click", function(event){
  event.preventDefault();

//Pulls user input data from fields.
nameOfTrain =    $("#trainName").val().trim();
whereTo =        $("#destination").val().trim();
firstTrainTime = $("#firstTrain").val().trim();
freq =           $("#frequency").val().trim();

                //Math manipulation of First Train Arrival user input.
//----------------------------------------------------------------------------------
var firstHourSliced = firstTrainTime.slice(0, 2); //returns only hours of time input
var firstHourParsed = parseInt(firstHourSliced, 10);

var firstMinutesSliced = firstTrainTime.slice(3, 5); //returns only minutes of time input
var firstMinutesParsed = parseInt(firstMinutesSliced, 10);

var x = ((firstHourParsed * 60) + firstMinutesParsed);
// console.log("this is x " + x);
//----------------------------------------------------------------------------------

              //Math manipulation of Frequency user input.
//----------------------------------------------------------------------------------
var freqHoursSliced = freq.slice(0, 2);
var freqHoursParsed = parseInt(freqHoursSliced, 10);
// console.log("this is freqHoursParsed " + freqHoursParsed);

var freqMinutesSliced = freq.slice(3, 5);
var freqMinutesParsed = parseInt(freqMinutesSliced, 10);
// console.log("this is freqMinutesParsed " + freqMinutesParsed);

var y = ((freqHoursParsed * 60) + freqMinutesParsed);
// console.log("this is y " + y);
//----------------------------------------------------------------------------------

var calculated = x + y
console.log("this is the first arrival + frequency in minutes " + calculated);

// function calcTime (){
//   // var timeResult =
// };

//Sets user data to Firebase.
database.ref().set({
  train: nameOfTrain,
  destination: whereTo,
  departure: firstTrainTime,
  frequency: freq
})



// clears user input fields.
$("#trainName").val(' ');
$("#destination").val(' ');
// $("#firstTrain").val(' ');
// $("#frequency").val(' ');
//----------------------------------------------------------------------------------



}); //Onclick function endtag
