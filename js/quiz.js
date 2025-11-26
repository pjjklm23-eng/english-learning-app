// ============================================
// QUIZ MODULE - quiz.js
// ============================================

class QuizModule {
    constructor(app) {
        this.app = app;
        this.questions = [];
        this.current = 0;
        this.score = 0;
        this.timer = null;
        this.time = 0;
        this.answers = [];
        this.init();
    }

    init() {
        document.getElementById('start-quiz')?.addEventListener('click', () => this.start());
        document.getElementById('next-question')?.addEventListener('click', () => this.nextQuestion());
        document.getElementById('retry-quiz')?.addEventListener('click', () => this.reset());
        document.getElementById('review-answers')?.addEventListener('click', () => this.review());
    }

    start() {
        const count = parseInt(document.getElementById('quiz-questions').value);
        this.questions = this.generateQuestions(count);
        this.current = 0;
        this.score = 0;
        this.time = 0;
        this.answers = [];

        document.getElementById('quiz-setup').style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';
        document.getElementById('quiz-results').style.display = 'none';

        this.timer = setInterval(() => {
            this.time++;
            const m = Math.floor(this.time / 60);
            const s = this.time % 60;
            document.getElementById('quiz-timer').textContent = 
                (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
        }, 1000);

        this.showQuestion();
    }

    generateQuestions(count) {
        const questions = [];
        const pool = [...vocabularyData].sort(() => Math.random() - 0.5);

        for (let i = 0; i < Math.min(count, pool.length); i++) {
            const word = pool[i];
            const wrong = vocabularyData
                .filter(w => w.id !== word.id)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map(w => w.meaning);

            const options = [...wrong, word.meaning].sort(() => Math.random() - 0.5);

            questions.push({
                question: 'What is the meaning of "' + word.word + '"?',
                options: options,
                correct: word.meaning
            });
        }
        return questions;
    }

    showQuestion() {
        const q = this.questions[this.current];
        document.getElementById('quiz-question').innerHTML = '<h3>' + q.question + '</h3>';
        
        document.getElementById('quiz-answers').innerHTML = q.options.map((opt, i) => 
            '<button class="answer-btn" onclick="quizModule.selectAnswer(this, \'' + opt.replace(/'/g, "\\'") + '\')">' +
            '<span class="option-letter">' + String.fromCharCode(65 + i) + '</span>' +
            '<span>' + opt + '</span></button>'
        ).join('');

        document.getElementById('next-question').style.display = 'none';
        
        const progress = ((this.current + 1) / this.questions.length) * 100;
        document.getElementById('quiz-progress-fill').style.width = progress + '%';
        document.getElementById('quiz-question-number').textContent = (this.current + 1) + '/' + this.questions.length;
    }

    selectAnswer(btn, answer) {
        const q = this.questions[this.current];
        const buttons = document.querySelectorAll('.answer-btn');
        buttons.forEach(b => b.disabled = true);

        const isCorrect = answer === q.correct;
        
        if (isCorrect) {
            btn.classList.add('correct');
            this.score += 10;
            document.getElementById('current-score').textContent = this.score;
        } else {
            btn.classList.add('incorrect');
            buttons.forEach(b => {
                if (b.querySelector('span:last-child').textContent === q.correct) {
                    b.classList.add('correct');
                }
            });
        }

        this.answers.push({ question: q.question, user: answer, correct: q.correct, isCorrect: isCorrect });
        document.getElementById('next-question').style.display = 'block';
    }

    nextQuestion() {
        this.current++;
        if (this.current >= this.questions.length) {
            this.end();
        } else {
            this.showQuestion();
        }
    }

    end() {
        clearInterval(this.timer);
        
        const total = this.questions.length;
        const correct = this.answers.filter(a => a.isCorrect).length;
        const accuracy = Math.round((correct / total) * 100);

        document.getElementById('quiz-container').style.display = 'none';
        document.getElementById('quiz-results').style.display = 'block';
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('correct-answers').textContent = correct + '/' + total;
        
        const m = Math.floor(this.time / 60);
        const s = this.time % 60;
        document.getElementById('time-taken').textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;

        let message = '';
        if (accuracy >= 90) message = '🎉 Outstanding!';
        else if (accuracy >= 70) message = '👏 Great job!';
        else if (accuracy >= 50) message = '💪 Good effort!';
        else message = '📚 Keep practicing!';
        document.getElementById('results-message').textContent = message;

        this.app.addXP(this.score);
        this.app.userProgress.quizAccuracy = accuracy;
        this.app.userProgress.quizHistory = this.app.userProgress.quizHistory || [];
        this.app.userProgress.quizHistory.push({ score: this.score, accuracy: accuracy, date: new Date().toISOString() });
        this.app.addActivity('Quiz completed: ' + accuracy + '%');
        this.app.saveProgress();
    }

    review() {
        const modal = document.getElementById('modal');
        const body = document.getElementById('modal-body');
        
        body.innerHTML = '<h2>Quiz Review</h2><div class="review-list">' +
            this.answers.map((a, i) => 
                '<div class="review-item ' + (a.isCorrect ? 'correct' : 'incorrect') + '">' +
                '<p><strong>Q' + (i + 1) + ':</strong> ' + a.question + '</p>' +
                '<p>Your answer: ' + a.user + '</p>' +
                (a.isCorrect ? '' : '<p>Correct: ' + a.correct + '</p>') +
                '</div>'
            ).join('') +
            '</div>';

        modal.classList.add('active');
        modal.querySelector('.modal-close').onclick = () => modal.classList.remove('active');
    }

    reset() {
        document.getElementById('quiz-setup').style.display = 'block';
        document.getElementById('quiz-container').style.display = 'none';
        document.getElementById('quiz-results').style.display = 'none';
        document.getElementById('current-score').textContent = '0';
    }
}