var startButton = document.getElementById("start-btn");
var startPage = document.getElementById("start-page");
var triviaPage = document.getElementById("trivia-page");
var submitTriviaBtn = document.getElementById("submit-button");
var highScoresPage = document.getElementById("high-scores-page");
var timerEl = document.getElementById("timer");
var finalScoreEl = document.getElementById("finalScore");
var savedHighScores = document.getElementById("savedHighScores");
var finalTime = document.getElementById("finalTime");
var initialInputPage = document.getElementById("initial-input-page");
var initialsInputEl = document.getElementById("initials-input");
var initialSubmitBtn = document.getElementById("initialsSubmit");
var scoresContainer = document.getElementById("highscores");
//var modal1 = document.getElementById("Modal1");
//var closeModal = document.getElementById("close-button");
var highScoresBtn = document.getElementById("highscores-btn");
var choices = [];
var questions = [];
var correctChoices = [];
var points;

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
    questionContainer.append('<input name = "answer'+i+'" type = "radio"><label id = "choice4">'+dataCorrectChoice+'</label></input>');
}
    //questionContainer.append('<button class="success button" id="submit-button" type="submit">Submit Now!</button>');    
    //questionContainer.append(submitBtn);

    //$("#submit-button").on("click", checkAnswers);
};

//function to check answers
function checkAnswers(event){
    points = 0;
    //stopTimer();
    event.preventDefault();
    clearInterval(timerEl);
    var userInput = document.querySelectorAll("input[type=radio]:checked");
    //console.log(userInput.length);
    if(userInput.length === 10){
    for(var i = 0 ; i < 10; i++){
        //console.log(userInput[i].nextSibling);
       //console.log(correctChoices[i]);
        if(userInput[i].nextSibling.textContent === correctChoices[i]){
            points ++;
            console.log("correct");
        }
        else if(userInput[i].nextSibling.textContent !== correctChoices[i]){
            console.log("wrong!");
        }
        }
    }
    else if(userInput.length < 10){
    //display(modal1);
    //submitTriviaBtn.attributes.add('data-reveal = "Modal1"');
    return;
}
 displayInputPage(points);
};

function displayInputPage(){
    hide(highScoresPage);
    hide(triviaPage);
    display(initialInputPage);
    finalScoreEl.textContent = "Your Score: " + points;
    storeScores();
;}

//function to display all scores
var savedScores = [];
function showScores(){
    hide(triviaPage);
    hide(initialInputPage);
    display(highScoresPage);

    for(var i = 0; i < savedScores.length; i++){
        var scoreItem = document.createElement("div");
        console.log(scoreItem);
        scoreItem.textContent = savedScores[i].initials +" final Score: "+savedScores[i].userScore +" points";
        scoresContainer.append(scoreItem);
    }
};

//function to staore highscores into localstorage
function storeScores(){
    var initValue = initialsInputEl.value.trim();
    if(initValue){
        var userScore = {
            initials: initialsInputEl.value.trim(),
            userScore: finalScore.textContent
        }
        initialsInputEl.value ="";
        savedScores = JSON.parse(localStorage.getItem("high scores")) || [];
        savedScores.push(userScore);
        localStorage.setItem("high scores", JSON.stringify(savedScores));
        showScores();
    }
    console.log(userScore);

};

submitTriviaBtn.addEventListener("click", checkAnswers);
initialSubmitBtn.addEventListener("click", displayInputPage );
highScoresBtn.addEventListener("click", toHighScores);


function stopTimer(){
    clearInterval();
};

//function to initialize the game on start button click
function startGame(){
    var count = 60;
    //nested function to start timer
    var startTimer = setInterval(function(){
        count --;
        timerEl.textContent = count;
        if(count <= 0){
            clearInterval(startTimer);
        }
    }, 1000);
    fetchQuestion();
    hide(startPage);
    display(triviaPage);
};

// function shuffle(arr){
//     var index = arr.length, temp, randIndex;
//     while(0 !== index)
// };

startButton.addEventListener("click", startGame);

//hides element
function hide(element) {
    element.style.display = "none";
};

//displays element
function display(element) {
    element.style.display = "block";
};

function toHighScores(){
    hide(startPage);
    display(highScoresPage);
};

// conner working on logic you can place where you like 
// var highScoresBtn = document.getElementById("highscores-btn")
// highScores.addEventListener("click", highScores)
// function highScores ()

// var redoButton = document.getElementById("redo-btn")
//reset local variables

$("#redo-btn").click(function(){
    document.location.reload(true);
  });
// redoButton.addEventListener("click", restart);

