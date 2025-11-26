// ============================================
// FLASHCARDS MODULE - flashcards.js
// ============================================

class FlashcardsModule {
    constructor(app) {
        this.app = app;
        this.cards = [...vocabularyData];
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.updateCard();
        this.updateCounter();

        document.getElementById('flashcard')?.addEventListener('click', () => {
            document.getElementById('flashcard').classList.toggle('flipped');
        });

        document.getElementById('shuffle-cards')?.addEventListener('click', () => this.shuffle());
        document.getElementById('prev-card')?.addEventListener('click', () => this.prev());
        document.getElementById('next-card')?.addEventListener('click', () => this.next());
        document.getElementById('mark-correct')?.addEventListener('click', () => { this.app.addXP(2); this.next(); });
        document.getElementById('mark-wrong')?.addEventListener('click', () => this.next());

        document.getElementById('flashcard-speak')?.addEventListener('click', (e) => {
            e.stopPropagation();
            speakWord(document.getElementById('flashcard-word').textContent);
        });

        document.getElementById('flashcard-category')?.addEventListener('change', (e) => {
            this.filter(e.target.value);
        });
    }

    updateCard() {
        if (this.cards.length === 0) return;
        const card = this.cards[this.currentIndex];
        document.getElementById('flashcard')?.classList.remove('flipped');
        document.getElementById('flashcard-word').textContent = card.word;
        document.getElementById('flashcard-pronunciation').textContent = card.pronunciation;
        document.getElementById('flashcard-type').textContent = card.type;
        document.getElementById('flashcard-definition').textContent = card.meaning;
        document.getElementById('flashcard-example').textContent = card.example;
    }

    updateCounter() {
        document.getElementById('current-card').textContent = this.currentIndex + 1;
        document.getElementById('total-cards').textContent = this.cards.length;
    }

    next() {
        if (this.currentIndex < this.cards.length - 1) {
            this.currentIndex++;
            this.updateCard();
            this.updateCounter();
        }
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCard();
            this.updateCounter();
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        this.currentIndex = 0;
        this.updateCard();
        this.updateCounter();
        this.app.showToast('Cards shuffled!', 'info');
    }

    filter(category) {
        this.cards = category === 'all' ? [...vocabularyData] : vocabularyData.filter(w => w.level === category);
        this.currentIndex = 0;
        this.updateCard();
        this.updateCounter();
    }
}