// ============================================
// PREMIUM SUBSCRIPTION MODULE - premium.js
// ============================================

class PremiumManager {
    constructor(app) {
        this.app = app;
        this.pricing = {
            // Asia
            'IN': { currency: '₹', symbol: '₹', price: 79, name: 'India', yearly: 799 },
            'PK': { currency: 'PKR', symbol: 'Rs', price: 499, name: 'Pakistan', yearly: 4999 },
            'BD': { currency: 'BDT', symbol: '৳', price: 149, name: 'Bangladesh', yearly: 1499 },
            'ID': { currency: 'IDR', symbol: 'Rp', price: 29000, name: 'Indonesia', yearly: 290000 },
            'PH': { currency: 'PHP', symbol: '₱', price: 99, name: 'Philippines', yearly: 999 },
            'MY': { currency: 'MYR', symbol: 'RM', price: 9.90, name: 'Malaysia', yearly: 99 },
            'TH': { currency: 'THB', symbol: '฿', price: 79, name: 'Thailand', yearly: 790 },
            'VN': { currency: 'VND', symbol: '₫', price: 49000, name: 'Vietnam', yearly: 490000 },
            'NP': { currency: 'NPR', symbol: 'रू', price: 149, name: 'Nepal', yearly: 1490 },
            'LK': { currency: 'LKR', symbol: 'Rs', price: 499, name: 'Sri Lanka', yearly: 4990 },
            
            // Americas
            'US': { currency: 'USD', symbol: '$', price: 2.99, name: 'United States', yearly: 29.99 },
            'CA': { currency: 'CAD', symbol: 'C$', price: 3.99, name: 'Canada', yearly: 39.99 },
            'BR': { currency: 'BRL', symbol: 'R$', price: 9.90, name: 'Brazil', yearly: 99.90 },
            'MX': { currency: 'MXN', symbol: 'MX$', price: 49, name: 'Mexico', yearly: 499 },
            'AR': { currency: 'ARS', symbol: 'AR$', price: 499, name: 'Argentina', yearly: 4999 },
            
            // Europe
            'GB': { currency: 'GBP', symbol: '£', price: 2.49, name: 'United Kingdom', yearly: 24.99 },
            'DE': { currency: 'EUR', symbol: '€', price: 2.79, name: 'Germany', yearly: 27.99 },
            'FR': { currency: 'EUR', symbol: '€', price: 2.79, name: 'France', yearly: 27.99 },
            'IT': { currency: 'EUR', symbol: '€', price: 2.79, name: 'Italy', yearly: 27.99 },
            'ES': { currency: 'EUR', symbol: '€', price: 2.79, name: 'Spain', yearly: 27.99 },
            'NL': { currency: 'EUR', symbol: '€', price: 2.79, name: 'Netherlands', yearly: 27.99 },
            'PL': { currency: 'PLN', symbol: 'zł', price: 9.99, name: 'Poland', yearly: 99.99 },
            'RU': { currency: 'RUB', symbol: '₽', price: 149, name: 'Russia', yearly: 1490 },
            'TR': { currency: 'TRY', symbol: '₺', price: 49.99, name: 'Turkey', yearly: 499.99 },
            'UA': { currency: 'UAH', symbol: '₴', price: 79, name: 'Ukraine', yearly: 790 },
            
            // Africa
            'NG': { currency: 'NGN', symbol: '₦', price: 999, name: 'Nigeria', yearly: 9999 },
            'ZA': { currency: 'ZAR', symbol: 'R', price: 39.99, name: 'South Africa', yearly: 399.99 },
            'EG': { currency: 'EGP', symbol: 'E£', price: 49, name: 'Egypt', yearly: 490 },
            'KE': { currency: 'KES', symbol: 'KSh', price: 199, name: 'Kenya', yearly: 1999 },
            
            // Middle East
            'AE': { currency: 'AED', symbol: 'د.إ', price: 9.99, name: 'UAE', yearly: 99.99 },
            'SA': { currency: 'SAR', symbol: 'ر.س', price: 9.99, name: 'Saudi Arabia', yearly: 99.99 },
            
            // Oceania
            'AU': { currency: 'AUD', symbol: 'A$', price: 4.49, name: 'Australia', yearly: 44.99 },
            'NZ': { currency: 'NZD', symbol: 'NZ$', price: 4.99, name: 'New Zealand', yearly: 49.99 },
            
            // East Asia
            'JP': { currency: 'JPY', symbol: '¥', price: 350, name: 'Japan', yearly: 3500 },
            'KR': { currency: 'KRW', symbol: '₩', price: 2900, name: 'South Korea', yearly: 29000 },
            'CN': { currency: 'CNY', symbol: '¥', price: 19.9, name: 'China', yearly: 199 },
            'TW': { currency: 'TWD', symbol: 'NT$', price: 79, name: 'Taiwan', yearly: 790 },
            'HK': { currency: 'HKD', symbol: 'HK$', price: 19.9, name: 'Hong Kong', yearly: 199 },
            'SG': { currency: 'SGD', symbol: 'S$', price: 3.99, name: 'Singapore', yearly: 39.99 },
            
            // Default (fallback)
            'DEFAULT': { currency: 'USD', symbol: '$', price: 2.99, name: 'International', yearly: 29.99 }
        };
        
        this.userCountry = null;
        this.currentPricing = null;
        this.premiumFeatures = {
            unlimitedVocab: true,
            allGrammarLessons: true,
            unlimitedQuizzes: true,
            noAds: true,
            offlineMode: true,
            detailedReports: true,
            unlimitedSpeaking: true,
            prioritySupport: true,
            customThemes: true,
            downloadLessons: true
        };
        
        this.init();
    }

