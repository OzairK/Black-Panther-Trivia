var correctSelections = 0;
var wrongSelections = 0;

window.onload = function () {


  $(".answerChoice").on("click", function () {
    if ((questionArray[questionNumber].correctAnswer) === (this.getAttribute("data-selection-type"))) {  // $(this).data("slection-type")
      correctSelections++;
      $("#result").show();
      $("#result").text(`Good Job!!!`);
      $("#score").html(`Corerct Answers: ${correctSelections} <br> Wrong answers: ${wrongSelections}`);
    }
    else {
      wrongSelections++;
      $("#result").show();
      $("#result").text(`Wrong!!!`);
      $("#score").html(`Corerct Answers: ${correctSelections} <br> Wrong answers: ${wrongSelections}`);
    }
    questionNumber++;
    $("#questionAndAnswersDiv").hide();
    if (questionArray.length > questionNumber) {
      setTimeout(displayNextQuestion, 3000);
    }
    else {
      correctSelections = 0;
      wrongSelections = 0;
      $("#result").text("Great, Want to play again?");
      $("#start").show();
    }

  });


  $("#start").click(begin)

};

function displayNextQuestion() {
  questionArray[questionNumber].display();
  stopwatch.stop();
  stopwatch.reset();
  stopwatch.start();
  $("#result").hide();
  $("#questionAndAnswersDiv").show();
}

var questionNumber = 0; // question1 = 0

function createQuestion(questionAsked, option1, option2, option3, option4, correctAnswer) {
  var question = {

    correctAnswer: correctAnswer,

    display: function () {
      $("#triviaDisplay").text(questionAsked); // @to-do: add if statements for cases with less that 4 options. ie option3&4 undefined
      $("#A").text(`A: ${option1} `);
      $("#B").text(`B: ${option2} `);
      $("#C").text(`C: ${option3} `);
      $("#D").text(`D: ${option4} `);
    },
  };
  return question;
}


function displayQuestion() {
  questionArray[questionNumber].display();
}



var question0 = createQuestion("What is the name of the country that Black Panther is from?", "Wakanda", "Nigeria", "Kenya", "Dunbar", "A");
var question1 = createQuestion("What are the king's guards called?", "King's gurd", "Trusted Ones", "Dora Milaje", "Night's Watch", "C");
var question2 = createQuestion("What is the name of the metal that is vital for the survival of the Black Panther's kingdom?", "Circanium", "Copper", "Silicon", "Vibranium", "D");
var question3 = createQuestion("What is Black Panther's name?", "Bruce", "Oladipo", "T'Challa", "Ogunmola", "C");
var question4 = createQuestion("What is the name of the actor that  plays Black Panther?", "Chadwick Boseman", "Micheal B Jordan", "Daniel Kaluuya", "Martin Freeman", "A");
var question5 = createQuestion("Black panther has been in the Marvel universe longer then some expect, which X-Men member was Black Panther married to?", "Mystique", "Rogue", "Storm", "Jubilee", "C");
var question6 = createQuestion("What is the name of Black Panther's sister?", "Shuri", "Laura", "Nakia", "Okoye", "A");


var questionArray = [question0, question1, question2, question3, question4, question5, question6];



function begin() {
  questionNumber = 0;
  questionArray[questionNumber].display();
  $("#start").hide();
  $("#questionAndAnswersDiv").show();
  stopwatch.start();
}


var timeInterval;

var clockRunning = false;

//  Our stopwatch object.
var stopwatch = {

  time: 30,



  reset: function () {

    stopwatch.time = 30;
    $("#display").text("00:30");

  },

  start: function () {

    if (!clockRunning) {
      clearInterval(timeInterval);
      timeInterval = setInterval(stopwatch.decrament, 1000);
      clockRunning = true;
    }

  },
  stop: function () {
    clearInterval(timeInterval);
    clockRunning = false;
  },


  decrament: function () {
    stopwatch.time--;
    var convertedTime = stopwatch.timeConverter(stopwatch.time);
    $("#display").text(convertedTime);
    if (stopwatch.time === 0) {
      wrongSelections++;
      questionNumber++;
    $("#questionAndAnswersDiv").hide();
    $("#result").show();
    $("#result").text(`Sorry you ran out of time`);
    $("#score").html(`Corerct Answers: ${correctSelections} <br> Wrong answers: ${wrongSelections}`);
    setTimeout(displayNextQuestion, 3000);

      // stopwatch.reset();
      // questionNumber++;
      // questionArray[questionNumber].display();
      // wrongSelections++;
      
      // $("#result").show();
      // $("#result").text(`ooops you ran out of time!`);
      // $("#score").html(`Correct Answers: ${correctSelections} <br> Wrong answers: ${wrongSelections}`);
      // $("#result").text(`ooops you ran out of time!`);
      // $("#score").html(`Correct Answers: ${correctSelections} <br> Wrong answers: ${wrongSelections}`);
    }
  },


  timeConverter: function (t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};












// create questios with options in an object. with options
// display question one with a timer of 30 seconds with all the options
// if question is picked, see if it is the right question
// then move onto the rightquestion
// @todo see if i can get the html to change, and still have the onclick functions working, refer to class notes.
// @todo add hover over paragraph in css


//goals: how can i make it more dynamic. like have a question with 2 answer instead of one? put answers in an array?
