// ============================================
// GRAMMAR MODULE - grammar.js
// ============================================

class GrammarModule {
    constructor(app) {
        this.app = app;
        this.currentLesson = null;
        this.init();
    }

    init() {
        this.renderTopics();
        document.getElementById('back-to-topics')?.addEventListener('click', () => this.backToTopics());
    }

    renderTopics() {
        const container = document.getElementById('grammar-topics');
        if (!container) return;

        container.innerHTML = grammarData.map(topic => {
            const progress = this.app.userProgress.grammarProgress?.[topic.id] || 0;
            return `
                <div class="grammar-topic-card" onclick="grammarModule.openLesson(${topic.id})">
                    <h3>${topic.title}</h3>
                    <p>${topic.description}</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <span class="progress-text">${progress}% complete</span>
                </div>
            `;
        }).join('');
    }

    openLesson(id) {
        const topic = grammarData.find(t => t.id === id);
        if (!topic) return;

        this.currentLesson = topic;
        document.getElementById('grammar-topics').style.display = 'none';
        document.getElementById('grammar-lesson').style.display = 'block';
        document.getElementById('lesson-content').innerHTML = topic.content;
        
        document.getElementById('grammar-exercises').innerHTML = `
            <h3><i class="fas fa-pencil-alt"></i> Practice Exercises</h3>
            ${topic.exercises.map((ex, i) => `
                <div class="exercise-item">
                    <p class="exercise-question">${i + 1}. ${ex.question}</p>
                    <div class="exercise-input-group">
                        <input type="text" class="exercise-input" placeholder="Your answer..." data-answer="${ex.answer}">
                        <button class="btn-check" onclick="grammarModule.checkAnswer(this)">Check</button>
                    </div>
                    <span class="feedback"></span>
                </div>
            `).join('')}
            <button class="btn-complete-lesson" onclick="grammarModule.completeLesson()">
                <i class="fas fa-check"></i> Complete Lesson
            </button>
        `;
    }

    checkAnswer(btn) {
        const input = btn.previousElementSibling;
        const feedback = btn.parentElement.nextElementSibling;
        const correct = input.dataset.answer.toLowerCase();
        const user = input.value.trim().toLowerCase();

        if (user === correct || correct.includes(user)) {
            input.classList.remove('incorrect');
            input.classList.add('correct');
            feedback.innerHTML = '<i class="fas fa-check"></i> Correct!';
            feedback.className = 'feedback correct';
        } else {
            input.classList.remove('correct');
            input.classList.add('incorrect');
            feedback.innerHTML = '<i class="fas fa-times"></i> Answer: ' + input.dataset.answer;
            feedback.className = 'feedback incorrect';
        }
    }

    completeLesson() {
        if (!this.currentLesson) return;
        
        const inputs = document.querySelectorAll('.exercise-input');
        let correct = 0;
        inputs.forEach(input => { if (input.classList.contains('correct')) correct++; });
        const score = Math.round((correct / inputs.length) * 100);

        if (!this.app.userProgress.grammarProgress) this.app.userProgress.grammarProgress = {};
        this.app.userProgress.grammarProgress[this.currentLesson.id] = score;

        this.app.addXP(20);
        this.app.addActivity('Completed: ' + this.currentLesson.title);
        this.app.showToast('Lesson done! Score: ' + score + '%', 'success');
        this.backToTopics();
    }

    backToTopics() {
        document.getElementById('grammar-topics').style.display = 'grid';
        document.getElementById('grammar-lesson').style.display = 'none';
        this.currentLesson = null;
        this.renderTopics();
    }
}