    async init() {
        await this.detectCountry();
        this.loadPremiumStatus();
        this.setupPremiumUI();
        console.log('💎 Premium Manager initialized for:', this.userCountry);
    }

    // Detect user's country using IP
    async detectCountry() {
        try {
            // Try multiple IP detection services
            const services = [
                'https://ipapi.co/json/',
                'https://ip-api.com/json/',
                'https://ipinfo.io/json'
            ];
            
            for (const service of services) {
                try {
                    const response = await fetch(service);
                    const data = await response.json();
                    this.userCountry = data.country_code || data.country || 'DEFAULT';
                    break;
                } catch (e) {
                    continue;
                }
            }
        } catch (error) {
            console.log('Could not detect country, using default');
            this.userCountry = 'DEFAULT';
        }
        
        this.currentPricing = this.pricing[this.userCountry] || this.pricing['DEFAULT'];
        return this.currentPricing;
    }

    // Check if user is premium
    isPremium() {
        const premiumData = this.app.userProgress.premium;
        if (!premiumData) return false;
        
        const expiryDate = new Date(premiumData.expiresAt);
        return expiryDate > new Date();
    }

    // Get days remaining
    getDaysRemaining() {
        if (!this.isPremium()) return 0;
        const expiryDate = new Date(this.app.userProgress.premium.expiresAt);
        const today = new Date();
        const diffTime = expiryDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(0, diffDays);
    }

    // Load premium status
    loadPremiumStatus() {
        if (!this.app.userProgress.premium) {
            this.app.userProgress.premium = {
                isPremium: false,
                plan: null,
                purchasedAt: null,
                expiresAt: null,
                country: null
            };
        }
    }

    // Check if feature is available
    canUseFeature(feature) {
        const freeLimit = {
            dailyQuizzes: 3,
            vocabularyWords: 20,
            grammarLessons: 2,
            speakingSessions: 5
        };

        if (this.isPremium()) return true;

        // Check free limits
        const usage = this.app.userProgress.dailyUsage || {};
        const today = new Date().toDateString();
        
        if (usage.date !== today) {
            this.app.userProgress.dailyUsage = { date: today };
            this.app.saveProgress();
        }

        const currentUsage = usage[feature] || 0;
        return currentUsage < (freeLimit[feature] || Infinity);
    }

