// ============================================
// VOCABULARY DATA
// ============================================
const vocabularyData = [
    {
        id: 1,
        word: "Abundant",
        pronunciation: "/əˈbʌndənt/",
        type: "adjective",
        meaning: "Existing or available in large quantities; plentiful",
        example: "The region has abundant natural resources.",
        level: "intermediate",
        category: "general"
    },
    {
        id: 2,
        word: "Accomplish",
        pronunciation: "/əˈkɒmplɪʃ/",
        type: "verb",
        meaning: "To succeed in doing or completing something",
        example: "She accomplished her goal of running a marathon.",
        level: "beginner",
        category: "general"
    },
    {
        id: 3,
        word: "Benevolent",
        pronunciation: "/bɪˈnevələnt/",
        type: "adjective",
        meaning: "Well meaning and kindly",
        example: "A benevolent smile crossed her face.",
        level: "advanced",
        category: "general"
    },
    {
        id: 4,
        word: "Comprehensive",
        pronunciation: "/ˌkɒmprɪˈhensɪv/",
        type: "adjective",
        meaning: "Including all or nearly all elements; complete",
        example: "A comprehensive study of the market was conducted.",
        level: "intermediate",
        category: "business"
    },
    {
        id: 5,
        word: "Diligent",
        pronunciation: "/ˈdɪlɪdʒənt/",
        type: "adjective",
        meaning: "Having or showing care in one's work or duties",
        example: "She was a diligent student who always completed her assignments.",
        level: "intermediate",
        category: "academic"
    },
    {
        id: 6,
        word: "Eloquent",
        pronunciation: "/ˈeləkwənt/",
        type: "adjective",
        meaning: "Fluent or persuasive in speaking or writing",
        example: "She gave an eloquent speech at the conference.",
        level: "advanced",
        category: "general"
    },
    {
        id: 7,
        word: "Feasible",
        pronunciation: "/ˈfiːzəbl/",
        type: "adjective",
        meaning: "Possible to do easily or conveniently",
        example: "It's not feasible to complete the project by Friday.",
        level: "intermediate",
        category: "business"
    },
    {
        id: 8,
        word: "Gratitude",
        pronunciation: "/ˈɡratɪtjuːd/",
        type: "noun",
        meaning: "The quality of being thankful",
        example: "She expressed her gratitude to everyone who helped.",
        level: "beginner",
        category: "general"
    },
    {
        id: 9,
        word: "Hypothesis",
        pronunciation: "/haɪˈpɒθəsɪs/",
        type: "noun",
        meaning: "A proposed explanation based on limited evidence",
        example: "The scientist tested his hypothesis through experiments.",
        level: "advanced",
        category: "academic"
    },
    {
        id: 10,
        word: "Innovative",
        pronunciation: "/ˈɪnəveɪtɪv/",
        type: "adjective",
        meaning: "Introducing new ideas; original and creative",
        example: "The company is known for its innovative products.",
        level: "intermediate",
        category: "business"
    },
    {
        id: 11,
        word: "Justify",
        pronunciation: "/ˈdʒʌstɪfaɪ/",
        type: "verb",
        meaning: "Show or prove to be right or reasonable",
        example: "How can you justify such behavior?",
        level: "beginner",
        category: "general"
    },
    {
        id: 12,
        word: "Knowledgeable",
        pronunciation: "/ˈnɒlɪdʒəbl/",
        type: "adjective",
        meaning: "Intelligent and well informed",
        example: "She is very knowledgeable about art history.",
        level: "intermediate",
        category: "academic"
    },
    {
        id: 13,
        word: "Leverage",
        pronunciation: "/ˈliːvərɪdʒ/",
        type: "noun/verb",
        meaning: "The power to influence; use to maximum advantage",
        example: "We need to leverage our existing resources.",
        level: "advanced",
        category: "business"
    },
    {
        id: 14,
        word: "Meticulous",
        pronunciation: "/mɪˈtɪkjʊləs/",
        type: "adjective",
        meaning: "Showing great attention to detail; very careful",
        example: "He is meticulous about keeping records.",
        level: "advanced",
        category: "general"
    },
    {
        id: 15,
        word: "Negotiate",
        pronunciation: "/nɪˈɡəʊʃieɪt/",
        type: "verb",
        meaning: "Try to reach an agreement through discussion",
        example: "We managed to negotiate a better deal.",
        level: "intermediate",
        category: "business"
    },
    {
        id: 16,
        word: "Opportunity",
        pronunciation: "/ˌɒpəˈtjuːnɪti/",
        type: "noun",
        meaning: "A time or situation when something can be done",
        example: "This is a great opportunity for career growth.",
        level: "beginner",
        category: "general"
    },
    {
        id: 17,
        word: "Perseverance",
        pronunciation: "/ˌpɜːsɪˈvɪərəns/",
        type: "noun",
        meaning: "Persistence in doing something despite difficulty",
        example: "Success requires hard work and perseverance.",
        level: "intermediate",
        category: "general"
    },
    {
        id: 18,
        word: "Resilient",
        pronunciation: "/rɪˈzɪliənt/",
        type: "adjective",
        meaning: "Able to recover quickly from difficulties",
        example: "Children are often more resilient than adults.",
        level: "intermediate",
        category: "general"
    },
    {
        id: 19,
        word: "Substantial",
        pronunciation: "/səbˈstænʃəl/",
        type: "adjective",
        meaning: "Of considerable importance, size, or worth",
        example: "They made a substantial contribution to the project.",
        level: "intermediate",
        category: "business"
    },
    {
        id: 20,
        word: "Transparent",
        pronunciation: "/trænsˈpærənt/",
        type: "adjective",
        meaning: "Easy to perceive; obvious; open and honest",
        example: "The company promises to be transparent about its practices.",
        level: "beginner",
        category: "business"
    }
];

