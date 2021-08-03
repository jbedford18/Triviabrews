var startButton = document.getElementById("start-btn");
var startPage = document.getElementById("start-page");
var triviaPage = document.getElementById("trivia-page");
var highScoresPage = document.getElementById("high-scores-page");
var timerEl = document.getElementById("timer");
var finalScoreEl = document.getElementById("finalScore");
var savedHighScores = document.getElementById("savedHighScores");
var finalTime = document.getElementById("finalTime");
var initialInputPage = document.getElementById("initial-input-page");
var initialsInputEl = document.getElementById("initials-input");
var initialSubmitBtn = document.getElementById("initialsSubmit");
var choices = [];
var questions = [];
var correctChoices = [];

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
    questionContainer.append('<button class="success button" id="submit-button" type="submit">Submit Now!</button>');    
    //questionContainer.append(submitBtn);

    $("#submit-button").on("click", checkAnswers);
};

//function to check answers
function checkAnswers(event){
    var corrects= 0;
    //stopTimer();
    event.preventDefault();
    var userInput = document.querySelectorAll("input[type=radio]:checked");
    //console.log(userInput.length);
    if(userInput.length === 10){
    for(var i = 0 ; i < 10; i++){
        //console.log(userInput[i].nextSibling);
       //console.log(correctChoices[i]);
        if(userInput[i].nextSibling.textContent === correctChoices[i]){
            corrects ++;
            console.log("correct");
        }
        else if(userInput[i].nextSibling.textContent !== correctChoices[i]){
            console.log("wrong!");
        }
        }
    }
    else{
    alert("you need to answer all the questions");
    return;
}
 displayInputPage(corrects);
};

function displayInputPage(corrects){
    hide(highScoresPage);
    hide(triviaPage);
    display(initialInputPage);
    storeScores(corrects);
;}

//function to display all scores
function showScores(points){
    hide(triviaPage);
    hide(initialInputPage);
    display(highScoresPage);
    var savedScores =  localStorage.getItem("high scores");
    if(savedScores === null){
        console.log("none saved");
        return;
    }
    var storedScores = savedScores;
    console.log(storedScores.initials);
    console.log(storedScores.score);
};

//function tp briung up highscore input page after submitting trivia 
function showInputPage(){
    hide(triviaPage);
    display(initialInputPage);
    finalScoreEl.textContent = ("Final Score: " + points);
};

//function to staore highscores into localstorage
function storeScores(points){
    var savedScores = [];
    savedScores = localStorage.getItem("high scores");
    var scoresArr;
    if(savedScores === null){
        scoresArr = [];
    }
    else{
        scoresArr = savedScores;
    }
    var userScore = {
        initials: initialsInputEl.textContent,
        score: finalScore.textContent
    }
    console.log(userScore);
    
};
initialSubmitBtn.addEventListener("click", showScores);

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



startButton.addEventListener("click", startGame);


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

