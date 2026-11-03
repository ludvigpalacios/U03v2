//Grab all necessary elements
const grabQuestionContainer=document.querySelector(".question-container")

const grabQuizbutton= document.querySelectorAll(".quiz-button");

const grabExplanationContainer = document.querySelector("#explanation-container");


//Fetcha fram objects från en json med frågor och svar
console.log("quizv2 js loaded");
//Async

fetchQUIZ();

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
        replaceContents(data);
        inputListener(data);


    }catch(error){
        console.log("The app has detected error: ", error);
    }
}
//Where the questions are at 
let atQuestion=0;
//Load the questions onto the page
function replaceContents(data){
    //console.log(data.questions[atQuestion].question);
    let i=0;

    grabQuestionContainer.textContent=data.questions[atQuestion].question;
    grabQuizbutton.forEach(text =>{
        //replace all button texts with the ones the json
        text.textContent=data.questions[atQuestion].answers[i];
        i++;

    })
}
function inputListener(data){
    //console.log(grabQuizbutton);
    const correctIndex=data.questions[atQuestion].correctIndex;
    const Question=data.questions[atQuestion];
    const explanation=data.questions[atQuestion].explanation;

    window.addEventListener("click",(e) =>{
        const button=e.target.closest("button.quiz-button");
        if(button){
            console.log("button clicked");
            disableButtons();

            //Check if the input matches a correct answer 
            if(button.textContent===Question.answers[correctIndex]){
                console.log("Correct answer pressed");
                button.classList.add("right-answer");
                button.classList.add("disabled");




            }else{
                console.log("wrong answer!");
                console.log(explanation);
                grabExplanationContainer.textContent=explanation;
                //Add a red tint for wrong answer
                button.classList.add("wrong-answer");
                button.classList.add("disabled");

            }
        }
    })
 
}

function disableButtons(){
    grabQuizbutton.forEach(button =>{
        button.classList.add("disabled");
    })
}
function enableAnswers(){
    grabQuizbutton.forEach(button => {
        button.classList.remove("disabled");
    })
}