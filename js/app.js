// ============================================
// MAIN APPLICATION - app.js
// ============================================

class EnglishLearningApp {
    constructor() {
        this.currentSection = 'dashboard';
        this.userProgress = this.loadProgress();
        this.init();
    }

    init() {
        console.log('🚀 Initializing EnglishMaster App...');
        this.setupNavigation();
        this.setupSpeechSynthesis();
        this.trackDailyStreak();
        this.updateDashboard();
        this.initializeModules();
        this.initSpeakingModule();
        console.log('✅ App initialized successfully!');
    }

    // Setup navigation between sections
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const section = item.dataset.section;
                this.navigateTo(section);
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }

    // Navigate to section
    navigateTo(sectionId) {
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(sectionId);
        if (target) {
            target.classList.add('active');
            this.currentSection = sectionId;
        }
    }

    // Setup text-to-speech
    setupSpeechSynthesis() {
        window.speakWord = (text) => {
            if ('speechSynthesis' in window) {
                speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'en-US';
                utterance.rate = 0.9;
                speechSynthesis.speak(utterance);
            } else {
                this.showToast('Speech not supported', 'error');
            }
        };
    }

    // Update dashboard stats
    updateDashboard() {
        document.getElementById('streak-count').textContent = this.userProgress.streak || 0;
        document.getElementById('words-learned').textContent = this.userProgress.wordsLearned || 0;
        document.getElementById('quiz-score').textContent = (this.userProgress.quizAccuracy || 0) + '%';
        document.getElementById('time-spent').textContent = this.formatTime(this.userProgress.timeSpent || 0);
        
        const dailyXP = this.userProgress.dailyXP || 0;
        document.getElementById('daily-xp').textContent = dailyXP;
        this.updateProgressRing(Math.min(dailyXP, 50), 50);
        
        this.setWordOfTheDay();
        this.updateActivityList();
    }

    // Set word of the day
    setWordOfTheDay() {
        const dayIndex = new Date().getDate() % vocabularyData.length;
        const word = vocabularyData[dayIndex];
        if (word) {
            document.getElementById('wotd-word').textContent = word.word;
            document.getElementById('wotd-pronunciation').textContent = word.pronunciation;
            document.getElementById('wotd-type').textContent = word.type;
            document.getElementById('wotd-definition').textContent = word.meaning;
            document.getElementById('wotd-example').textContent = '"' + word.example + '"';
        }
    }

    // Update circular progress ring
    updateProgressRing(current, max) {
        const progress = document.getElementById('daily-progress');
        if (!progress) return;
        const circumference = 2 * Math.PI * 65;
        const offset = circumference - (current / max) * circumference;
        progress.style.strokeDasharray = circumference;
        progress.style.strokeDashoffset = Math.max(offset, 0);
    }

    // Track daily streak
    trackDailyStreak() {
        const today = new Date().toDateString();
        const lastVisit = this.userProgress.lastVisit;
        
        if (lastVisit !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastVisit === yesterday.toDateString()) {
                this.userProgress.streak = (this.userProgress.streak || 0) + 1;
            } else if (lastVisit && lastVisit !== today) {
                this.userProgress.streak = 1;
            } else if (!lastVisit) {
                this.userProgress.streak = 1;
            }
            
            this.userProgress.lastVisit = today;
            this.userProgress.dailyXP = 0;
            this.saveProgress();
        }
    }

    // Add XP
    addXP(amount) {
        this.userProgress.dailyXP = (this.userProgress.dailyXP || 0) + amount;
        this.userProgress.totalXP = (this.userProgress.totalXP || 0) + amount;
        this.saveProgress();
        this.updateDashboard();
        this.showToast('+' + amount + ' XP earned!', 'success');
        this.checkAchievements();
    }

    // Add activity
    addActivity(text) {
        const activities = this.userProgress.activities || [];
        activities.unshift({ text: text, time: new Date().toISOString() });
        this.userProgress.activities = activities.slice(0, 10);
        this.saveProgress();
        this.updateActivityList();
    }

    // Update activity list
    updateActivityList() {
        const list = document.getElementById('activity-list');
        const activities = this.userProgress.activities || [];
        
        if (activities.length === 0) {
            list.innerHTML = '<li><i class="fas fa-info-circle"></i><span>Start learning!</span><time>Now</time></li>';
            return;
        }
        
        list.innerHTML = activities.map(a => 
            '<li><i class="fas fa-check-circle"></i><span>' + a.text + '</span><time>' + this.timeAgo(new Date(a.time)) + '</time></li>'
        ).join('');
    }

    // Time ago helper
    timeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
        if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
        return Math.floor(seconds / 86400) + 'd ago';
    }

    // Format time
    formatTime(minutes) {
        if (minutes < 60) return minutes + 'm';
        return Math.floor(minutes / 60) + 'h';
    }

    // Load progress from localStorage
    loadProgress() {
        const saved = localStorage.getItem('englishAppProgress');
        return saved ? JSON.parse(saved) : {
            streak: 0,
            wordsLearned: 0,
            quizAccuracy: 0,
            timeSpent: 0,
            dailyXP: 0,
            totalXP: 0,
            lastVisit: null,
            activities: [],
            learnedWords: [],
            quizHistory: [],
            achievements: [],
            grammarProgress: {}
        };
    }

    // Save progress
    saveProgress() {
        localStorage.setItem('englishAppProgress', JSON.stringify(this.userProgress));
    }

    // Show toast notification
    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast ' + type;
        const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle';
        toast.innerHTML = '<i class="fas fa-' + icon + '"></i><span>' + message + '</span>';
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Check achievements
    checkAchievements() {
        const p = this.userProgress;
        achievementsData.forEach(a => {
            if (p.achievements.includes(a.id)) return;
            let unlocked = false;
            if (a.type === 'words') unlocked = p.wordsLearned >= a.requirement;
            if (a.type === 'streak') unlocked = p.streak >= a.requirement;
            if (a.type === 'quiz') unlocked = (p.quizHistory?.length || 0) >= a.requirement;
            if (a.type === 'accuracy') unlocked = p.quizAccuracy >= a.requirement;
            if (unlocked) {
                p.achievements.push(a.id);
                this.showToast('🏆 Achievement: ' + a.name + '!', 'success');
                this.saveProgress();
            }
        });
    }

    // Initialize all modules
    initializeModules() {
        setTimeout(() => {
            if (typeof VocabularyModule !== 'undefined') window.vocabModule = new VocabularyModule(this);
            if (typeof GrammarModule !== 'undefined') window.grammarModule = new GrammarModule(this);
            if (typeof FlashcardsModule !== 'undefined') window.flashcardsModule = new FlashcardsModule(this);
            if (typeof QuizModule !== 'undefined') window.quizModule = new QuizModule(this);
            if (typeof ProgressModule !== 'undefined') window.progressModule = new ProgressModule(this);
        }, 100);
    }

    // Initialize speaking module
    initSpeakingModule() {
        let currentSentence = speakingSentences[0];

        document.getElementById('listen-sentence')?.addEventListener('click', () => {
            speakWord(currentSentence);
        });

        document.getElementById('new-sentence')?.addEventListener('click', () => {
            currentSentence = speakingSentences[Math.floor(Math.random() * speakingSentences.length)];
            document.getElementById('speaking-text').textContent = currentSentence;
        });

        // Speech Recognition
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';

            const recordBtn = document.getElementById('record-btn');
            const resultEl = document.getElementById('recording-result');

            if (recordBtn) {
                const startRecording = () => {
                    recognition.start();
                    recordBtn.classList.add('recording');
                    resultEl.textContent = 'Listening...';
                };

                const stopRecording = () => {
                    recognition.stop();
                    recordBtn.classList.remove('recording');
                };

                recordBtn.addEventListener('mousedown', startRecording);
                recordBtn.addEventListener('mouseup', stopRecording);
                recordBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startRecording(); });
                recordBtn.addEventListener('touchend', (e) => { e.preventDefault(); stopRecording(); });

                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    const confidence = Math.round(event.results[0][0].confidence * 100);
                    resultEl.innerHTML = '<strong>You said:</strong> "' + transcript + '"<br><strong>Confidence:</strong> ' + confidence + '%';
                    
                    if (confidence > 80) {
                        resultEl.innerHTML += '<br><span style="color:#43e97b">✓ Excellent!</span>';
                        this.addXP(10);
                    } else if (confidence > 50) {
                        resultEl.innerHTML += '<br><span style="color:#f5a623">◐ Good try!</span>';
                        this.addXP(5);
                    } else {
                        resultEl.innerHTML += '<br><span style="color:#f5576c">✗ Keep practicing!</span>';
                    }
                };

                recognition.onerror = (event) => {
                    resultEl.textContent = 'Error: ' + event.error;
                    recordBtn.classList.remove('recording');
                };
            }
        }
    }
}

// Rewarded Ad Function
function watchRewardedAd() {
    window.app.showToast('Thanks for watching! +20 XP', 'success');
    window.app.addXP(20);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new EnglishLearningApp();
});