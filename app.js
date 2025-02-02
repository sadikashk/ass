angular.module('quizApp', [])
.controller('QuizController', function ($http, $scope) {
const vm = this;
// Quiz Data
vm.questions = [];
vm.currentQuestionIndex = 0;
vm.currentQuestion = {};
vm.quizStarted = false;
vm.quizCompleted = false;
vm.score = 0;
vm.answerSelected = false;
// Fetch Quiz Data from API
vm.fetchQuizData = function () {
$http.get('https://api.jsonserve.com/Uw5CrX')
.then(function (response) {
vm.questions = response.data.questions;
vm.currentQuestion = vm.questions[vm.currentQuestionIndex];
})
.catch(function (error) {
console.error('Error fetching quiz data:', error);
});
};
// Start Quiz
vm.startQuiz = function () {
vm.quizStarted = true;
vm.fetchQuizData();
};
// Select Answer
vm.selectAnswer = function (selectedOption) {
vm.answerSelected = true;
if (selectedOption === vm.currentQuestion.correctAnswer) {
vm.score++;
}
};
// Next Question
vm.nextQuestion = function () {
vm.currentQuestionIndex++;
if (vm.currentQuestionIndex < vm.questions.length) {
vm.currentQuestion = vm.questions[vm.currentQuestionIndex];
vm.answerSelected = false;
} else {
vm.quizCompleted = true;
}
};
// Restart Quiz
vm.restartQuiz = function () {
vm.currentQuestionIndex = 0;
vm.currentQuestion = vm.questions[vm.currentQuestionIndex];
vm.quizCompleted = false;
vm.score = 0;
vm.answerSelected = false;
};
});
