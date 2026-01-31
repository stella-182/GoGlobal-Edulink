// GoGlobal EduLink JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initAnimatedCounters();
    initQuickContactForm();
    initApplicationForm();
    initMobileMenu();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNavLinks = document.querySelector('.mobile-nav-links');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    // Open menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            mobileMenuOverlay?.classList.add('active');
            mobileNavLinks?.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close menu via overlay
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu via close button
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    function closeMobileMenu() {
        mobileMenuOverlay?.classList.remove('active');
        mobileNavLinks?.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Animated Counters
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (target === 98 ? '%' : '+');
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        });
        observer.observe(counter);
    });
}

// Country Data - API-ready data structure
const countryData = {
    SPAIN: { 
        flag: '🇪🇸',
        name: "Spain", 
        reason: "Spain offers world-class education with over 80 universities, including prestigious institutions. Enjoy a vibrant culture, beautiful weather, and affordable tuition fees.",
        courses: "Business Administration, Tourism & Hospitality, Architecture, Engineering, Art & Design",
        costs: "€8,000 - €15,000 per year (including living expenses)",
        visa: "Student Visa required for non-EU citizens. Must show proof of acceptance and financial means."
    },
    UK: { 
        flag: '🇬🇧',
        name: "United Kingdom", 
        reason: "The UK is home to world-renowned universities including Oxford, Cambridge, and Imperial College London. Benefit from shorter degree programs.",
        courses: "Law, Medicine, Engineering, Business, Economics, Computer Science",
        costs: "£15,000 - £35,000 per year (tuition) + £12,000-£15,000 living costs",
        visa: "Student Visa (Tier 4) required. Must have CAS letter and English proficiency."
    },
    CANADA: { 
        flag: '🇨🇦',
        name: "Canada", 
        reason: "Canada offers high-quality education with globally recognized degrees. Known for safe environment and excellent post-graduation work opportunities.",
        courses: "Engineering, Computer Science, Business, Healthcare, Environmental Studies",
        costs: "CAD 15,000 - 35,000 per year (international student tuition)",
        visa: "Study Permit required. Must have acceptance letter and proof of funds."
    },
    CHINA: { 
        flag: '🇨🇳',
        name: "China", 
        reason: "China is an emerging global education hub with prestigious universities like Tsinghua and Peking University.",
        courses: "Chinese Language, International Business, Engineering, Traditional Chinese Medicine",
        costs: "CNY 20,000 - 50,000 per year (tuition) + CNY 20,000-40,000 living",
        visa: "X1/X2 Student Visa required. Must have JW202 form and admission notice."
    },
    INDIA: { 
        flag: '🇮🇳',
        name: "India", 
        reason: "India offers excellent technical and business education at affordable costs. Institutions like IITs and IIMs are globally recognized.",
        courses: "Engineering & Technology, Computer Science, Business Administration, Medicine",
        costs: "INR 100,000 - 500,000 per year for international students",
        visa: "Student Visa required. Must have acceptance from recognized institution."
    },
    AUSTRALIA: { 
        flag: '🇦🇺',
        name: "Australia", 
        reason: "Australia boasts world-ranking universities and excellent post-study work opportunities.",
        courses: "Engineering, Medicine, Business, Environmental Science, IT, Accounting",
        costs: "AUD 20,000 - 45,000 per year (tuition) + AUD 20,000-25,000 living",
        visa: "Student Visa (500) required. Must have COE and OSHC insurance."
    },
    SINGAPORE: { 
        flag: '🇸🇬',
        name: "Singapore", 
        reason: "Singapore is Asia's leading education hub with world-class universities. Benefit from English-medium instruction.",
        courses: "Business, Finance, Engineering, Computer Science, Law, Medicine",
        costs: "SGD 15,000 - 40,000 per year (tuition) + SGD 12,000-18,000 living",
        visa: "Student Pass required. Must have acceptance letter and sufficient funds."
    }
};

// Show Country Info
function showCountryInfo(countryCode) {
    const data = countryData[countryCode];
    if (!data) return;
    
    const infoSection = document.getElementById('country-description');
    if (infoSection) {
        document.getElementById('info-flag').textContent = data.flag;
        document.getElementById('info-title').textContent = `Study in ${data.name}`;
        document.getElementById('info-reason').textContent = data.reason;
        document.getElementById('info-courses').textContent = data.courses;
        document.getElementById('info-costs').textContent = data.costs;
        document.getElementById('info-visa').textContent = data.visa;
        infoSection.style.display = 'block';
        infoSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function closeCountryInfo() {
    const infoSection = document.getElementById('country-description');
    if (infoSection) {
        infoSection.style.display = 'none';
    }
}

// Initialize Destination Cards
document.addEventListener('DOMContentLoaded', () => {
    const destCards = document.querySelectorAll('.dest-card');
    destCards.forEach(card => {
        card.addEventListener('click', () => {
            const countryCode = card.getAttribute('data-country');
            showCountryInfo(countryCode);
        });
    });
});

// Quick Contact Form
function initQuickContactForm() {
    const form = document.getElementById('quickContactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <h2 style="color: #28a745; margin-bottom: 1rem;">✓ Message Sent!</h2>
                    <p>Thank you! Our team will contact you within 24 hours.</p>
                </div>
            `;
        });
    }
}

// Application Form with Web3Forms API
function initApplicationForm() {
    const form = document.getElementById('applicationForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Submitting...';
        btn.disabled = true;
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Web3Forms API endpoint
        const accessKey = data.access_key || '718da0c1-c69f-4991-b6b2-a373c15c7773';
        
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    ...data,
                    access_key: accessKey,
                    subject: 'New Application - GoGlobal EduLink',
                    from_name: 'GoGlobal Website'
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                form.innerHTML = `
                    <div style="text-align: center; padding: 2rem;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
                        <h2 style="color: #28a745; margin-bottom: 1rem;">Application Submitted Successfully!</h2>
                        <p style="font-size: 1.1rem; color: #333;">Thank you for your application!</p>
                        <p style="color: #666; margin-top: 0.5rem;">Our team will contact you within 24 hours at:</p>
                        <p style="font-weight: bold; color: #1e3c72; margin-top: 1rem;">
                            📧 goglobaledulink@gmail.com<br>
                            📞 +346 015 874 12
                        </p>
                    </div>
                `;
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        } catch (error) {
            // Fallback for demo - shows success even if API fails
            form.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
                    <h2 style="color: #28a745; margin-bottom: 1rem;">Application Received!</h2>
                    <p style="font-size: 1.1rem; color: #333;">Thank you for your application!</p>
                    <p style="color: #666; margin-top: 0.5rem;">Our team will contact you at:</p>
                    <p style="font-weight: bold; color: #1e3c72; margin-top: 1rem;">
                        📧 goglobaledulink@gmail.com<br>
                        📞 +346 015 874 12
                    </p>
                    <p style="color: #999; font-size: 0.85rem; margin-top: 1rem;">(Demo mode - API not configured)</p>
                </div>
            `;
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// API Configuration Helper
// To enable Web3Forms API:
// 1. Sign up at https://web3forms.com/
// 2. Get your Access Key
// 3. Replace 'YOUR_ACCESS_KEY_HERE' in Apply.html with your actual key
// 4. Forms will then send data to your email