// ============================================
// GRAMMAR DATA
// ============================================
const grammarData = [
    {
        id: 1,
        title: "Present Simple Tense",
        description: "Learn when and how to use the present simple tense",
        progress: 0,
        content: `
            <h2>Present Simple Tense</h2>
            <p>The present simple tense is used to describe habits, unchanging situations, general truths, and fixed arrangements.</p>
            
            <h3>Formation</h3>
            <p><strong>Positive:</strong> Subject + base verb (+ s/es for he/she/it)</p>
            <p><strong>Negative:</strong> Subject + do/does + not + base verb</p>
            <p><strong>Question:</strong> Do/Does + subject + base verb?</p>
            
            <div class="example-box">
                <p><span class="correct">✓ She works in a bank.</span></p>
                <p><span class="correct">✓ I don't like coffee.</span></p>
                <p><span class="correct">✓ Does he play tennis?</span></p>
            </div>
            
            <h3>Usage</h3>
            <ul>
                <li><strong>Habits:</strong> I wake up at 7 AM every day.</li>
                <li><strong>Facts:</strong> Water boils at 100°C.</li>
                <li><strong>Schedules:</strong> The train leaves at 9 PM.</li>
            </ul>
        `,
        exercises: [
            { question: "She ___ (work) in a hospital.", answer: "works" },
            { question: "They ___ (not/like) spicy food.", answer: "don't like" },
            { question: "___ he ___ (speak) French?", answer: "does, speak" }
        ]
    },
    {
        id: 2,
        title: "Present Continuous Tense",
        description: "Master the present continuous for ongoing actions",
        progress: 0,
        content: `
            <h2>Present Continuous Tense</h2>
            <p>The present continuous describes actions happening now or temporary situations.</p>
            
            <h3>Formation</h3>
            <p><strong>Positive:</strong> Subject + am/is/are + verb-ing</p>
            <p><strong>Negative:</strong> Subject + am/is/are + not + verb-ing</p>
            <p><strong>Question:</strong> Am/Is/Are + subject + verb-ing?</p>
            
            <div class="example-box">
                <p><span class="correct">✓ I am reading a book right now.</span></p>
                <p><span class="correct">✓ She isn't working today.</span></p>
                <p><span class="correct">✓ Are they coming to the party?</span></p>
            </div>
            
            <h3>Usage</h3>
            <ul>
                <li><strong>Now:</strong> I'm studying for my exam.</li>
                <li><strong>Temporary:</strong> He's staying with us this week.</li>
                <li><strong>Future plans:</strong> We're meeting tomorrow.</li>
            </ul>
        `,
        exercises: [
            { question: "Look! The baby ___ (sleep).", answer: "is sleeping" },
            { question: "We ___ (not/watch) TV now.", answer: "aren't watching" }
        ]
    },
    {
        id: 3,
        title: "Past Simple Tense",
        description: "Learn to talk about completed actions in the past",
        progress: 0,
        content: `
            <h2>Past Simple Tense</h2>
            <p>The past simple is used for completed actions at a specific time in the past.</p>
            
            <h3>Formation</h3>
            <p><strong>Regular verbs:</strong> Add -ed (worked, played)</p>
            <p><strong>Irregular verbs:</strong> Use past form (went, saw, had)</p>
            
            <div class="example-box">
                <p><span class="correct">✓ I visited Paris last summer.</span></p>
                <p><span class="correct">✓ She didn't go to school yesterday.</span></p>
                <p><span class="correct">✓ Did you see the movie?</span></p>
            </div>
            
            <h3>Common Irregular Verbs</h3>
            <ul>
                <li>go → went</li>
                <li>see → saw</li>
                <li>have → had</li>
                <li>make → made</li>
            </ul>
        `,
        exercises: [
            { question: "She ___ (buy) a new car last month.", answer: "bought" },
            { question: "They ___ (not/arrive) on time.", answer: "didn't arrive" }
        ]
    },
    {
        id: 4,
        title: "Present Perfect Tense",
        description: "Connect the past to the present",
        progress: 0,
        content: `
            <h2>Present Perfect Tense</h2>
            <p>The present perfect connects past actions to the present moment.</p>
            
            <h3>Formation</h3>
            <p><strong>Positive:</strong> Subject + have/has + past participle</p>
            <p><strong>Negative:</strong> Subject + have/has + not + past participle</p>
            
            <div class="example-box">
                <p><span class="correct">✓ I have lived here for five years.</span></p>
                <p><span class="correct">✓ She has never been to Japan.</span></p>
                <p><span class="correct">✓ Have you finished your homework?</span></p>
            </div>
            
            <h3>Key Words</h3>
            <ul>
                <li>ever, never, already, yet, just</li>
                <li>for (duration), since (point in time)</li>
            </ul>
        `,
        exercises: [
            { question: "I ___ (never/try) sushi.", answer: "have never tried" },
            { question: "She ___ (live) here since 2015.", answer: "has lived" }
        ]
    },
    {
        id: 5,
        title: "Future Tenses",
        description: "Different ways to talk about the future",
        progress: 0,
        content: `
            <h2>Future Tenses</h2>
            <p>English has several ways to express future time.</p>
            
            <h3>Will + Infinitive</h3>
            <p>For predictions, promises, and spontaneous decisions.</p>
            <div class="example-box">
                <p><span class="correct">✓ I think it will rain tomorrow.</span></p>
                <p><span class="correct">✓ I'll help you with that.</span></p>
            </div>
            
            <h3>Going to + Infinitive</h3>
            <p>For plans and intentions.</p>
            <div class="example-box">
                <p><span class="correct">✓ I'm going to study medicine.</span></p>
            </div>
        `,
        exercises: [
            { question: "I think she ___ (be) late.", answer: "will be" },
            { question: "We ___ (visit) grandma next week. (plan)", answer: "are going to visit" }
        ]
    },
    {
        id: 6,
        title: "Conditionals",
        description: "Learn all types of conditional sentences",
        progress: 0,
        content: `
            <h2>Conditional Sentences</h2>
            
            <h3>First Conditional (Real possibility)</h3>
            <p>If + present simple, will + infinitive</p>
            <div class="example-box">
                <p><span class="correct">✓ If it rains, I will stay home.</span></p>
            </div>
            
            <h3>Second Conditional (Hypothetical)</h3>
            <p>If + past simple, would + infinitive</p>
            <div class="example-box">
                <p><span class="correct">✓ If I won the lottery, I would travel.</span></p>
            </div>
        `,
        exercises: [
            { question: "If it ___ (rain), we will cancel.", answer: "rains" },
            { question: "If I ___ (be) you, I would apologize.", answer: "were" }
        ]
    }
];

