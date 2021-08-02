$( document ).ready(function() {
});

//^not sure if i need this tbh
//GLOBAL VARIABLES START
var startButton = document.getElementById("start-btn");
var startPage = document.getElementById("start-page");
var triviaPage = document.getElementById("trivia-page");
var submitBtnEl = document.getElementById("submit-button");

///////////vars for trying to do one question perpage
////////////////////////////////////////////////////////////////////////////////////
var choices = [];
var questions = [];
var correctChoices = [];
var questionEl = document.getElementById("question");
var choiceA = document.getElementById("btnA");
var choiceB = document.getElementById("btnB");
var choiceC = document.getElementById("btnC");
var choiceD = document.getElementById("btnD");

//GLOBAL VARIABLES END
//REFACTOR HERE: when MVP is 100% to add dropdown functionality we must include some foundation files in the js, 
//var dropDown = new Foundation.DropdownMenu(element, options);
//initialize time at 60 seconds
//var time = 60; 
//function to get trivia category 
function fetchQuestion(){
    var apiUrl="https://opentdb.com/api.php?amount=10";
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                loadTriviaQuestions(data);
                console.log(data);
            });
        }
        else{
            alert("Error" + response.statusText);
        }
    });
};

//REFACTOR HERE: when MVP is 100% add this function to display categories on main page
function displayCategories(category){
    var categoryEl = document.getElementById("categories");    
    //document.createElement("btn").setAttribute("id = cat-btn");
    categoryEl.textContent = category;
};

//function to display trivia question page...similar to how the highscore page funciton will work
function loadTriviaQuestions(data){
    var triviaPage = document.getElementById("trivia-page");
    //removeing hidden class and making page active
    triviaPage.classList.remove("hidden");
    triviaPage.classList.add("activeInfo");
   
    //REFACTOR HERE: clear off previous question
    //questionContainer.innerHTML = "";
    //REFACTOR HERE: IDEALLY, ID LIKE THIS TO BE A LOOP BC CHOICES CAN RANGE FROM 2-3 OPTIONS
    //console.log(data.results[0].incorrect_answers.length);
    //for(var i = 0; i < choicesArr.length; i++){
        //console.log(data.results[i].question);
        //console.log(choicesArr[i]);
        //var choiceEl = document.getElementById("choice" + i);
        // var choice = data.results[0].incorrect_answers[i];
        //choiceEl.textContent = choice;
        //console.log(choice);
   // };    

   //use push methods to load trhese arrs
   //iterate thru all 10 questions and their possible choices
   for(var i = 0; i < data.results.length; i++){
    correctChoices.push(data.results[i].correct_answer);
    questions.push(data.results[i].correct_answer);
    //new arr[] logic tesing:
    for(var j = 0; j < 3; j++){
        choices.push(data.results[i].incorrect_answers[j]);
    }
    //////////////alternate logic for displaying questions on pgae
    var dataChoice1 = data.results[i].incorrect_answers[0];
    var dataChoice2 = data.results[i].incorrect_answers[1];
    var dataChoice3 = data.results[i].incorrect_answers[2];
    var dataCorrectChoice = data.results[i].correct_answer;
    var question = JSON.stringify(data.results[i].question);

    var questionContainer = $("#question-container");
   
    questionContainer.append('<h2 id = "question">'+(i+1)+")."+question+'</h2>');
    //stringify needed to get the special chars in the html
    questionContainer.append('<input name = "answer'+i+'" type = "radio"><label id = "choice1">'+ dataChoice1+'</label></input>');
    questionContainer.append('<input name = "answer'+i+'" type = "radio"><label id = "choice2">'+dataChoice2+'</label></input>');
    questionContainer.append('<input name = "answer'+i+'" type = "radio"><label id = "choice3">'+dataChoice3+'</label></input>');
    //REFACTOR HERE: FOR TESTING ONLY: CHOICE 4 WILL ALWAYS BE THE CORRECT OPTION
    questionContainer.append('<input name = "answer'+i+'" type = "radio"><label id = "choice3">'+dataCorrectChoice+'</label></input>');

    //$("#submit-button").on("click", checkAnswers);
}
    questionContainer.append('<button class="success button" id="submit-button" type="submit">Submit Now!</button>');    
    //console.log("questions: "+questions);
    //console.log("correct ansers: "+correctChoices);
    //console.log("incorrect anseers:" + choices);

    //var possibleAnswers = correctChoices.concat(choices);
    //array of both correct and incorrect answers
    //console.log(possibleAnswers);
    //This function and the above arrs are temporarily out of order
    //displayTriviaQuestions(questions, correctChoices, choices);
    //Button to for event listner to check answers at the end of 10 questions
    //var submitBtnEl = '<button class="success button" id="submit-button" type="submit">Submit Now!</button>';
    questionContainer.append(submitBtnEl);
    //submitBtnEl.addEventListener("click", function(){
     //   checkAnswers(data);
    //});
    //$("#submit-button").on("click", checkAnswers(data));
    $("#submit-button").on("click", checkAnswers);
    
    //submitBtnEl.addEventListener("click", checkAnswers);
};

//function to check answers
function checkAnswers(event, data){
    event.preventDefault();
    //console.log(event.target);
    var correctAns;
    var inputAns = [];
    var corrects = 0;
    var incorrects = 0;
    var blanks = 0;
    inputAns= $('input[type=radio]:checked +label').text();
    console.log(inputAns);
    //hardcoding 10 in here bc still havent figured out how to load api data into arrays
    for(var i = 0; i < 10; i++){
        //inputAns = $('input[type=radio'+i+']:checked +label').text();
        //console.log(correctChoices[i]);
       if(inputAns[i] === correctChoices[i]){
          console.log("correct");
          console.log(correctChoices[i]);
          console.log(inputAns);
        }
        //else if(inputAns === ""){
        // alert("you must answer all questions");
        // }
        else if(inputAns !== correctChoices[i]){
          console.log("wrong!");
        }
    }
    //console.log(inputAns);
};

//function to determine timer state
// function timer(){
//     timer.textContent
// };

function startGame(){
    fetchQuestion();
    hide(startPage);
    display(triviaPage);
};

///////////////////////////event listeners///////////////////////////
startButton.addEventListener("click", startGame);
//startButton.addEventListener("click", hideStart);

//hides element
function hide(element) {
    element.style.display = "none";
};

//displays element
function display(element) {
    element.style.display = "block";
};

// conner working on logic you can place where you like 
// var highScoresBtn = document.getElementById("highscores-btn")
// highScores.addEventListener("click", highScores)
// function highScores ()

