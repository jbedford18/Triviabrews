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
    var triviaPage = document.getElementById("trivia-page");
    //removeing hidden class and making page active
    triviaPage.classList.remove("hidden");
    triviaPage.classList.add("activeInfo");
    var questionContainer = $("#question-container");
    //clear off previous question
    questionContainer.innerHTML = "";
    //choicesEl.append('<h2>Answer the trivia question correctly to earn a point: </h2>');
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
   for(var i = 0; i < data.results.length; i++){
    //REFACTOR HERE STILL PRINTING NONSTRING VAL OF SPECIAL CHARS NESTED IN ""
    var dataChoice1 = data.results[i].incorrect_answers[0];
    var dataChoice2 = data.results[i].incorrect_answers[1];
    var dataChoice3 = data.results[i].incorrect_answers[2];
    var dataCorrectChoice = data.results[i].correct_answer;
    var question = JSON.stringify(data.results[i].question);

    questionContainer.append('<h2 id = "question">'+question+'</h2>');
    //stringify needed to get the special chars in the html

    questionContainer.append('<input name = "answer" type = "radio"><label id = "choice1">'+dataChoice1+'</label></input>');
    questionContainer.append('<input name = "answer" type = "radio"><label id = "choice2">'+dataChoice2+'</label></input>');
    questionContainer.append('<input name = "answer" type = "radio"><label id = "choice3">'+dataChoice3+'</label></input>');
    //REFACTOR HERE: FOR TESTING ONLY: CHOICE 4 WILL ALWAYS BE THE CORRECT OPTION
    questionContainer.append('<input name = "answer" type = "radio"><label id = "choice3">'+dataCorrectChoice+'</label></input>');
    //Button to for event listner to check answers at the end of 10 questions
    var submitBtnEl = '<button class="btn btn-primary" id="submit-button" type="submit">Done</button>';
    questionContainer.append(submitBtnEl);
    $("#submit-button").on("click", checkAnswers);
}
};

//function to check answers
function checkAnswers(event){
    console.log(event.target);
};
//function to determine timer state
// function timer(){
//     timer.textContent
// };

///////////////////////////event listeners///////////////////////////
startButton.addEventListener("click", fetchQuestion);
//startButton.addEventListener("click", hideStart);





