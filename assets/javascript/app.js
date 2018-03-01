var correctSelections = 0;
var wrongSelections = 0;
var questionNumber = 0; 



window.onload = function () {
  $("#start").click(begin);                                                                              // run begin function once start is clicked
 
  $(".answerChoice").on("click", function () {                                                           // run following code when an answer choice is picked
    if ((questionArray[questionNumber].correctAnswer) === (this.getAttribute("data-selection-type"))) {  // has correct answer been selected?$(this).data("slection-type")     
      correctSelections++;
      $("#result").show();
      $("#result").text(`Good Job!!!`);
      $("#score").html(`Corerct Answers: ${correctSelections} <br> Wrong Answers: ${wrongSelections}`);
    }
    else {                                                                                               // has wrong answer been selected?
      wrongSelections++;
      $("#result").show();
      $("#result").text(`Wrong!!!`);
      $("#score").html(`Corerct Answers: ${correctSelections} <br> Wrong Answers: ${wrongSelections}`);
    }
    questionNumber++;
    $("#questionAndAnswersDiv").hide();
    if (questionArray.length > questionNumber) {                                                         //game is not over yet, keep playing        
      setTimeout(displayNextQuestion, 3000);
    }
    else {                                                                                               //out of questions, game is over
      correctSelections = 0;
      wrongSelections = 0;
      $("#result").text("Great, Want to play again?");
      $("#start").show();
    }
  });

  $("#start").click(begin);

};

function begin() {                                                                                      // set up initial trivia
  questionNumber = 0;
  stopwatch.stop();
  stopwatch.reset();
  stopwatch.start();
  questionArray[questionNumber].display();
  $("#start").hide();                                                                                   // already been clicked, hide it now
  $("#result").empty();                                                         
  $("#score").empty();
  $("#questionAndAnswersDiv").show();

}

function displayNextQuestion() {                                                                        //to display next question usuall called by setTimer(3secs)
  questionArray[questionNumber].display();
  stopwatch.stop();
  stopwatch.reset();
  stopwatch.start();
  $("#result").hide();
  $("#questionAndAnswersDiv").show();
}



function createQuestion(questionAsked, option1, option2, option3, option4, correctAnswer) {           //creates objects for each of my questions
  var question = {

    correctAnswer: correctAnswer,

    display: function () {
      $("#triviaDisplay").text(questionAsked);                                                        // @to-do: add if statements for cases with less than 4 options. ie option3&4 undefined
      $("#A").text(`A: ${option1} `);
      $("#B").text(`B: ${option2} `);
      $("#C").text(`C: ${option3} `);
      $("#D").text(`D: ${option4} `);
    },
  };
  return question;
}

var question0 = createQuestion("What is the name of the country that Black Panther is from?", "Wakanda", "Nigeria", "Kenya", "Dunbar", "A");
var question1 = createQuestion("What are the king's guards called?", "King's gurd", "Trusted Ones", "Dora Milaje", "Night's Watch", "C");
var question2 = createQuestion("What is the name of the metal that is vital for the survival of the Black Panther's kingdom?", "Circanium", "Copper", "Silicon", "Vibranium", "D");
var question3 = createQuestion("What is Black Panther's name?", "Bruce", "Oladipo", "T'Challa", "Ogunmola", "C");
var question4 = createQuestion("What is the name of the actor that  plays Black Panther?", "Chadwick Boseman", "Micheal B Jordan", "Daniel Kaluuya", "Martin Freeman", "A");
var question5 = createQuestion("Black panther has been in the Marvel universe longer then some expect, which X-Men member was Black Panther married to?", "Mystique", "Rogue", "Storm", "Jubilee", "C");
var question6 = createQuestion("What is the name of Black Panther's sister?", "Shuri", "Laura", "Nakia", "Okoye", "A");

var questionArray = [question0, question1, question2, question3, question4, question5, question6];



var timeInterval;
var clockRunning = false;

//  stop watch
var stopwatch = {                                                                                     // handles the timer
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
    if (stopwatch.time === 0) {                                                                         // out of time!
    wrongSelections++;
    questionNumber++;
    $("#questionAndAnswersDiv").hide();
      if (questionArray.length > questionNumber) {                                                      // game is still going keep playing
        $("#result").show();
        $("#result").text(`Sorry you ran out of time`);
        $("#score").html(`Corerct Answers: ${correctSelections} <br> Wrong Answers: ${wrongSelections}`);
        setTimeout(displayNextQuestion, 3000);
      }
      else {                                                                                            //game is over
        $("#score").html(`Corerct Answers: ${correctSelections} <br> Wrong Answers: ${wrongSelections}`);
        setTimeout(displayNextQuestion, 3000);
        correctSelections = 0;
        wrongSelections = 0;
        $("#result").show();
        $("#result").text("Great, Want to play again?");
        $("#start").show();
      }
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