// ============================================
// SPEAKING SENTENCES
// ============================================
const speakingSentences = [
    "The quick brown fox jumps over the lazy dog.",
    "She sells seashells by the seashore.",
    "How much wood would a woodchuck chuck?",
    "Peter Piper picked a peck of pickled peppers.",
    "The weather is beautiful today.",
    "Can you help me find the nearest restaurant?",
    "I would like to make a reservation for two.",
    "What time does the museum open?",
    "Thank you very much for your help.",
    "Could you please repeat that?",
    "I'm sorry, I don't understand.",
    "Where is the train station?",
    "How do I get to the airport?",
    "I'd like to order a cup of coffee, please.",
    "Learning a new language takes time and patience."
];

// ============================================
// ACHIEVEMENTS DATA
// ============================================
const achievementsData = [
    { id: 'first-word', icon: '📖', name: 'First Word', requirement: 1, type: 'words' },
    { id: 'vocab-10', icon: '📚', name: 'Collector', requirement: 10, type: 'words' },
    { id: 'vocab-50', icon: '🎓', name: 'Scholar', requirement: 50, type: 'words' },
    { id: 'streak-3', icon: '🔥', name: 'On Fire', requirement: 3, type: 'streak' },
    { id: 'streak-7', icon: '⚡', name: 'Week Warrior', requirement: 7, type: 'streak' },
    { id: 'streak-30', icon: '🏆', name: 'Dedicated', requirement: 30, type: 'streak' },
    { id: 'quiz-first', icon: '✅', name: 'First Quiz', requirement: 1, type: 'quiz' },
    { id: 'quiz-perfect', icon: '⭐', name: 'Perfect!', requirement: 100, type: 'accuracy' },
    { id: 'grammar-1', icon: '✍️', name: 'Grammar Pro', requirement: 1, type: 'grammar' }
];

console.log('✅ Content data loaded successfully!');