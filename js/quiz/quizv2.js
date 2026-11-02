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

        console.log(data.questions[0].category);
        console.log(data.questions[0].answers[2]);


    }catch(error){

    }
}

