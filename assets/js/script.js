$( document ).ready(function() {
});
var startButton = document.getElementById("start-btn");
var startPage = document.getElementById("start-page");
//add dropdownmenu funcrionality after quiz page is done
//var dropDown = new Foundation.DropdownMenu(element, options);
//initialize time at 60 seconds
//var time = 60; 
//function to get trivia category 
function fetchQuestion(){
    var apiUrl="https://opentdb.com/api.php?amount=10";
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data);
                //console.log(data.results[0]);
                //console.log(data.results[0].question);
                //var category = data.results[0].category;
                displayTriviaQuestions(data);
            });
        }
        else{
            alert("Error" + response.statusText);
        }
    });
};
//fetchQuestion();
//function to display categories on main page
function displayCategories(category){
    var categoryEl = document.getElementById("categories");    
    //document.createElement("btn").setAttribute("id = cat-btn");
    
    categoryEl.textContent = category;
};

//function to hide start page when user clicks start button
function hideStart(){
    var startPage = document.getElementById("start-page");
    //getting ride of start page display using css classes
    startPage.classList.remove("activeInfo");
    startPage.classList.add("hidden");
    //console.log("hidden");
};

//function to display quiz
function displayTriviaQuestions(data){
    hideStart();
    //console.log("hi!");
    //migh need to use jquery to get actual value of data text
    var questionEl = document.getElementById("question");
    //var questionContainer = $("#question-container");
    //var triviaPage = $("#trivia-page");
    //var questionContainer = document.getElementById("question-container");
    var triviaPage = document.getElementById("trivia-page");
    //removeing hidden class and making page active
    triviaPage.classList.remove("hidden");
    triviaPage.classList.add("activeInfo");
    //console.log(triviaPage);
    // for(var i = 0; i < data.response; i++){
    //    console.log(data.results[i].question);
    //};    
    var question = data.results[0].question;
    questionEl.textContent = question;
    console.log(question);
    //foundation for creating checkbox els
    var choice1 = document.getElementById("choice1");
    choice1.textContent =  data.results[0].incorrect_answers[0];
    var choice2 = document.getElementById("choice2");
    choice2.textContent = data.results[0].incorrect_answers[1];
    var choice3 = document.getElementById("choice3");
    choice3.textContent = data.results[0].incorrect_answers[2];
    //var choices = document.getElementById("choices");
};
// //function to determine timer state
// function timer(){
//     timer.textContent
// };

///////////////////////////event listeners///////////////////////////
startButton.addEventListener("click", fetchQuestion);
//startButton.addEventListener("click", hideStart);





