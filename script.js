const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Does a cat have more than 2 eyes?',
    answers: [
      { text: 'Yes', correct: false},
      { text: 'No', correct: true }
    ]
  },
  {
    question: 'What is the capital city of Australia?.?',
    answers: [
      { text: 'Canberra', correct: true },
      { text: 'Sydney', correct: false },
      { text: 'Darwin', correct: false },
      { text: 'Melbourne', correct: false }
    ]
  },
  {
    question: 'Which of these cocktails use rum?',
    answers: [
      { text: 'Negroni', correct: false },
      { text: 'Daiquiri', correct: true },
      { text: 'Cosmopolitan',correct: false },
      { text: 'Campari Spritz', correct: false }
    ]
  },
  {
    question: 'Which drink uses a portion of coffee liqueur (e.g., Baileys) which is poured over the back of a spoon so that it sits on the coffee liqueur.?',
    answers: [
      { text: 'Irish Cream', correct: false },
      { text: 'Baby Guinness', correct: true }
    ]
  },
  { 
    question: 'What is 87 * 5?',
    answers: [
      { text: '387', correct: false },
      { text: '435', correct: true }

    ]
  }
]