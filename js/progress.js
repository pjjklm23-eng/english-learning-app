// ============================================
// PROGRESS MODULE - progress.js
// ============================================

class ProgressModule {
    constructor(app) {
        this.app = app;
        this.init();
    }

    init() {
        this.renderAchievements();
        this.renderSkills();
        this.renderCalendar();
        this.updateLevel();
    }

    updateLevel() {
        const xp = this.app.userProgress.totalXP || 0;
        const level = Math.floor(xp / 100) + 1;
        const xpInLevel = xp % 100;
        
        document.getElementById('user-level').textContent = level;
        document.getElementById('xp-fill').style.width = xpInLevel + '%';
        document.getElementById('xp-text').textContent = xpInLevel + ' / 100 XP to next level';
        
        let title = 'Beginner';
        if (level >= 10) title = 'Advanced';
        else if (level >= 5) title = 'Intermediate';
        document.getElementById('level-title').textContent = title;
    }

    renderAchievements() {
        const grid = document.getElementById('achievements-grid');
        if (!grid) return;

        const unlocked = this.app.userProgress.achievements || [];
        
        grid.innerHTML = achievementsData.map(a => 
            '<div class="achievement ' + (unlocked.includes(a.id) ? 'unlocked' : '') + '">' +
            '<div class="achievement-icon">' + a.icon + '</div>' +
            '<span>' + a.name + '</span></div>'
        ).join('');
    }

    renderSkills() {
        const list = document.getElementById('skills-list');
        if (!list) return;

        const p = this.app.userProgress;
        const skills = [
            { name: 'Vocabulary', percent: Math.min((p.wordsLearned || 0) * 5, 100) },
            { name: 'Grammar', percent: this.getGrammarProgress() },
            { name: 'Quizzes', percent: p.quizAccuracy || 0 },
            { name: 'Speaking', percent: Math.min((p.totalXP || 0) / 5, 100) }
        ];

        list.innerHTML = skills.map(s => 
            '<div class="skill-item">' +
            '<span class="skill-name">' + s.name + '</span>' +
            '<div class="skill-bar"><div class="skill-fill" style="width:' + s.percent + '%"></div></div>' +
            '<span class="skill-percent">' + Math.round(s.percent) + '%</span></div>'
        ).join('');
    }

    getGrammarProgress() {
        const gp = this.app.userProgress.grammarProgress || {};
        const values = Object.values(gp);
        if (values.length === 0) return 0;
        return Math.round(values.reduce((a, b) => a + b, 0) / grammarData.length);
    }

    renderCalendar() {
        const calendar = document.getElementById('history-calendar');
        if (!calendar) return;

        const days = [];
        for (let i = 34; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toDateString();
            const isActive = dateStr === this.app.userProgress.lastVisit;
            days.push('<div class="calendar-day ' + (isActive ? 'active' : (Math.random() > 0.6 ? 'partial' : '')) + '"></div>');
        }
        calendar.innerHTML = days.join('');
    }
}