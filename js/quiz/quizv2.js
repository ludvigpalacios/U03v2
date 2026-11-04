//Grab all necessary elements
const grabQuestionContainer=document.querySelector(".question-container")

const grabQuizbutton= document.querySelectorAll(".quiz-button");

const grabExplanationContainer = document.querySelector("#explanation-container");

const grabNextButton = document.querySelector(".next-button");

//Fetcha fram objects från en json med frågor och svar
console.log("quizv2 js loaded");
//Async

//Where the questions are at 
let atQuestion=0;

//Get the data globally
let jsonData;

//Save scores
let scores=0;

startQuiz();

async function startQuiz (){
    jsonData = await fetchQUIZ();
    console.log("Fetched quiz data:",jsonData);
    replaceContents(jsonData, atQuestion);
    inputListener(jsonData, atQuestion);
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

    grabQuestionContainer.textContent=data.questions[atQuestion].question;
    grabQuizbutton.forEach(text =>{
        //replace all button texts with the ones the json
        text.textContent=data.questions[atQuestion].answers[i];
        i++;

    })
    
}
function inputListener(data){
    window.addEventListener("click",(e) =>{
        const correctIndex=data.questions[atQuestion].correctIndex;
        const Question=data.questions[atQuestion];
        const explanation=data.questions[atQuestion].explanation;
        console.log("inputListener loaded", atQuestion);



        const button=e.target.closest("button.quiz-button");
        const nextButton=e.target.closest("button.next-button");
        if(button){
            console.log("button clicked");
            disableButtons();
            grabNextButton.classList.remove("hide");

            //Check if the input matches a correct answer 
            if(button.textContent===Question.answers[correctIndex]){
                console.log("Correct answer pressed");
                button.classList.add("right-answer");
                button.classList.add("disabled");
                grabQuestionContainer.textContent="Correct!";

                //Ge 100p
                scores+=100;





            }else{
                console.log("wrong answer!");
                console.log(explanation);
                updateExplanation(explanation);

                //Add a red tint for wrong answer
                button.classList.add("wrong-answer");
                button.classList.add("disabled");

            }
        }if(nextButton){
            atQuestion++;
            replaceContents(jsonData, atQuestion);

            resetAnswers();

            //Reset timer
            resetTimer();

            //Update the current question container

            document.querySelector(".current-question").textContent=atQuestion+1;

            updateScore(currentUser, scores);

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
    grabQuestionContainer.textContent=QuestionExplanation;

}


