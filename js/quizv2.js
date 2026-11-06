

//Grab all necessary elements
const grabQuestionContainer=document.querySelector(".question-container")
console.log(grabQuestionContainer);

const grabQuizbutton= document.querySelectorAll(".quiz-button");

const grabExplanationContainer = document.querySelector("#explanation-container");

const grabNextButton = document.querySelector(".next-button");

const currentAnsweredContainer=document.querySelector("#currentAnsweredContainer");
const currentScoresContainer=document.querySelector("#currentScoreContainer");

//Fetcha fram objects från en json med frågor och svar
console.log("quizv2 js loaded");
//Async
//let currentUser;

//Where the questions are at 
let atQuestion=0;

//Get the data globally
let jsonData;

//Save scores
let scores=0;
let answeredCount=0;

let accountID=fetchLoggedID();

//count the right answers, and wrong answers
let correctCount = 0;
let wrongCount = 0;


/*async function startQuiz (){
    jsonData = await fetchQUIZ();
    console.log("Fetched quiz data:",jsonData);
    replaceContents(jsonData, atQuestion);
    inputListener(jsonData, atQuestion);
}*/

startLogicalQuiz();

async function startLogicalQuiz(){
    resetQuiz();
    jsonData = await fetchQUIZ();
    accountData = await fetchAccounts();
    console.log(accountData);

    loadLogicalQuiz(jsonData, atQuestion);
    inputListener(jsonData, atQuestion, accountData);
    
}

async function startCreativeQuiz(){
    resetQuiz();

    jsonData=await fetchQUIZ();
    accountData= await fetchAccounts();
    loadCreativeQuiz(jsonData, atQuestion);
    inputListener(jsonData, atQuestion, accountData);

}

async function fetchQUIZ (){
    //Try and catch för att fånga upp errors, standard när man fetch data
    console.log("quiz json loaded");
    try{
        const response = await fetch("json/quiz.json");

        //If query, if the response is not okay then throw an error 
        if(!response.ok){
            throw new Error("There's an error with the response!")
        }
        const data = await response.json();

       /* console.log(data.questions[0].category);
        console.log(data.questions[0].answers[2]); */
        //console.log(data.questions[1].question);
        //console.log(data);


        return data;


    }catch(error){
        console.log("The app has detected error: ", error);
    }
}



//Load the questions onto the page
function replaceContents(data, atQuestion){
    //console.log(data.questions[atQuestion].question);
    let i=0;
    atQuestion=Number(atQuestion);

    //console.log(atQuestion);

    console.log(data.questions[atQuestion].question);
    console.log(getQuestionContainer());


    grabQuestionContainer.textContent=data.questions[atQuestion].question;
    grabQuizbutton.forEach(text =>{
        //replace all button texts with the ones the json
        text.textContent=data.questions[atQuestion].answers[i];
        i++;

    })
    
}

//Load the questions onto the page
function loadLogicalQuiz(data, atQuestion){
    //console.log(data.questions[atQuestion].question);
    let i=0;
    atQuestion=Number(atQuestion);

    //console.log(atQuestion);

    console.log(data.questions[atQuestion].question);
    console.log("loadLogicalQuiz loaded");



    getQuestionContainer().textContent=data.questions[atQuestion].question;
    grabQuizbutton.forEach(text =>{
        //replace all button texts with the ones the json
        text.textContent=data.questions[atQuestion].answers[i];
        i++;

    })
    
};

//Load the questions onto the page
function loadCreativeQuiz(data, atQuestion){
    //console.log(data.questions[atQuestion].question);
    let i=0;
    atQuestion=10;

    //console.log(atQuestion);

    console.log(data.questions[atQuestion].question);
    console.log("loadCreativeQuiz loaded");



    getQuestionContainer().textContent=data.questions[atQuestion].question;
    grabQuizbutton.forEach(text =>{
        //replace all button texts with the ones the json
        text.textContent=data.questions[atQuestion].answers[i];
        i++;

    })
    
}

function inputListener(data, atQuestion, accountData){
        /*console.log(currentScoresContainer);
        console.log(currentAnsweredContainer);*/
        //console.log(scores, answeredCount);
        currentScoresContainer.textContent=scores;
        currentAnsweredContainer.textContent=answeredCount;

        console.log(data, atQuestion, accountData);

    window.addEventListener("click",(e) =>{
        const correctIndex=data.questions[atQuestion].correctIndex;
        const Question=data.questions[atQuestion];
        const explanation=data.questions[atQuestion].explanation;
        //console.log("inputListener loaded", atQuestion);



        const button=e.target.closest("button.quiz-button");
        const nextButton=e.target.closest("button.next-button");
        //const currentScoreContainer=e.target.closest("button#currentScoreContainer");
        //const currentAnsweredContainer=e.target.closest("button#currentAnsweredContainer");
        console.log(data, atQuestion, accountData);


        console.log("Answered count:", answeredCount);
        if(answeredCount==10){
            console.log("End of line, write results!");
            

            disableButtons();

            updateScore(scores, accountData, accountID);

            localStorage.setItem("lastResults", JSON.stringify({
                answered: correctCount + wrongCount,
                correct: correctCount,
                incorrect: wrongCount,
                points: scores
            }));
            window.location.href = "results.html";


            return;

        }
        if(button){
            console.log("button clicked");
            disableButtons();
            grabNextButton.classList.remove("hide");

            //Check if the input matches a correct answer 
            if(button.textContent===Question.answers[correctIndex]){
                console.log("Correct answer pressed");
                button.classList.add("right-answer");
                button.classList.add("disabled");
                getQuestionContainer().textContent="Correct!";
                scores+=100;
                correctCount++;
                
                currentScoresContainer.textContent=scores;
                

                //Ge 100p
                //scores+=100;

            }else{
                console.log("wrong answer!");
                console.log(explanation);
                updateExplanation(explanation);

                //Add a red tint for wrong answer
                button.classList.add("wrong-answer");
                button.classList.add("disabled");

                wrongCount++;

            }
        }if(nextButton){
            atQuestion++;
            replaceContents(jsonData, atQuestion);

            resetAnswers();

            //Reset timer
            resetTimer();

            //Update the current question container

            document.querySelector(".current-question").textContent=atQuestion+1;

            //updateScore(currentUser, scores);

            answeredCount++;
            currentAnsweredContainer.textContent=answeredCount;

            //console.log(data, atQuestion, accountData[0].username);

        }
    })
 
}

function disableButtons(){
    grabQuizbutton.forEach(button =>{
        button.classList.add("disabled");
    })
}
function resetAnswers(){
    grabQuizbutton.forEach(button => {
        button.classList.remove("disabled");
        button.classList.remove("wrong-answer");
        button.classList.remove("right-answer");
        
    })
    grabNextButton.classList.add("hide");
}

function updateExplanation(QuestionExplanation){
    grabExplanationContainer.textContent=QuestionExplanation;
    getQuestionContainer().textContent=QuestionExplanation;

}


//Get questionContainer 
function getQuestionContainer() {
    const el = document.querySelector(".question-container");
    if (!el) console.warn("question-container saknas i den här sidan");
    return el;
}

let listenerAdded = false;

function resetQuiz(){
    scores = 0;
    answeredCount = 0;
    correctCount = 0;
    wrongCount = 0;
    atQuestion = 0;

    currentScoresContainer.textContent = scores;
    currentAnsweredContainer.textContent = answeredCount;
    resetAnswers();   // clears the right/wrong colours and hides the next button
}