var startButton = document.getElementById("start-btn");
var startPage = document.getElementById("start-page");
//function to get trivia category 
function fetchQuestion(){
    var apiUrl="https://opentdb.com/api.php?amount=10";
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data);
                console.log(data.results[0]);
                console.log(data.results[0].category);
                var category = data.results[0].category;
                displayCategories(category);
            });
        }
        else{
            alert("Error" + response.statusText);
        }
    });
};
fetchQuestion();
//function to display categories on main page
function displayCategories(category){
    var categoryEl = document.getElementById("categories");    
    document.createElement("btn").setAttribute("id = cat-btn");
    document
    categoryEl.textContent = category;
};

//function to hide start page when user clicks start button
function hideStart(){
    var startPage = document.getElementById("start-page");
    startPage.classList.remove("active");
    startPage.classList.add("hidden");
    //console.log("hidden");
};


///////////////////////////event listeners///////////////////////////
startButton.addEventListener("click", hideStart);


var elem = new Foundation.DropdownMenu(element, options);