    // Track feature usage
    trackUsage(feature) {
        if (this.isPremium()) return;
        
        const today = new Date().toDateString();
        if (!this.app.userProgress.dailyUsage || this.app.userProgress.dailyUsage.date !== today) {
            this.app.userProgress.dailyUsage = { date: today };
        }
        
        this.app.userProgress.dailyUsage[feature] = (this.app.userProgress.dailyUsage[feature] || 0) + 1;
        this.app.saveProgress();
    }

    // Get remaining usage
    getRemainingUsage(feature) {
        const freeLimit = {
            dailyQuizzes: 3,
            vocabularyWords: 20,
            grammarLessons: 2,
            speakingSessions: 5
        };

        if (this.isPremium()) return 'Unlimited';

        const usage = this.app.userProgress.dailyUsage || {};
        const currentUsage = usage[feature] || 0;
        const limit = freeLimit[feature] || 0;
        
        return Math.max(0, limit - currentUsage);
    }

    // Setup premium UI elements
    setupPremiumUI() {
        this.addPremiumNavItem();
        this.updatePremiumBadges();
    }

    // Add premium item to navigation
    addPremiumNavItem() {
        const navMenu = document.querySelector('.nav-menu');
        if (!navMenu) return;

        // Check if already exists
        if (document.querySelector('[data-section="premium"]')) return;

        const premiumItem = document.createElement('li');
        premiumItem.className = 'nav-item premium-nav';
        premiumItem.dataset.section = 'premium';
        premiumItem.innerHTML = `
            <i class="fas fa-crown"></i>
            <span>${this.isPremium() ? 'My Premium' : 'Go Premium'}</span>
        `;
        
        premiumItem.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            premiumItem.classList.add('active');
            this.showPremiumPage();
        });
        
        navMenu.appendChild(premiumItem);
    }

    // Update premium badges throughout app
    updatePremiumBadges() {
        // Add premium badge to user profile if premium
        const userProfile = document.querySelector('.user-profile');
        if (userProfile && this.isPremium()) {
            if (!userProfile.querySelector('.premium-badge')) {
                const badge = document.createElement('span');
                badge.className = 'premium-badge';
                badge.innerHTML = '<i class="fas fa-crown"></i> Premium';
                userProfile.appendChild(badge);
            }
        }
    }

    // Show premium page
    showPremiumPage() {
        // Hide all sections
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        
        // Create or show premium section
        let premiumSection = document.getElementById('premium');
        
        if (!premiumSection) {
            premiumSection = document.createElement('section');
            premiumSection.id = 'premium';
            premiumSection.className = 'section';
            document.querySelector('.main-content').appendChild(premiumSection);
        }
        
        premiumSection.classList.add('active');
        premiumSection.innerHTML = this.getPremiumPageHTML();
        
        // Setup event listeners
        this.setupPremiumPageEvents();
    }

    // Generate premium page HTML
    getPremiumPageHTML() {
        const pricing = this.currentPricing;
        const isPremium = this.isPremium();
        const daysRemaining = this.getDaysRemaining();

        if (isPremium) {
            return this.getPremiumUserHTML(daysRemaining);
        }

        return `
            <div class="section-header">
                <h1>👑 Go Premium</h1>
                <p>Unlock all features and learn faster!</p>
            </div>

            <!-- Country Detection Banner -->
            <div class="country-banner">
                <img src="https://flagcdn.com/24x18/${this.userCountry.toLowerCase()}.png" alt="flag" onerror="this.style.display='none'">
                <span>Pricing for ${pricing.name}</span>
                <button class="btn-change-country" onclick="premiumManager.showCountrySelector()">
                    Change Region
                </button>
            </div>

            <!-- Pricing Cards -->
            <div class="pricing-container">
                <!-- Monthly Plan -->
                <div class="pricing-card">
                    <div class="pricing-header">
                        <h3>Monthly</h3>
                        <div class="pricing-amount">
                            <span class="currency">${pricing.symbol}</span>
                            <span class="price">${pricing.price}</span>
                            <span class="period">/month</span>
                        </div>
                    </div>
                    <ul class="pricing-features">
                        <li><i class="fas fa-check"></i> Unlimited Vocabulary</li>
                        <li><i class="fas fa-check"></i> All Grammar Lessons</li>
                        <li><i class="fas fa-check"></i> Unlimited Quizzes</li>
                        <li><i class="fas fa-check"></i> No Advertisements</li>
                        <li><i class="fas fa-check"></i> Offline Mode</li>
                        <li><i class="fas fa-check"></i> Detailed Reports</li>
                    </ul>
                    <button class="btn-subscribe" onclick="premiumManager.subscribe('monthly')">
                        Subscribe Monthly
                    </button>
                </div>

                <!-- Yearly Plan (Recommended) -->
                <div class="pricing-card featured">
                    <div class="pricing-badge">Save ${Math.round((1 - (pricing.yearly / (pricing.price * 12))) * 100)}%</div>
                    <div class="pricing-header">
                        <h3>Yearly</h3>
                        <div class="pricing-amount">
                            <span class="currency">${pricing.symbol}</span>
                            <span class="price">${pricing.yearly}</span>
                            <span class="period">/year</span>
                        </div>
                        <p class="monthly-equivalent">
                            Just ${pricing.symbol}${(pricing.yearly / 12).toFixed(2)}/month
                        </p>
                    </div>
                    <ul class="pricing-features">
                        <li><i class="fas fa-check"></i> Everything in Monthly</li>
                        <li><i class="fas fa-check"></i> Priority Support</li>
                        <li><i class="fas fa-check"></i> Custom Themes</li>
                        <li><i class="fas fa-check"></i> Download Lessons</li>
                        <li><i class="fas fa-check"></i> Early Access Features</li>
                        <li><i class="fas fa-star"></i> <strong>Best Value!</strong></li>
                    </ul>
                    <button class="btn-subscribe featured" onclick="premiumManager.subscribe('yearly')">
                        Subscribe Yearly
                    </button>
                </div>
            </div>

            <!-- Features Comparison -->
            <div class="features-comparison">
                <h2>Free vs Premium</h2>
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Free</th>
                            <th>Premium 👑</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Vocabulary Words</td>
                            <td>20 words</td>
                            <td><i class="fas fa-infinity"></i> Unlimited</td>
                        </tr>
                        <tr>
                            <td>Grammar Lessons</td>
                            <td>2 lessons</td>
                            <td><i class="fas fa-infinity"></i> All lessons</td>
                        </tr>
                        <tr>
                            <td>Daily Quizzes</td>
                            <td>3 per day</td>
                            <td><i class="fas fa-infinity"></i> Unlimited</td>
                        </tr>
                        <tr>
                            <td>Speaking Practice</td>
                            <td>5 per day</td>
                            <td><i class="fas fa-infinity"></i> Unlimited</td>
                        </tr>
                        <tr>
                            <td>Advertisements</td>
                            <td><i class="fas fa-times text-danger"></i> Yes</td>
                            <td><i class="fas fa-check text-success"></i> No Ads</td>
                        </tr>
                        <tr>
                            <td>Offline Mode</td>
                            <td><i class="fas fa-times text-danger"></i> No</td>
                            <td><i class="fas fa-check text-success"></i> Yes</td>
                        </tr>
                        <tr>
                            <td>Progress Reports</td>
                            <td>Basic</td>
                            <td>Detailed Analytics</td>
                        </tr>
                        <tr>
                            <td>Support</td>
                            <td>Community</td>
                            <td>Priority Email</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Testimonials -->
            <div class="testimonials">
                <h2>What Premium Users Say</h2>
                <div class="testimonial-grid">
                    <div class="testimonial-card">
                        <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
                        <p>"Premium is worth every rupee! No ads and unlimited quizzes helped me improve so fast."</p>
                        <div class="testimonial-author">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=priya" alt="User">
                            <span>Priya S., India</span>
                        </div>
                    </div>
                    <div class="testimonial-card">
                        <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
                        <p>"The offline mode is a game changer. I study during my commute every day!"</p>
                        <div class="testimonial-author">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=john" alt="User">
                            <span>John D., USA</span>
                        </div>
                    </div>
                    <div class="testimonial-card">
                        <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
                        <p>"Best English learning app! Premium unlocked my full potential."</p>
                        <div class="testimonial-author">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=maria" alt="User">
                            <span>Maria G., Brazil</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- FAQ -->
            <div class="premium-faq">
                <h2>Frequently Asked Questions</h2>
                <div class="faq-list">
                    <div class="faq-item">
                        <div class="faq-question" onclick="this.parentElement.classList.toggle('open')">
                            <span>Can I cancel anytime?</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="faq-answer">
                            Yes! You can cancel your subscription anytime. You'll continue to have access until the end of your billing period.
                        </div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question" onclick="this.parentElement.classList.toggle('open')">
                            <span>What payment methods do you accept?</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="faq-answer">
                            We accept credit/debit cards, UPI, net banking, PayPal, and various local payment methods depending on your region.
                        </div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question" onclick="this.parentElement.classList.toggle('open')">
                            <span>Is there a free trial?</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="faq-answer">
                            Yes! New users get a 7-day free trial of Premium. No credit card required to start.
                        </div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question" onclick="this.parentElement.classList.toggle('open')">
                            <span>Can I get a refund?</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="faq-answer">
                            Yes, we offer a 30-day money-back guarantee. If you're not satisfied, contact us for a full refund.
                        </div>
                    </div>
                </div>
            </div>

            <!-- Money Back Guarantee -->
            <div class="guarantee-banner">
                <i class="fas fa-shield-alt"></i>
                <div>
                    <h3>30-Day Money-Back Guarantee</h3>
                    <p>Not satisfied? Get a full refund within 30 days, no questions asked.</p>
                </div>
            </div>
        `;
    }

    // HTML for premium users
    getPremiumUserHTML(daysRemaining) {
        const premiumData = this.app.userProgress.premium;
        return `
            <div class="section-header">
                <h1>👑 Your Premium Membership</h1>
                <p>Thank you for being a premium member!</p>
            </div>

            <div class="premium-status-card">
                <div class="premium-status-icon">
                    <i class="fas fa-crown"></i>
                </div>
                <div class="premium-status-info">
                    <h2>Premium Active</h2>
                    <p class="premium-plan">${premiumData.plan === 'yearly' ? 'Yearly Plan' : 'Monthly Plan'}</p>
                    <p class="premium-expiry">
                        <i class="fas fa-calendar"></i>
                        ${daysRemaining} days remaining
                    </p>
                    <p class="premium-since">
                        Member since ${new Date(premiumData.purchasedAt).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <div class="premium-benefits-grid">
                <div class="benefit-card active">
                    <i class="fas fa-book"></i>
                    <h3>Unlimited Vocabulary</h3>
                    <p>Access all ${vocabularyData.length}+ words</p>
                </div>
                <div class="benefit-card active">
                    <i class="fas fa-spell-check"></i>
                    <h3>All Grammar Lessons</h3>
                    <p>Access all ${grammarData.length} lessons</p>
                </div>
                <div class="benefit-card active">
                    <i class="fas fa-question-circle"></i>
                    <h3>Unlimited Quizzes</h3>
                    <p>No daily limits</p>
                </div>
                <div class="benefit-card active">
                    <i class="fas fa-ban"></i>
                    <h3>No Ads</h3>
                    <p>Ad-free experience</p>
                </div>
                <div class="benefit-card active">
                    <i class="fas fa-wifi-slash"></i>
                    <h3>Offline Mode</h3>
                    <p>Learn without internet</p>
                </div>
                <div class="benefit-card active">
                    <i class="fas fa-chart-bar"></i>
                    <h3>Detailed Reports</h3>
                    <p>Advanced analytics</p>
                </div>
            </div>

            <div class="premium-actions">
                <button class="btn-manage" onclick="premiumManager.manageSubscription()">
                    <i class="fas fa-cog"></i> Manage Subscription
                </button>
                <button class="btn-gift" onclick="premiumManager.giftPremium()">
                    <i class="fas fa-gift"></i> Gift Premium
                </button>
            </div>
        `;
    }

    // Setup event listeners for premium page
    setupPremiumPageEvents() {
        // Any additional event listeners
    }

    // Show country selector
    showCountrySelector() {
        const modal = document.getElementById('modal');
        const body = document.getElementById('modal-body');
        
        const countries = Object.entries(this.pricing)
            .filter(([code]) => code !== 'DEFAULT')
            .sort((a, b) => a[1].name.localeCompare(b[1].name));
        
        body.innerHTML = `
            <h2>Select Your Region</h2>
            <p>Choose your country to see local pricing</p>
            <div class="country-search">
                <input type="text" id="country-search-input" placeholder="Search country...">
            </div>
            <div class="country-list">
                ${countries.map(([code, data]) => `
                    <div class="country-option ${code === this.userCountry ? 'selected' : ''}" 
                         onclick="premiumManager.selectCountry('${code}')">
                        <img src="https://flagcdn.com/24x18/${code.toLowerCase()}.png" alt="${code}" onerror="this.style.display='none'">
                        <span class="country-name">${data.name}</span>
                        <span class="country-price">${data.symbol}${data.price}/mo</span>
                    </div>
                `).join('')}
            </div>
        `;
        
        modal.classList.add('active');
        
        // Search functionality
        document.getElementById('country-search-input')?.addEventListener('input', (e) => {
            const search = e.target.value.toLowerCase();
            document.querySelectorAll('.country-option').forEach(opt => {
                const name = opt.querySelector('.country-name').textContent.toLowerCase();
                opt.style.display = name.includes(search) ? 'flex' : 'none';
            });
        });
        
        modal.querySelector('.modal-close').onclick = () => modal.classList.remove('active');
    }

    // Select country
    selectCountry(countryCode) {
        this.userCountry = countryCode;
        this.currentPricing = this.pricing[countryCode] || this.pricing['DEFAULT'];
        document.getElementById('modal').classList.remove('active');
        this.showPremiumPage();
        this.app.showToast(`Region changed to ${this.currentPricing.name}`, 'success');
    }

    // Subscribe to premium
    subscribe(plan) {
        const pricing = this.currentPricing;
        const amount = plan === 'yearly' ? pricing.yearly : pricing.price;
        
        this.showPaymentModal(plan, amount, pricing);
    }

    // Show payment modal
    showPaymentModal(plan, amount, pricing) {
        const modal = document.getElementById('modal');
        const body = document.getElementById('modal-body');
        
        body.innerHTML = `
            <div class="payment-modal">
                <h2>Complete Your Purchase</h2>
                
                <div class="order-summary">
                    <h3>Order Summary</h3>
                    <div class="order-item">
                        <span>EnglishMaster Premium (${plan === 'yearly' ? 'Yearly' : 'Monthly'})</span>
                        <span>${pricing.symbol}${amount}</span>
                    </div>
                    <div class="order-total">
                        <span>Total</span>
                        <span>${pricing.symbol}${amount}</span>
                    </div>
                </div>

                <div class="payment-methods">
                    <h3>Payment Method</h3>
                    
                    ${this.userCountry === 'IN' ? `
                        <div class="payment-option" onclick="premiumManager.processPayment('upi', '${plan}')">
                            <i class="fas fa-mobile-alt"></i>
                            <span>UPI (GPay, PhonePe, Paytm)</span>
                        </div>
                    ` : ''}
                    
                    <div class="payment-option" onclick="premiumManager.processPayment('card', '${plan}')">
                        <i class="fas fa-credit-card"></i>
                        <span>Credit / Debit Card</span>
                    </div>
                    
                    <div class="payment-option" onclick="premiumManager.processPayment('paypal', '${plan}')">
                        <i class="fab fa-paypal"></i>
                        <span>PayPal</span>
                    </div>
                    
                    ${['IN', 'PK', 'BD'].includes(this.userCountry) ? `
                        <div class="payment-option" onclick="premiumManager.processPayment('netbanking', '${plan}')">
                            <i class="fas fa-university"></i>
                            <span>Net Banking</span>
                        </div>
                    ` : ''}
                </div>

                <div class="payment-security">
                    <i class="fas fa-lock"></i>
                    <span>Secured by 256-bit SSL encryption</span>
                </div>

                <p class="payment-terms">
                    By subscribing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                </p>
            </div>
        `;
        
        modal.classList.add('active');
        modal.querySelector('.modal-close').onclick = () => modal.classList.remove('active');
    }

    // Process payment (Demo - integrate with real payment gateway)
    processPayment(method, plan) {
        const modal = document.getElementById('modal');
        const body = document.getElementById('modal-body');
        
        // Show processing
        body.innerHTML = `
            <div class="payment-processing">
                <div class="spinner"></div>
                <h2>Processing Payment...</h2>
                <p>Please wait while we process your payment</p>
            </div>
        `;
        
        // Simulate payment processing
        setTimeout(() => {
            // In production, integrate with:
            // - Razorpay (India)
            // - Stripe (International)
            // - PayPal
            // - Google Pay / Apple Pay
            
            this.activatePremium(plan);
            
            body.innerHTML = `
                <div class="payment-success">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h2>Payment Successful! 🎉</h2>
                    <p>Welcome to EnglishMaster Premium!</p>
                    <p>Your ${plan} subscription is now active.</p>
                    <button class="btn-start-premium" onclick="document.getElementById('modal').classList.remove('active'); premiumManager.showPremiumPage();">
                        Start Learning
                    </button>
                </div>
            `;
            
            this.app.showToast('🎉 Premium activated successfully!', 'success');
        }, 2000);
    }

    // Activate premium (after successful payment)
    activatePremium(plan) {
        const duration = plan === 'yearly' ? 365 : 30;
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + duration);
        
        this.app.userProgress.premium = {
            isPremium: true,
            plan: plan,
            purchasedAt: new Date().toISOString(),
            expiresAt: expiryDate.toISOString(),
            country: this.userCountry,
            price: plan === 'yearly' ? this.currentPricing.yearly : this.currentPricing.price,
            currency: this.currentPricing.currency
        };
        
        this.app.saveProgress();
        this.updatePremiumBadges();
        
        // Update navigation
        const premiumNav = document.querySelector('[data-section="premium"] span');
        if (premiumNav) premiumNav.textContent = 'My Premium';
    }

    // Start free trial
    startFreeTrial() {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);
        
        this.app.userProgress.premium = {
            isPremium: true,
            plan: 'trial',
            purchasedAt: new Date().toISOString(),
            expiresAt: expiryDate.toISOString(),
            country: this.userCountry,
            price: 0,
            currency: this.currentPricing.currency
        };
        
        this.app.saveProgress();
        this.app.showToast('🎉 7-day free trial started!', 'success');
        this.showPremiumPage();
    }

    // Manage subscription
    manageSubscription() {
        this.app.showToast('Subscription management coming soon!', 'info');
    }

    // Gift premium
    giftPremium() {
        this.app.showToast('Gift feature coming soon!', 'info');
    }

    // Restore purchase
    restorePurchase() {
        this.app.showToast('Checking for previous purchases...', 'info');
        // Integrate with payment provider to restore
    }
}

// Initialize premium manager
let premiumManager;
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.app) {
            premiumManager = new PremiumManager(window.app);
            window.premiumManager = premiumManager;
        }
    }, 500);
});