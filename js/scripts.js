const question = document.querySelector('#question');
const answersBox = document.querySelector('#answers-box');
const quizContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');

const letters = ["a", "b", "c", "d"];
let score = 0;
let currentQuestion = 0;

// Perguntas
const questions = [
    {
        "question": "PHP foi desenvolvido para qual fim?",
        "answers": [
        {
            "answer": "back-end",
            "correct": true
        },
        {
            "answer": "front-end",
            "correct": false
        },
        {
            "answer": "Sistema operacional",
            "correct": false
        },
        {
            "answer": "Banco de dados",
            "correct": false
        },
        ]
    },
    {
        "question": "Uma forma de declarar variável em JavaScript:",
        "answers": [
        {
            "answer": "$var",
            "correct": false
        },
        {
            "answer": "var",
            "correct": true
        },
        {
            "answer": "@var",
            "correct": false
        },
        {
            "answer": "#let",
            "correct": false
        },
        ]
    },
    {
        "question": "Qual o seletor de id no CSS?",
        "answers": [
        {
            "answer": "#",
            "correct": true
        },
        {
            "answer": ".",
            "correct": false
        },
        {
            "answer": "@",
            "correct": false
        },
        {
            "answer": "/",
            "correct": false
        },
        ]
    },
    {
        "question": "Qual a tag HTML utilizada para incluir o Javascript?",
        "answers": [
        {
            "answer": "<javascript>",
            "correct": false
        },
        {
            "answer": "<js>",
            "correct": false
        },
        {
            "answer": "<scripting>",
            "correct": false
        },
        {
            "answer": "<script>",
            "correct": true
        },
        ]
    },
    {
        "question": "Qual a seção HTML correta para incluir o Javascript?",
        "answers": [
        {
            "answer": "<head>",
            "correct": false
        },
        {
            "answer": "<body>",
            "correct": false
        },
        {
            "answer": "<head> ou <body>",
            "correct": true
        },
        {
            "answer": "<main>",
            "correct": false
        },
        ]
    },
    {
        "question": "Qual a sintaxe correta para referenciar um script externo?",
        "answers": [
        {
            "answer": '<script name="xxx.js">',
            "correct": false
        },
        {
            "answer": '<script href="xxx.js">',
            "correct": false
        },
        {
            "answer": '<script ref="xxx.js">',
            "correct": false
        },
        {
            "answer": '<script src="xxx.js">',
            "correct": true
        },
        ]
    },
]


// Cria uma pergunta
function createQuestion(i) {
    const oldButtons = answersBox.querySelectorAll('button');
    
    // limpa a questão anterior
    oldButtons.forEach((btn) => {
        btn.remove();
    })
    
    // Alterar o texto da pergunta
    const questionText = question.querySelector('#question-text');
    const questionNumber = question.querySelector('#question-number');
    
    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // Incluir as alternativas
    questions[i].answers.forEach((answer, i) => {
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);
        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");
        
        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];
        answerTemplate.setAttribute('correct-answer', answer["correct"]);
        
        answerTemplate.classList.remove('hide');
        answerTemplate.classList.remove('answer-template');
        answersBox.appendChild(answerTemplate);

        // adicionar um evento de clique no botão
        answerTemplate.addEventListener('click', function() {
            checkAnswer(this)
        })
    })

    // incrementar o N.o da questão
    currentQuestion ++;        
}


// Checar resposta do usuário
function checkAnswer(btn) {
    const buttons = answersBox.querySelectorAll("button");

    buttons.forEach((button) => {
        if (button.getAttribute("correct-answer") === "true") {
            button.classList.add("correct-answer");
            
            if (btn === button) {
                score ++;
            }
        } else {
            button.classList.add("wrong-answer");
        }            
    })

    nextQuestion();
}


// exibe a próxima pergunta
function nextQuestion() {
    setTimeout(() => {
        if (currentQuestion >= questions.length) {
            showSuccessMessage();
            return;
        }

        createQuestion(currentQuestion);
    }, 2000);
}


// Mostrar a pontuação
function showSuccessMessage() {
    hideOrShowQuiz();    

    const resultado = (score / questions.length * 100).toFixed(2);
    const displayScore = document.querySelector("#display-score span");
    
    displayScore.textContent = resultado.toString();

    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = score;

    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;
}


function hideOrShowQuiz() {
    quizContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");    
}


// Reiniciar o jogo
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener('click', function() {
    score = 0;
    currentQuestion = 0;
    hideOrShowQuiz();
    init();
})

// Primeira pergunta
function init() {
    createQuestion(0);
}

init();
