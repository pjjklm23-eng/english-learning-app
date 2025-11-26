// ============================================
// VOCABULARY MODULE - vocabulary.js
// ============================================

class VocabularyModule {
    constructor(app) {
        this.app = app;
        this.currentCategory = 'all';
        this.init();
    }

    init() {
        this.renderVocabulary();
        this.setupFilters();
        this.setupSearch();
    }

    renderVocabulary(filter = 'all', searchTerm = '') {
        const grid = document.getElementById('vocabulary-grid');
        if (!grid) return;

        let data = [...vocabularyData];

        if (filter !== 'all') {
            data = data.filter(w => w.level === filter || w.category === filter);
        }

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            data = data.filter(w => w.word.toLowerCase().includes(term) || w.meaning.toLowerCase().includes(term));
        }

        if (data.length === 0) {
            grid.innerHTML = '<p class="no-results">No words found.</p>';
            return;
        }

        grid.innerHTML = data.map(word => {
            const isLearned = this.app.userProgress.learnedWords?.includes(word.id);
            return `
                <div class="vocab-card ${isLearned ? 'learned' : ''}" onclick="vocabModule.showDetail(${word.id})">
                    <div class="vocab-card-header">
                        <span class="word">${word.word}</span>
                        ${isLearned ? '<i class="fas fa-check-circle learned-icon"></i>' : ''}
                    </div>
                    <div class="type">${word.type} • ${word.pronunciation}</div>
                    <div class="meaning">${word.meaning}</div>
                    <div class="vocab-card-footer">
                        <span class="level-badge ${word.level}">${word.level}</span>
                        <button class="btn-speak-small" onclick="event.stopPropagation(); speakWord('${word.word}')">
                            <i class="fas fa-volume-up"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    setupFilters() {
        document.querySelectorAll('.category-tabs .tab-btn').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.category-tabs .tab-btn').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.currentCategory = tab.dataset.category;
                this.renderVocabulary(this.currentCategory, document.getElementById('vocab-search')?.value || '');
            });
        });
    }

    setupSearch() {
        const input = document.getElementById('vocab-search');
        if (input) {
            input.addEventListener('input', (e) => {
                this.renderVocabulary(this.currentCategory, e.target.value);
            });
        }
    }

    showDetail(id) {
        const word = vocabularyData.find(w => w.id === id);
        if (!word) return;

        const modal = document.getElementById('modal');
        const body = document.getElementById('modal-body');
        const isLearned = this.app.userProgress.learnedWords?.includes(id);

        body.innerHTML = `
            <div class="word-detail">
                <h2>${word.word}</h2>
                <p class="pronunciation">${word.pronunciation}</p>
                <span class="word-type">${word.type}</span>
                <p class="definition">${word.meaning}</p>
                <div class="example-section">
                    <strong>Example:</strong>
                    <p class="example">"${word.example}"</p>
                </div>
                <div class="word-meta">
                    <span class="level-badge ${word.level}">${word.level}</span>
                    <span class="category-badge">${word.category}</span>
                </div>
                <div class="word-actions">
                    <button class="btn-speak" onclick="speakWord('${word.word}')">
                        <i class="fas fa-volume-up"></i> Listen
                    </button>
                    <button class="btn-learn ${isLearned ? 'learned' : ''}" onclick="vocabModule.toggleLearned(${id})">
                        <i class="fas fa-${isLearned ? 'check-circle' : 'plus-circle'}"></i>
                        ${isLearned ? 'Learned' : 'Mark as Learned'}
                    </button>
                </div>
            </div>
        `;

        modal.classList.add('active');
        modal.querySelector('.modal-close').onclick = () => modal.classList.remove('active');
        modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('active'); };
    }

    toggleLearned(id) {
        const learned = this.app.userProgress.learnedWords || [];
        const index = learned.indexOf(id);
        
        if (index === -1) {
            learned.push(id);
            this.app.userProgress.wordsLearned = learned.length;
            this.app.addXP(5);
            this.app.addActivity('Learned a new word');
        } else {
            learned.splice(index, 1);
            this.app.userProgress.wordsLearned = learned.length;
        }
        
        this.app.userProgress.learnedWords = learned;
        this.app.saveProgress();
        this.renderVocabulary(this.currentCategory);
        document.getElementById('modal').classList.remove('active');
    }
}