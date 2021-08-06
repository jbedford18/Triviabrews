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
var modal1 = document.getElementById("Modal1");
var timerDiv = document.getElementById("time");
var breweriesList =  document.getElementById("breweries");
var startTimer;
// var closeModal = document.getElementById("close-button");
var highScoresBtn = document.getElementById("highscores-btn");
var questions = [];
var correctChoices = [];
var points;
var savedScores = JSON.parse(localStorage.getItem("high scores")) || [];

//function to get trivia category 
function fetchQuestion() {
    var apiUrl = "https://opentdb.com/api.php?amount=10";
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                loadTriviaQuestions(data);
                console.log(data);
            });
        }
        else {
            alert("Error" + response.statusText);
        }
    });
};

//REFACTOR HERE: when MVP is 100% add this function to display categories on main page
function displayCategories(category) {
    var categoryEl = document.getElementById("categories");
    //document.createElement("btn").setAttribute("id = cat-btn");
    categoryEl.textContent = category;
};


//function to display trivia question page...similar to how the highscore page funciton will work
function loadTriviaQuestions(data) {
    //array of all possible choices used to randomize choice order
    var choices = [];
 
   //use push methods to load trhese arrs
   //iterate thru all 10 questions and their possible choices
   for(var i = 0; i < data.results.length; i++){
   correctChoices.push(data.results[i].correct_answer);
   questions.push(data.results[i].correct_answer);

   var dataChoice1 = data.results[i].incorrect_answers[0];
   choices.push(dataChoice1);
   var dataChoice2 = data.results[i].incorrect_answers[1];
   choices.push(dataChoice2);
   var dataChoice3 = data.results[i].incorrect_answers[2];
   choices.push(dataChoice3);
   var dataCorrectChoice = data.results[i].correct_answer;
   choices.push(dataCorrectChoice);
   //stringify needed to get the special chars in the html
   var question = JSON.stringify(data.results[i].question);
   var questionContainer = $("#question-container");
   shuffle(choices);
   questionContainer.append('<h2 id = "question">'+(i+1)+")."+question+'</h2>');
    for(var j= 0 ; j < 4; j++){
        if(!choices[j]){
            choices[j] = "";
        }
        questionContainer.append('<input name = "answer'+i+'" type = "radio"><label id = "choice1">'+ choices[j]+'</label></input>');
    }
    choices = [];
    //console.log(choices);
} 
};

//var test = [0, 1, 2, 3];
//console.log(test);
//shuffle(test);
//console.log(test);
function shuffle(arr){
    var index = arr.length, randIndex;
    while(index !== 0){
        randIndex = Math.floor(Math.random()* index);
        index --;
        [arr[index], arr[randIndex]] = [arr[randIndex], arr[index]];
    }
    return arr;
};

//function to check answers
function checkAnswers(event){
    points = 0;
    //stopTimer();
    event.preventDefault();
    //timerDiv.style.display = "none"
    var userInput = document.querySelectorAll("input[type=radio]:checked");
    //console.log(userInput.length);
    if (userInput.length === 10) {
        for (var i = 0; i < 10; i++) {
            //console.log(userInput[i].nextSibling);
            //console.log(correctChoices[i]);
            if (userInput[i].nextSibling.textContent == correctChoices[i]) {
                points++;
                //console.log("correct");
            }
            else if (userInput[i].nextSibling.textContent != correctChoices[i]) {
                console.log(correctChoices[i]);
                //console.log("wrong!");
            }
        }
    }
    else if (userInput.length < 10) {
        display(modal1);
        //submitTriviaBtn.attributes.add('data-reveal = "Modal1"');
        return;
    }
    displayInputPage(points);
};

//function to stop timer
function stopTimer(){
    clearInterval(timerEl);
};

//function to display usernma einput page after submiting quiz
function displayInputPage() {
    hide(highScoresPage);
    hide(triviaPage);
    display(initialInputPage);
    finalScoreEl.textContent = "Final Score " + points;
    storeScores();  
};

//function to display all scores
function showScores() {
    hide(triviaPage);
    hide(initialInputPage);
    display(highScoresPage);
    for (var i = 0; i < savedScores.length; i++) {
        var scoreItem = document.createElement("div");
        //console.log(scoreItem);
        scoreItem.textContent = savedScores[i].initials + ": " + savedScores[i].userScore + " points";
        scoresContainer.append(scoreItem);
    }
};

//function to staore highscores into localstorage
function storeScores() {
    var initValue = initialsInputEl.value.trim();
    if (initValue) {
        var userScore = {
            initials: initialsInputEl.value.trim(),
            userScore: finalScore.textContent
        }
        initialsInputEl.value = "";
        savedScores.push(userScore);
        localStorage.setItem("high scores", JSON.stringify(savedScores));
        showScores();
        //console.log(userScore);
    }
};

//function to initialize the game on start button click
function startGame() {
    // var count = 60;
    // //nested function to start timer
    //  startTimer = setInterval(function () {
    //     count--;
    //     timerEl.textContent = count;
    //     if (count <= 0) {
    //         clearInterval(startTimer);
    //     }
    // }, 1000);
    fetchQuestion();
    hide(startPage);
    display(triviaPage);
};

//hides element
function hide(element) {
    element.style.display = "none";
};

//displays element
function display(element) {
    element.style.display = "block";
};
//funciton to take user form start page to highscore page
function toHighScores() {
    hide(startPage);
    display(highScoresPage);
    showScores();
    //$("#savedHighScores").text("high scores:" + savedScores[0].initials)

};

//function to get random cocktail
function fetchBrewery(breweryInput) {
    var apiUrl = "https://api.openbrewerydb.org/breweries/search?query=" + breweryInput;
    console.log(breweryInput);
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                displayBreweries(data);
            });
        }
        else {
            alert("Error" + response.statusText);
        }
    });
    storeScores();
};

//function to display brewery query results
function displayBreweries(data){
    var ul = document.getElementById("breweries");
    for(var i = 0; i < data.length; i++){
        var breweryName = data[i].name;
    
        //var li = document.createElement("li");
        //li.appendChild(breweryName);
        //ul.appendChild(li);
        //console.log(breweryName);
       breweriesList.append(breweryName);
    }
};

submitTriviaBtn.addEventListener("click", checkAnswers);

initialSubmitBtn.addEventListener("click", function(){
    var breweryInput = document.getElementById("breweryInput");
    breweryInput = breweryInput.value.trim();
    //breweryInput = breweryInput.toUpperCase();
    console.log(breweryInput);
    fetchBrewery(breweryInput);
});
highScoresBtn.addEventListener("click", toHighScores);
startButton.addEventListener("click", startGame);

$("#redo-btn").click(function () {
    document.location.reload(true);
});
// redoButton.addEventListener("click", restart);
$("#redo-btn").click(function () {
    document.location.reload(true);
});

$(".close-button").click(function () {
    hide(modal1);
});