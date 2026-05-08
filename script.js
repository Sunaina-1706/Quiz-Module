
let ques = document.getElementById("question");
let opBtns = [document.getElementById("op1"), document.getElementById("op2"), document.getElementById("op3"), document.getElementById("op4")];
let hiddenContainer = document.getElementById("hiddeninput");
let marksDisplay = document.getElementById("Marks");

let currentIndex = 0;
let userAnswers = []; 

const quiz = [
    { que: "Evolutionary model is combination of", ans: "Iterative and Incremental", opns: ["WaterFall And Prototype", "Iterative and Incremental", "Prototype and Incremental", "None of these"] },
    { que: "JavaScript is not", ans: "Asynchronous", opns: ["Synchronous", "Programming language", "Interpreted language", "Asynchronous"] },
    { que: "Multilevel inheritance is", ans: "Parent=>Child=>Child...", opns: ["Parent=>Child=>Child...", "(Parent1,Parent2)=>Child", "Parent=>(Child1,Child2) ", "Parent=>Child"] },
    { que: "Which one is correct", ans: "btn.addEventListener('click',(abc)=>{...})", opns: ["btn.AddEventListener('keydown',()=>{...})", "btn.addeventlistener('click',(abc)={...})", "btn.addEventListener('click',(abc)=>{...})", "btn.addEventListener('listen',()=>{...})"] },
    { que: "SetInterval in JS is : ", ans: "Repeatedly execute a function at fixed time", opns: ["Function of array", "Repeatedly execute a function at fixed time", "Debug Code", "Execute a Function at fixed time"] }
];

const fun = [
    { que: "What is missing in 'JackSparrow'?", ans: "captain" },
    { que: "what two things you can never have for Breakfast?", ans: "lunch and dinner" },
    { que: "What is the oldest animal on Earth", ans: "zebra" },
    { que: "Group of Crows called ______", ans: "murder" }
];

const wrongs = [
    { que: "What food comes from cow?", ans: "milk" },
    { que: "what is 2+2 ?", ans: "4" },
    { que: "How are you?", ans: "Nice" }
];

const allQuestions = [...quiz, ...fun, ...wrongs];

loadStep();

function loadStep() {
    if (currentIndex >= allQuestions.length) {
        finishQuiz();
        return;
    }

    const data = allQuestions[currentIndex];
    
    if (data.opns) {
        displayMultipleChoice(data);
    } else {
        displayTextInput(data);
    }
}

function displayMultipleChoice(data) {
    document.querySelector("ul").style.display = "block";
    hiddenContainer.innerHTML = "";
    ques.innerText = data.que;
    
    opBtns.forEach((btn, i) => {
        btn.innerText = data.opns[i];
        btn.onclick = () => saveAndNext(btn.innerText);
    });
}

function displayTextInput(data) {
    document.querySelector("ul").style.display = "none";
    ques.innerText = data.que;
    
    // Restore previous answer if the user went "Back"
    let prevVal = userAnswers[currentIndex] ? userAnswers[currentIndex].guess : "";

    hiddenContainer.innerHTML = `<input type="text" id="answer" value="${prevVal}" placeholder="Type and press Enter...">`;
    const input = document.getElementById("answer");
    input.focus();
    
    input.onkeypress = (e) => {
        if (e.key === "Enter") saveAndNext(input.value.trim());
    };
}

function saveAndNext(userGuess) {
    const data = allQuestions[currentIndex];
    let isCorrect = false;
    if(currentIndex == quiz.length + fun.length-1){
        alert("Wrong Answers only !! Be Careful")
        // console.log(currentIndex)
}
    // Logic for "wrongs" section (inverse scoring)
    const isInverse = currentIndex >= (quiz.length + fun.length);
    
    if (isInverse) {
        isCorrect = userGuess.toLowerCase() !== data.ans.toLowerCase();
    } else {
        isCorrect = userGuess.toLowerCase() === data.ans.toLowerCase();
    }

    // Save answer at the specific index
    userAnswers[currentIndex] = { guess: userGuess, isCorrect: isCorrect };
    
    currentIndex++;
    loadStep();
}

function calculateTotalMarks() {
    return userAnswers.filter(ans => ans && ans.isCorrect).length;
}

function finishQuiz() {
    const finalMarks = calculateTotalMarks();
    document.getElementById("Marks").innerText = `Your Marks: ${finalMarks} / ${allQuestions.length}`;
    document.getElementById("container").style.display = "none";
    document.getElementById("btns").style.display = "none";
    document.getElementById("heading").style.display = "none";
}

// Global buttons
document.getElementById("next").onclick = () => {
    // Only allow next if they've already answered this one
    if (userAnswers[currentIndex]) {
        currentIndex++;
        loadStep();
    } else {
        alert("Please answer the question first!");
    }
};

document.getElementById("prev").onclick = () => {
    if (currentIndex > 0) {
        currentIndex--;
        loadStep();
    }
};

