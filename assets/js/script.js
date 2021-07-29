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
                var category = data.results[0].category;
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
    //using a little jquery for practice
    var questionContainer = $("#question-container");
    var triviaPage = $("#trivia-page");
    //removeing hidden class and making page active
    // triviaPage.classList.remove("hidden");
    //triviaPage.classList.add("activeInfo");
    // for(var i = 0; i < data.response; i++){
    //    console.log(data.results[i].question);
    //};

    questionContainer.append('<div id="question">' + data.results[0].question + '</div>');
    //foundation for creating checkbox els
    var choice1 = data.results[0].incorrect_answers[0];
    var choice2 = data.results[0].incorrect_answers[1];
    var choice3 = data.results[0].incorrect_answers[2];
    questionContainer.append('<input type="radio" id="choice1"><label for="choice1">'+ choice1+ '</label>');
    questionContainer.append('<input type="radio" id="choice2" required><label for="choice2">'+choice2+'</label>');
    questionContainer.append('<input type="radio" id="choice3"><label for="choice3">'+choice3+'</label>');
};
// //function to determine timer state
// function timer(){
//     timer.textContent
// };

///////////////////////////event listeners///////////////////////////
startButton.addEventListener("click", fetchQuestion);
//startButton.addEventListener("click", hideStart);





