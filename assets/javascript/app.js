// Pseudocode


// create variables to capture user input.

$("#formSubmission").on("click", function(event){
  event.preventDefault();

var nameOfTrain = $("#trainName").val().trim();
var WhereTo = $("#destination").val().trim();
var trainOne = $("#firstTrain").val().trim();
var freq = $("#frequency").val().trim();

console.log(nameOfTrain);
console.log(WhereTo);
console.log(trainOne);
console.log(freq);

});
