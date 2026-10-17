/* ============================================
   HOTEL DIK — SMART HOTEL MANAGEMENT SYSTEM
   Complete Application Logic v2.0
   Professional Features: Real Images, Auto Billing,
   Cart System, Admin & User Dashboards
   ============================================ */

// ===== DATA STORE (LocalStorage-backed) =====
const DB = {
    get(key, fallback = null) {
        try {
            const data = localStorage.getItem(`hoteldik_${key}`);
            return data ? JSON.parse(data) : fallback;
        } catch { return fallback; }
    },
    set(key, value) {
        localStorage.setItem(`hoteldik_${key}`, JSON.stringify(value));
    },
    remove(key) {
        localStorage.removeItem(`hoteldik_${key}`);
    }
};

// ===== REAL FOOD IMAGE URLs (Unsplash high-quality) =====
const FOOD_IMAGES = {
    'Butter Chicken': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop',
    'Paneer Tikka': 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop',
    'Gulab Jamun': 'https://images.unsplash.com/photo-1666190094665-e8a446835651?w=400&h=300&fit=crop',
    'Masala Chai': 'https://images.unsplash.com/photo-1561336526-2914f13ceb36?w=400&h=300&fit=crop',
    'Biryani Hyderabadi': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
    'Samosa': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
    'Mango Lassi': 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&h=300&fit=crop',
    'Dal Makhani': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    'Chicken Tikka': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop',
    'Rasmalai': 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400&h=300&fit=crop',
    'Naan Bread': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
    'Cold Coffee': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
    'Fish Curry': 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop',
    'Kheer': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop',
    'Tandoori Roti': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
    'Fresh Lime Soda': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed514?w=400&h=300&fit=crop',
    'Palak Paneer': 'https://images.unsplash.com/photo-1618449840665-9ed506d73a34?w=400&h=300&fit=crop',
    'Tandoori Chicken': 'https://images.unsplash.com/photo-1610057099443-fde6c99db9e1?w=400&h=300&fit=crop',
    'Chocolate Brownie': 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&h=300&fit=crop',
    'Masala Dosa': 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop',
    'Chole Bhature': 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400&h=300&fit=crop',
    'Ice Cream Sundae': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
    'Veg Spring Roll': 'https://images.unsplash.com/photo-1606525437817-0fd5753b5c49?w=400&h=300&fit=crop',
    'Mojito': 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop',
};

const DEFAULT_FOOD_IMG = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop';

// ===== DEFAULT MENU ITEMS WITH REAL IMAGES =====
const DEFAULT_ITEMS = [
    { id: 1, name: "Butter Chicken", category: "main-course", price: 380, image: FOOD_IMAGES['Butter Chicken'], description: "Creamy tomato-based curry with tender chicken pieces, infused with aromatic spices.", type: "non-veg", status: "available", rating: 4.8, ratingCount: 124 },
    { id: 2, name: "Paneer Tikka", category: "starters", price: 280, image: FOOD_IMAGES['Paneer Tikka'], description: "Marinated cottage cheese cubes grilled to perfection with bell peppers and onions.", type: "veg", status: "available", rating: 4.6, ratingCount: 98 },
    { id: 3, name: "Gulab Jamun", category: "desserts", price: 150, image: FOOD_IMAGES['Gulab Jamun'], description: "Soft milk-solid balls soaked in rose-flavored sugar syrup — a classic Indian dessert.", type: "veg", status: "available", rating: 4.9, ratingCount: 156 },
    { id: 4, name: "Masala Chai", category: "beverages", price: 60, image: FOOD_IMAGES['Masala Chai'], description: "Traditional Indian spiced tea brewed with cardamom, ginger, and aromatic spices.", type: "veg", status: "available", rating: 4.7, ratingCount: 210 },
    { id: 5, name: "Biryani Hyderabadi", category: "main-course", price: 420, image: FOOD_IMAGES['Biryani Hyderabadi'], description: "Fragrant basmati rice layered with spiced meat, saffron, and caramelized onions.", type: "non-veg", status: "available", rating: 4.9, ratingCount: 189 },
    { id: 6, name: "Samosa", category: "starters", price: 80, image: FOOD_IMAGES['Samosa'], description: "Crispy golden triangles filled with spiced potatoes and peas, served with chutney.", type: "veg", status: "available", rating: 4.5, ratingCount: 145 },
    { id: 7, name: "Mango Lassi", category: "beverages", price: 120, image: FOOD_IMAGES['Mango Lassi'], description: "Chilled yogurt-based drink blended with sweet Alphonso mangoes and a hint of cardamom.", type: "veg", status: "available", rating: 4.6, ratingCount: 112 },
    { id: 8, name: "Dal Makhani", category: "main-course", price: 300, image: FOOD_IMAGES['Dal Makhani'], description: "Slow-cooked black lentils in a rich, buttery tomato and cream sauce.", type: "veg", status: "available", rating: 4.7, ratingCount: 134 },
    { id: 9, name: "Chicken Tikka", category: "starters", price: 320, image: FOOD_IMAGES['Chicken Tikka'], description: "Juicy chicken pieces marinated in yogurt and spices, roasted in a tandoor.", type: "non-veg", status: "available", rating: 4.8, ratingCount: 167 },
    { id: 10, name: "Rasmalai", category: "desserts", price: 180, image: FOOD_IMAGES['Rasmalai'], description: "Delicate milk dumplings soaked in sweetened, thickened milk flavored with cardamom.", type: "veg", status: "available", rating: 4.8, ratingCount: 132 },
    { id: 11, name: "Naan Bread", category: "main-course", price: 60, image: FOOD_IMAGES['Naan Bread'], description: "Soft, fluffy leavened flatbread baked in a traditional clay tandoor oven.", type: "veg", status: "available", rating: 4.4, ratingCount: 200 },
    { id: 12, name: "Cold Coffee", category: "beverages", price: 150, image: FOOD_IMAGES['Cold Coffee'], description: "Rich and creamy iced coffee blended with premium espresso and chilled milk.", type: "veg", status: "available", rating: 4.5, ratingCount: 88 },
    { id: 13, name: "Fish Curry", category: "main-course", price: 450, image: FOOD_IMAGES['Fish Curry'], description: "Fresh fish cooked in a tangy coconut-based curry with traditional coastal spices.", type: "non-veg", status: "available", rating: 4.6, ratingCount: 76 },
    { id: 14, name: "Kheer", category: "desserts", price: 130, image: FOOD_IMAGES['Kheer'], description: "Traditional rice pudding slow-cooked with milk, sugar, and dry fruits.", type: "veg", status: "available", rating: 4.5, ratingCount: 95 },
    { id: 15, name: "Tandoori Roti", category: "main-course", price: 40, image: FOOD_IMAGES['Tandoori Roti'], description: "Whole wheat flatbread cooked in tandoor, slightly charred and delicious.", type: "veg", status: "available", rating: 4.3, ratingCount: 180 },
    { id: 16, name: "Fresh Lime Soda", category: "beverages", price: 70, image: FOOD_IMAGES['Fresh Lime Soda'], description: "Refreshing lime juice with soda water — choose sweet, salt, or mixed.", type: "veg", status: "available", rating: 4.4, ratingCount: 160 },
    { id: 17, name: "Palak Paneer", category: "main-course", price: 320, image: FOOD_IMAGES['Palak Paneer'], description: "Creamy spinach gravy with soft paneer cubes, seasoned with aromatic spices.", type: "veg", status: "available", rating: 4.7, ratingCount: 110 },
    { id: 18, name: "Tandoori Chicken", category: "starters", price: 380, image: FOOD_IMAGES['Tandoori Chicken'], description: "Whole chicken marinated in yogurt & tandoori masala, roasted to smoky perfection.", type: "non-veg", status: "available", rating: 4.8, ratingCount: 190 },
    { id: 19, name: "Chocolate Brownie", category: "desserts", price: 200, image: FOOD_IMAGES['Chocolate Brownie'], description: "Dense, fudgy chocolate brownie topped with vanilla ice cream and hot fudge.", type: "veg", status: "available", rating: 4.9, ratingCount: 145 },
    { id: 20, name: "Masala Dosa", category: "starters", price: 160, image: FOOD_IMAGES['Masala Dosa'], description: "Crispy rice-lentil crepe filled with spiced potato masala, served with chutney & sambar.", type: "veg", status: "available", rating: 4.6, ratingCount: 178 },
    { id: 21, name: "Chole Bhature", category: "main-course", price: 220, image: FOOD_IMAGES['Chole Bhature'], description: "Spicy chickpea curry served with deep-fried fluffy bread — a classic Punjabi dish.", type: "veg", status: "available", rating: 4.5, ratingCount: 134 },
    { id: 22, name: "Ice Cream Sundae", category: "desserts", price: 250, image: FOOD_IMAGES['Ice Cream Sundae'], description: "Layered ice cream sundae with chocolate sauce, whipped cream, nuts and cherry on top.", type: "veg", status: "available", rating: 4.7, ratingCount: 120 },
    { id: 23, name: "Veg Spring Roll", category: "starters", price: 180, image: FOOD_IMAGES['Veg Spring Roll'], description: "Crispy fried rolls stuffed with mixed vegetables and served with sweet chili sauce.", type: "veg", status: "available", rating: 4.4, ratingCount: 86 },
    { id: 24, name: "Mojito", category: "beverages", price: 180, image: FOOD_IMAGES['Mojito'], description: "Refreshing virgin mojito with fresh mint, lime, sugar, and sparkling soda water.", type: "veg", status: "available", rating: 4.6, ratingCount: 142 },
];

// ===== COUPON CODES =====
const COUPONS = {
    'HOTEL10': { discount: 10, type: 'percent', description: '10% off your order' },
    'WELCOME': { discount: 50, type: 'flat', description: '₹50 off your first order' },
    'FLAT100': { discount: 100, type: 'flat', description: '₹100 off orders above ₹500' },
    'PREMIUM20': { discount: 20, type: 'percent', description: '20% off (max ₹200)' },
};

// ===== APP STATE =====
let state = {
    currentUser: DB.get('currentUser'),
    users: DB.get('users', []),
    menuItems: DB.get('menuItems'),
    cart: DB.get('cart', []),
    orders: DB.get('orders', []),
    invoices: DB.get('invoices', []),
    favorites: DB.get('favorites', []),
    appliedCoupon: null,
    currentPage: 'home',
    currentRatingItem: null,
    selectedRating: 0,
    editingItemId: null,
    orderIdCounter: DB.get('orderIdCounter', 1000),
    invoiceIdCounter: DB.get('invoiceIdCounter', 5000)
};

// Initialize menu items if empty or if they're using old emoji format
if (!state.menuItems || state.menuItems.length === 0 || (state.menuItems[0] && !state.menuItems[0].image.startsWith('http'))) {
    state.menuItems = [...DEFAULT_ITEMS];
    DB.set('menuItems', state.menuItems);
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initNavbar();
    initParticles();
    initCounters();
    initPasswordStrength();
    checkAuth();
    renderPopularItems();
    renderMenuGrid();
    renderAutoSuggestions();
    updateCartUI();
    updateDashboard();
});

// ===== PRELOADER =====
function initPreloader() {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 2200);
}

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('show');
    });

    // Nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            navigateTo(page);
            navToggle.classList.remove('active');
            navMenu.classList.remove('show');
        });
    });

    // User menu toggle
    const userMenuBtn = document.getElementById('userMenuBtn');
    if (userMenuBtn) {
        userMenuBtn.addEventListener('click', () => {
            document.getElementById('userDropdown').classList.toggle('show');
        });
    }

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.user-menu')) {
            const dd = document.getElementById('userDropdown');
            if (dd) dd.classList.remove('show');
        }
    });

    // Logo click
    document.getElementById('navLogo').addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('home');
    });
}

// ===== HERO PARTICLES =====
function initParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'hero-particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 8 + 's';
        p.style.animationDuration = (6 + Math.random() * 6) + 's';
        p.style.width = (2 + Math.random() * 4) + 'px';
        p.style.height = p.style.width;
        container.appendChild(p);
    }
}

// ===== ANIMATED COUNTERS =====
function initCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        });
    });
    const statsEl = document.querySelector('.hero-stats');
    if (statsEl) observer.observe(statsEl);
}

function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseFloat(el.dataset.count);
        const isDecimal = el.dataset.decimal === 'true';
        const duration = 2000;
        const start = performance.now();

        function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    });
}

// ===== PASSWORD STRENGTH =====
function initPasswordStrength() {
    const passInput = document.getElementById('signupPassword');
    if (!passInput) return;
    passInput.addEventListener('input', () => {
        const val = passInput.value;
        let score = 0;
        if (val.length >= 6) score++;
        if (val.length >= 10) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        const fill = document.getElementById('strengthFill');
        const text = document.getElementById('strengthText');
        const levels = [
            { w: '0%', c: 'transparent', t: 'Password strength' },
            { w: '20%', c: '#ef4444', t: 'Very Weak' },
            { w: '40%', c: '#f59e0b', t: 'Weak' },
            { w: '60%', c: '#f59e0b', t: 'Fair' },
            { w: '80%', c: '#22c55e', t: 'Strong' },
            { w: '100%', c: '#22c55e', t: 'Very Strong' },
        ];
        fill.style.width = levels[score].w;
        fill.style.background = levels[score].c;
        text.textContent = levels[score].t;
        text.style.color = levels[score].c;
    });
}

// ===== NAVIGATION =====
function navigateTo(page) {
    if ((page === 'dashboard') && (!state.currentUser || state.currentUser.role !== 'admin')) {
        showToast('warning', 'Access Denied', 'Only admins can access the admin dashboard.');
        if (!state.currentUser) showModal('loginModal');
        return;
    }
    if ((page === 'user-dashboard' || page === 'profile') && !state.currentUser) {
        showToast('warning', 'Login Required', 'Please login to access this page.');
        showModal('loginModal');
        return;
    }

    state.currentPage = page;

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-link[data-page="${page}"]`);
    if (activeLink) activeLink.classList.add('active');

    // Switch pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
        p.style.opacity = '0';
    });
    const targetPage = document.getElementById(`page-${page}`);
    if (targetPage) {
        targetPage.classList.add('active');
        // Trigger animation
        requestAnimationFrame(() => {
            targetPage.style.opacity = '1';
        });
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Page-specific init
    if (page === 'menu') {
        renderMenuGrid();
        renderAutoSuggestions();
    }
    if (page === 'dashboard') {
        updateDashboard();
    }
    if (page === 'user-dashboard') {
        updateUserDashboard();
    }
    if (page === 'profile') {
        loadProfile();
    }
}

// ===== AUTH SYSTEM =====
function checkAuth() {
    if (state.currentUser) {
        showAuthUI(true);
    } else {
        showAuthUI(false);
    }
}

function showAuthUI(loggedIn) {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const userMenu = document.getElementById('userMenu');
    const adminLinks = document.querySelectorAll('.admin-only');
    const userLinks = document.querySelectorAll('.user-only');

    if (loggedIn && state.currentUser) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (signupBtn) signupBtn.style.display = 'none';
        if (userMenu) {
            userMenu.style.display = 'block';
            document.getElementById('userNameDisplay').textContent = state.currentUser.name.split(' ')[0];
            document.getElementById('userAvatar').textContent = state.currentUser.name.charAt(0).toUpperCase();
        }
        // Show admin link only for admins
        adminLinks.forEach(l => {
            l.style.display = state.currentUser.role === 'admin' ? '' : 'none';
        });
        // Show user dashboard for all users
        userLinks.forEach(l => l.style.display = '');
    } else {
        if (loginBtn) loginBtn.style.display = '';
        if (signupBtn) signupBtn.style.display = '';
        if (userMenu) userMenu.style.display = 'none';
        adminLinks.forEach(l => l.style.display = 'none');
        userLinks.forEach(l => l.style.display = 'none');
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showToast('error', 'Error', 'Please fill in all fields.');
        return;
    }

    const user = state.users.find(u => u.email === email && u.password === password);
    if (user) {
        state.currentUser = user;
        DB.set('currentUser', user);
        showAuthUI(true);
        hideModal('loginModal');
        showToast('success', 'Welcome Back!', `Hello, ${user.name}!`);
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
    } else {
        showToast('error', 'Login Failed', 'Invalid email or password.');
    }
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const phone = document.getElementById('signupPhone').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const role = document.getElementById('signupRole').value;

    if (!name || !phone || !email || !password) {
        showToast('error', 'Error', 'Please fill in all fields.');
        return;
    }
    if (password.length < 6) {
        showToast('error', 'Error', 'Password must be at least 6 characters.');
        return;
    }

    // Check duplicate
    if (state.users.find(u => u.email === email)) {
        showToast('error', 'Error', 'An account with this email already exists.');
        return;
    }

    const newUser = {
        id: Date.now(),
        name,
        phone,
        email,
        password,
        role,
        createdAt: new Date().toISOString()
    };

    state.users.push(newUser);
    DB.set('users', state.users);

    state.currentUser = newUser;
    DB.set('currentUser', newUser);

    showAuthUI(true);
    hideModal('signupModal');
    showToast('success', 'Account Created!', `Welcome, ${name}! Your account is ready.`);

    // Clear form
    document.getElementById('signupName').value = '';
    document.getElementById('signupPhone').value = '';
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupPassword').value = '';
}

function logout() {
    state.currentUser = null;
    DB.remove('currentUser');
    showAuthUI(false);
    navigateTo('home');
    showToast('info', 'Logged Out', 'You have been signed out successfully.');
    document.getElementById('userDropdown').classList.remove('show');
}

function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// ===== PROFILE =====
function loadProfile() {
    if (!state.currentUser) return;
    const u = state.currentUser;
    document.getElementById('profileName').textContent = u.name;
    document.getElementById('profileEmail').textContent = u.email;
    document.getElementById('profileRole').textContent = u.role.charAt(0).toUpperCase() + u.role.slice(1);
    document.getElementById('profileAvatar').textContent = u.name.charAt(0).toUpperCase();
    document.getElementById('profileNameInput').value = u.name;
    document.getElementById('profileEmailInput').value = u.email;
    document.getElementById('profilePhone').value = u.phone || '';
    document.getElementById('profileRoleInput').value = u.role.charAt(0).toUpperCase() + u.role.slice(1);
}

function updateProfile(e) {
    e.preventDefault();
    if (!state.currentUser) return;

    state.currentUser.name = document.getElementById('profileNameInput').value.trim();
    state.currentUser.email = document.getElementById('profileEmailInput').value.trim();
    state.currentUser.phone = document.getElementById('profilePhone').value.trim();

    // Update in users array
    const idx = state.users.findIndex(u => u.id === state.currentUser.id);
    if (idx !== -1) state.users[idx] = state.currentUser;

    DB.set('currentUser', state.currentUser);
    DB.set('users', state.users);
    showAuthUI(true);
    loadProfile();
    showToast('success', 'Profile Updated', 'Your profile has been saved.');
}

// ===== MODAL SYSTEM =====
function showModal(id) {
    document.getElementById(id).classList.add('show');
    document.body.style.overflow = 'hidden';
}

function hideModal(id) {
    document.getElementById(id).classList.remove('show');
    document.body.style.overflow = '';
    // Reset item form if closing addItemModal
    if (id === 'addItemModal') resetItemForm();
}

function switchModal(from, to) {
    hideModal(from);
    setTimeout(() => showModal(to), 200);
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay') && e.target.classList.contains('show')) {
        e.target.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// Close modal on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.show').forEach(m => {
            m.classList.remove('show');
        });
        document.body.style.overflow = '';
    }
});

// ===== MENU RENDERING =====
function getItemImage(item) {
    if (item.image && item.image.startsWith('http')) return item.image;
    return FOOD_IMAGES[item.name] || DEFAULT_FOOD_IMG;
}

function createMenuCard(item, showAddToCart = true) {
    const card = document.createElement('div');
    card.className = 'menu-card';
    card.dataset.id = item.id;

    const categoryLabel = item.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    const isVeg = item.type === 'veg';
    const isAvailable = item.status === 'available';
    const imgUrl = getItemImage(item);
    const isFav = state.favorites.includes(item.id);

    card.innerHTML = `
        <div class="menu-card-image" style="background-image: url('${imgUrl}');">
            <div class="menu-card-image-overlay"></div>
            <span class="menu-card-badge ${isVeg ? 'badge-veg' : 'badge-nonveg'}">
                ${isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
            </span>
            <span class="menu-card-rating" onclick="openRating(${item.id})" title="Click to rate">
                <i class="fas fa-star"></i> ${item.rating.toFixed(1)} <small>(${item.ratingCount})</small>
            </span>
            <button class="menu-card-fav ${isFav ? 'fav-active' : ''}" onclick="toggleFavorite(${item.id}, event)" title="Add to favorites">
                <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
            </button>
        </div>
        <div class="menu-card-body">
            <div class="menu-card-category">${categoryLabel}</div>
            <div class="menu-card-name">${item.name}</div>
            <div class="menu-card-desc">${item.description}</div>
            <div class="menu-card-footer">
                <span class="menu-card-price">₹${item.price}</span>
                ${showAddToCart && isAvailable ? `
                    <div class="menu-card-actions">
                        <button class="btn-add-cart" onclick="addToCart(${item.id})" id="addCartBtn-${item.id}">
                            <i class="fas fa-plus"></i> Add
                        </button>
                    </div>
                ` : ''}
            </div>
        </div>
        ${!isAvailable ? `<div class="menu-card-unavailable"><span>Currently Unavailable</span></div>` : ''}
    `;
    return card;
}

function renderMenuGrid() {
    const grid = document.getElementById('menuGrid');
    const empty = document.getElementById('menuEmpty');
    if (!grid) return;

    grid.innerHTML = '';
    let items = [...state.menuItems];

    // Apply search filter
    const search = document.getElementById('menuSearch')?.value.toLowerCase().trim();
    if (search) {
        items = items.filter(i =>
            i.name.toLowerCase().includes(search) ||
            i.category.toLowerCase().includes(search) ||
            i.description.toLowerCase().includes(search)
        );
    }

    // Apply category filter
    const activeCategory = document.querySelector('.cat-btn.active')?.dataset.category;
    if (activeCategory && activeCategory !== 'all') {
        items = items.filter(i => i.category === activeCategory);
    }

    // Apply sort
    const sort = document.getElementById('menuSort')?.value;
    if (sort === 'price-low') items.sort((a, b) => a.price - b.price);
    else if (sort === 'price-high') items.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') items.sort((a, b) => b.rating - a.rating);
    else if (sort === 'name') items.sort((a, b) => a.name.localeCompare(b.name));

    if (items.length === 0) {
        empty.style.display = '';
        grid.style.display = 'none';
    } else {
        empty.style.display = 'none';
        grid.style.display = '';
        items.forEach(item => {
            grid.appendChild(createMenuCard(item));
        });
    }
}

function filterMenu() {
    renderMenuGrid();
    handleAutoSuggest();
}

function filterByCategory(cat, btn) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenuGrid();
}

function sortMenu() {
    renderMenuGrid();
}

// ===== FAVORITES =====
function toggleFavorite(itemId, e) {
    if (e) e.stopPropagation();
    const idx = state.favorites.indexOf(itemId);
    if (idx > -1) {
        state.favorites.splice(idx, 1);
        showToast('info', 'Removed', 'Item removed from favorites.');
    } else {
        state.favorites.push(itemId);
        showToast('success', 'Added ❤️', 'Item added to favorites!');
    }
    DB.set('favorites', state.favorites);
    renderMenuGrid();
    renderPopularItems();
}

// ===== AUTO SUGGESTIONS =====
function handleAutoSuggest() {
    const input = document.getElementById('menuSearch');
    const dropdown = document.getElementById('autoSuggestDropdown');
    const query = input.value.toLowerCase().trim();

    if (query.length < 2) {
        dropdown.classList.remove('show');
        return;
    }

    const matches = state.menuItems.filter(i =>
        i.name.toLowerCase().includes(query) ||
        i.description.toLowerCase().includes(query)
    ).slice(0, 6);

    if (matches.length === 0) {
        dropdown.classList.remove('show');
        return;
    }

    dropdown.innerHTML = matches.map(item => `
        <div class="suggest-item" onclick="selectSuggestion('${item.name}')">
            <img src="${getItemImage(item)}" alt="${item.name}" class="suggest-item-img">
            <div class="suggest-item-info">
                <h4>${highlightMatch(item.name, query)}</h4>
                <span>₹${item.price} · ⭐ ${item.rating.toFixed(1)}</span>
            </div>
        </div>
    `).join('');
    dropdown.classList.add('show');
}

function highlightMatch(text, query) {
    const idx = text.toLowerCase().indexOf(query);
    if (idx === -1) return text;
    return text.slice(0, idx) +
        '<strong style="color:var(--gold);">' + text.slice(idx, idx + query.length) + '</strong>' +
        text.slice(idx + query.length);
}

function selectSuggestion(name) {
    document.getElementById('menuSearch').value = name;
    document.getElementById('autoSuggestDropdown').classList.remove('show');
    renderMenuGrid();
}

// Close auto-suggest on outside click
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box')) {
        const dd = document.getElementById('autoSuggestDropdown');
        if (dd) dd.classList.remove('show');
    }
});

function renderAutoSuggestions() {
    const container = document.getElementById('autoSuggestions');
    const chips = document.getElementById('suggestionChips');
    if (!container || !chips) return;

    // Get top rated items as suggestions
    const topItems = [...state.menuItems]
        .filter(i => i.status === 'available')
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8);

    if (topItems.length > 0) {
        container.style.display = '';
        chips.innerHTML = topItems.map(item => `
            <span class="suggestion-chip" onclick="selectSuggestion('${item.name}')">
                <img src="${getItemImage(item)}" alt="${item.name}" class="chip-img"> ${item.name} <small>⭐${item.rating.toFixed(1)}</small>
            </span>
        `).join('');
    }
}

// ===== POPULAR ITEMS (HOME) =====
function renderPopularItems() {
    const grid = document.getElementById('popularItems');
    if (!grid) return;

    const popular = [...state.menuItems]
        .filter(i => i.status === 'available')
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);

    grid.innerHTML = '';
    popular.forEach(item => {
        grid.appendChild(createMenuCard(item));
    });
}

// ===== CART SYSTEM =====
function addToCart(itemId) {
    const item = state.menuItems.find(i => i.id === itemId);
    if (!item) return;

    const existing = state.cart.find(c => c.id === itemId);
    if (existing) {
        existing.qty++;
    } else {
        state.cart.push({ id: item.id, name: item.name, price: item.price, image: getItemImage(item), qty: 1 });
    }

    DB.set('cart', state.cart);
    updateCartUI();

    // Button feedback
    const btn = document.getElementById(`addCartBtn-${itemId}`);
    if (btn) {
        btn.classList.add('added');
        btn.innerHTML = '<i class="fas fa-check"></i> Added';
        setTimeout(() => {
            btn.classList.remove('added');
            btn.innerHTML = '<i class="fas fa-plus"></i> Add';
        }, 1500);
    }

    showToast('success', 'Added to Cart', `${item.name} added to your order.`);
}

function removeFromCart(itemId) {
    state.cart = state.cart.filter(c => c.id !== itemId);
    DB.set('cart', state.cart);
    updateCartUI();
}

function updateCartQty(itemId, delta) {
    const item = state.cart.find(c => c.id === itemId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(itemId);
        return;
    }
    DB.set('cart', state.cart);
    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const cartBadge = document.getElementById('cartBadge');
    const cartFab = document.getElementById('cartFab');

    const totalQty = state.cart.reduce((sum, c) => sum + c.qty, 0);
    const subtotal = state.cart.reduce((sum, c) => sum + (c.price * c.qty), 0);
    const gst = Math.round(subtotal * 0.05);
    let discount = 0;

    if (state.appliedCoupon) {
        const coupon = COUPONS[state.appliedCoupon];
        if (coupon) {
            if (coupon.type === 'percent') {
                discount = Math.round(subtotal * coupon.discount / 100);
                if (state.appliedCoupon === 'PREMIUM20') discount = Math.min(discount, 200);
            } else {
                discount = coupon.discount;
            }
        }
    }

    const total = subtotal + gst - discount;

    // Badge
    cartBadge.textContent = totalQty;
    cartFab.style.display = totalQty > 0 ? 'flex' : 'none';

    // Cart items
    if (state.cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-state" id="cartEmpty">
                <i class="fas fa-shopping-bag"></i>
                <h3>Cart is empty</h3>
                <p>Add items from the menu</p>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = state.cart.map(c => `
            <div class="cart-item">
                <img src="${c.image}" alt="${c.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-name">${c.name}</div>
                    <div class="cart-item-price">₹${c.price * c.qty}</div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="updateCartQty(${c.id}, -1)">−</button>
                        <span class="cart-item-qty">${c.qty}</span>
                        <button class="qty-btn" onclick="updateCartQty(${c.id}, 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${c.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        cartFooter.style.display = '';
        document.getElementById('cartSubtotal').textContent = `₹${subtotal}`;
        document.getElementById('cartGST').textContent = `₹${gst}`;

        const discountRow = document.getElementById('cartDiscountRow');
        if (discount > 0) {
            discountRow.style.display = '';
            document.getElementById('cartDiscount').textContent = `-₹${discount}`;
        } else {
            discountRow.style.display = 'none';
        }

        document.getElementById('cartTotal').textContent = `₹${total}`;
    }
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('show');
    document.getElementById('cartOverlay').classList.toggle('show');
}

// ===== COUPON SYSTEM =====
function applyCoupon() {
    const input = document.getElementById('couponCode');
    const code = input.value.trim().toUpperCase();

    if (!code) {
        showToast('warning', 'Enter Code', 'Please enter a coupon code.');
        return;
    }

    if (COUPONS[code]) {
        state.appliedCoupon = code;
        updateCartUI();
        showToast('success', 'Coupon Applied! 🎉', COUPONS[code].description);
        input.value = '';
    } else {
        showToast('error', 'Invalid Code', 'This coupon code is not valid.');
    }
}

// ===== ORDER & BILLING SYSTEM =====
function placeOrder() {
    if (state.cart.length === 0) {
        showToast('warning', 'Empty Cart', 'Add items to your cart first.');
        return;
    }

    const tableNum = document.getElementById('cartTableNum').value || 1;
    state.orderIdCounter++;
    state.invoiceIdCounter++;

    const subtotal = state.cart.reduce((sum, c) => sum + (c.price * c.qty), 0);
    const gst = Math.round(subtotal * 0.05);
    let discount = 0;

    if (state.appliedCoupon && COUPONS[state.appliedCoupon]) {
        const coupon = COUPONS[state.appliedCoupon];
        if (coupon.type === 'percent') {
            discount = Math.round(subtotal * coupon.discount / 100);
            if (state.appliedCoupon === 'PREMIUM20') discount = Math.min(discount, 200);
        } else {
            discount = coupon.discount;
        }
    }

    const total = subtotal + gst - discount;

    const order = {
        id: `ORD-${state.orderIdCounter}`,
        items: [...state.cart],
        table: parseInt(tableNum),
        subtotal,
        gst,
        discount,
        coupon: state.appliedCoupon || null,
        total,
        status: 'pending',
        timestamp: new Date().toISOString(),
        customerName: state.currentUser ? state.currentUser.name : 'Guest',
        customerId: state.currentUser ? state.currentUser.id : null,
        paymentStatus: 'unpaid'
    };

    // Generate invoice
    const invoice = {
        id: `INV-${state.invoiceIdCounter}`,
        orderId: order.id,
        items: [...state.cart],
        table: parseInt(tableNum),
        subtotal,
        gst,
        discount,
        coupon: state.appliedCoupon || null,
        total,
        customerName: order.customerName,
        customerId: order.customerId,
        timestamp: new Date().toISOString(),
        paymentStatus: 'unpaid'
    };

    state.orders.unshift(order);
    state.invoices.unshift(invoice);
    state.cart = [];
    state.appliedCoupon = null;

    DB.set('orders', state.orders);
    DB.set('invoices', state.invoices);
    DB.set('cart', state.cart);
    DB.set('orderIdCounter', state.orderIdCounter);
    DB.set('invoiceIdCounter', state.invoiceIdCounter);

    updateCartUI();
    toggleCart();
    renderOrders();
    updateDashboard();

    showToast('success', 'Order Placed! 🎉', `Order ${order.id} for Table ${tableNum} — Total: ₹${total}`);

    // Show invoice automatically
    setTimeout(() => {
        showInvoice(invoice.id);
    }, 500);
}

function renderOrders() {
    const ordersGrid = document.getElementById('ordersGrid');
    if (!ordersGrid) return;

    const activeOrders = state.orders.filter(o => o.status !== 'completed');

    if (activeOrders.length === 0) {
        ordersGrid.innerHTML = `
            <div class="empty-state" id="ordersEmpty">
                <i class="fas fa-clipboard"></i>
                <h3>No active orders</h3>
                <p>Orders placed via QR code will appear here</p>
            </div>
        `;
        return;
    }

    ordersGrid.innerHTML = activeOrders.map(order => createOrderCard(order)).join('');
}

function createOrderCard(order) {
    const statusClass = `status-${order.status}`;
    const statusLabel = order.status.charAt(0).toUpperCase() + order.status.slice(1);
    const time = new Date(order.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    const date = new Date(order.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    const payBadge = order.paymentStatus === 'paid'
        ? '<span class="pay-badge pay-paid"><i class="fas fa-check-circle"></i> Paid</span>'
        : '<span class="pay-badge pay-unpaid"><i class="fas fa-clock"></i> Unpaid</span>';

    return `
        <div class="order-card">
            <div class="order-card-header">
                <span class="order-id">${order.id}</span>
                <span class="order-status ${statusClass}">${statusLabel}</span>
            </div>
            <div class="order-table-info">
                <i class="fas fa-chair"></i> Table ${order.table} · ${date} ${time} · ${order.customerName}
                ${payBadge}
            </div>
            <div class="order-items-list">
                ${order.items.map(i => `
                    <div class="order-item-row">
                        <span><img src="${i.image}" alt="${i.name}" class="order-item-thumb"> ${i.name} × ${i.qty}</span>
                        <span>₹${i.price * i.qty}</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-billing-summary">
                <div class="bill-row"><span>Subtotal</span><span>₹${order.subtotal || order.total}</span></div>
                ${order.gst ? `<div class="bill-row"><span>GST (5%)</span><span>₹${order.gst}</span></div>` : ''}
                ${order.discount > 0 ? `<div class="bill-row discount-row"><span>Discount ${order.coupon ? `(${order.coupon})` : ''}</span><span>-₹${order.discount}</span></div>` : ''}
            </div>
            <div class="order-total">
                <span>Total</span>
                <span>₹${order.total}</span>
            </div>
            <div class="order-card-footer">
                ${order.status === 'pending' ? `
                    <button class="btn-edit btn-sm" onclick="updateOrderStatus('${order.id}', 'preparing')">
                        <i class="fas fa-fire"></i> Start Preparing
                    </button>
                ` : ''}
                ${order.status === 'preparing' ? `
                    <button class="btn-gold btn-sm" onclick="updateOrderStatus('${order.id}', 'completed')">
                        <i class="fas fa-check"></i> Mark Complete
                    </button>
                ` : ''}
                ${order.status === 'completed' ? `
                    <span style="color:var(--success);font-size:0.85rem;"><i class="fas fa-check-circle"></i> Completed</span>
                ` : ''}
                ${order.paymentStatus !== 'paid' ? `
                    <button class="btn-outline btn-sm" onclick="markAsPaid('${order.id}')">
                        <i class="fas fa-money-bill-wave"></i> Mark Paid
                    </button>
                ` : ''}
                <button class="btn-outline btn-sm" onclick="viewOrderInvoice('${order.id}')">
                    <i class="fas fa-file-invoice"></i> Invoice
                </button>
            </div>
        </div>
    `;
}

function updateOrderStatus(orderId, newStatus) {
    const order = state.orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        DB.set('orders', state.orders);
        renderOrders();
        renderDashOrders();
        updateDashboard();
        showToast('info', 'Order Updated', `${orderId} is now ${newStatus}.`);
    }
}

function markAsPaid(orderId) {
    const order = state.orders.find(o => o.id === orderId);
    if (order) {
        order.paymentStatus = 'paid';
        // Update invoice too
        const inv = state.invoices.find(i => i.orderId === orderId);
        if (inv) {
            inv.paymentStatus = 'paid';
            DB.set('invoices', state.invoices);
        }
        DB.set('orders', state.orders);
        renderOrders();
        renderDashOrders();
        showToast('success', 'Payment Recorded 💰', `${orderId} marked as paid.`);
    }
}

function viewOrderInvoice(orderId) {
    const inv = state.invoices.find(i => i.orderId === orderId);
    if (inv) {
        showInvoice(inv.id);
    } else {
        showToast('info', 'No Invoice', 'Invoice not found for this order.');
    }
}

// ===== INVOICE SYSTEM =====
function showInvoice(invoiceId) {
    const inv = state.invoices.find(i => i.id === invoiceId);
    if (!inv) return;

    const date = new Date(inv.timestamp);
    const dateStr = date.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
    const timeStr = date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    const content = document.getElementById('invoiceContent');
    content.innerHTML = `
        <div class="invoice-paper" id="invoicePaper">
            <div class="invoice-header-section">
                <div class="invoice-brand">
                    <i class="fas fa-crown"></i>
                    <h2>Hotel Dik</h2>
                    <p>Premium Smart Hotel</p>
                </div>
                <div class="invoice-meta">
                    <h3>TAX INVOICE</h3>
                    <p><strong>${inv.id}</strong></p>
                    <p>${dateStr}</p>
                    <p>${timeStr}</p>
                </div>
            </div>
            <div class="invoice-details">
                <div class="inv-detail">
                    <p><strong>Bill To:</strong></p>
                    <p>${inv.customerName}</p>
                    <p>Table #${inv.table}</p>
                </div>
                <div class="inv-detail">
                    <p><strong>Order ID:</strong> ${inv.orderId}</p>
                    <p><strong>Payment:</strong> <span class="inv-pay-status ${inv.paymentStatus}">${inv.paymentStatus === 'paid' ? '✅ Paid' : '⏳ Pending'}</span></p>
                </div>
            </div>
            <table class="invoice-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${inv.items.map((item, idx) => `
                        <tr>
                            <td>${idx + 1}</td>
                            <td>${item.name}</td>
                            <td>${item.qty}</td>
                            <td>₹${item.price}</td>
                            <td>₹${item.price * item.qty}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="invoice-totals">
                <div class="inv-total-row"><span>Subtotal</span><span>₹${inv.subtotal}</span></div>
                <div class="inv-total-row"><span>GST (5%)</span><span>₹${inv.gst}</span></div>
                ${inv.discount > 0 ? `<div class="inv-total-row inv-discount"><span>Discount ${inv.coupon ? `(${inv.coupon})` : ''}</span><span>-₹${inv.discount}</span></div>` : ''}
                <div class="inv-total-row inv-grand-total"><span>Grand Total</span><span>₹${inv.total}</span></div>
            </div>
            <div class="invoice-footer-section">
                <p>Thank you for dining with us!</p>
                <p class="invoice-small">This is a computer-generated invoice. No signature required.</p>
                <p class="invoice-small">Hotel Dik · Mumbai, Maharashtra · +91 98765 43210 · info@hoteldik.com</p>
            </div>
        </div>
    `;

    showModal('invoiceModal');
}

function printInvoice() {
    const content = document.getElementById('invoicePaper');
    if (!content) return;

    const printWin = window.open('', '_blank', 'width=800,height=600');
    printWin.document.write(`
        <html>
        <head>
            <title>Invoice - Hotel Dik</title>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Inter', sans-serif; padding: 40px; background: #fff; color: #222; }
                .invoice-paper { max-width: 700px; margin: 0 auto; }
                .invoice-header-section { display: flex; justify-content: space-between; border-bottom: 3px solid #d4a017; padding-bottom: 20px; margin-bottom: 20px; }
                .invoice-brand h2 { font-size: 28px; color: #d4a017; }
                .invoice-brand p { color: #888; font-size: 14px; }
                .invoice-brand i { font-size: 24px; color: #d4a017; margin-bottom: 4px; }
                .invoice-meta { text-align: right; }
                .invoice-meta h3 { color: #d4a017; font-size: 20px; }
                .invoice-details { display: flex; justify-content: space-between; margin-bottom: 20px; padding: 16px; background: #f9f9f9; border-radius: 8px; }
                .inv-detail p { font-size: 14px; margin: 4px 0; }
                .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                .invoice-table th { background: #d4a017; color: #fff; padding: 12px; text-align: left; font-size: 13px; }
                .invoice-table td { padding: 10px 12px; border-bottom: 1px solid #eee; font-size: 14px; }
                .invoice-table tr:nth-child(even) { background: #fafafa; }
                .invoice-totals { border-top: 2px solid #eee; padding-top: 12px; text-align: right; }
                .inv-total-row { display: flex; justify-content: flex-end; gap: 40px; padding: 6px 0; font-size: 14px; }
                .inv-total-row span:last-child { min-width: 80px; text-align: right; }
                .inv-discount { color: #22c55e; }
                .inv-grand-total { font-size: 18px; font-weight: 700; color: #d4a017; border-top: 2px solid #d4a017; padding-top: 10px; margin-top: 8px; }
                .invoice-footer-section { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; }
                .invoice-footer-section p { margin: 4px 0; font-size: 14px; }
                .invoice-small { font-size: 11px; color: #999; }
                .inv-pay-status { font-weight: 600; }
                .inv-pay-status.paid { color: #22c55e; }
                .inv-pay-status.unpaid { color: #f59e0b; }
            </style>
        </head>
        <body>
            ${content.innerHTML}
        </body>
        </html>
    `);
    printWin.document.close();
    setTimeout(() => {
        printWin.print();
    }, 500);
}

function downloadInvoicePDF() {
    showToast('info', 'Tip', 'Use the Print option and select "Save as PDF" to download.');
    printInvoice();
}

// ===== QR CODE GENERATOR =====
function generateQR() {
    const tableNum = document.getElementById('qrTableNumber').value;
    if (!tableNum || tableNum < 1) {
        showToast('error', 'Error', 'Please enter a valid table number.');
        return;
    }

    const display = document.getElementById('qrDisplay');
    const canvas = document.getElementById('qrCanvas');
    const label = document.getElementById('qrTableLabel');

    // Clear previous
    canvas.innerHTML = '';

    const qrUrl = `${window.location.href.split('?')[0]}?table=${tableNum}`;

    // Use QRCode library
    try {
        new QRCode(canvas, {
            text: qrUrl,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    } catch (err) {
        // Fallback: create a visual QR placeholder
        canvas.innerHTML = `
            <div style="width:200px;height:200px;background:#fff;display:flex;align-items:center;justify-content:center;flex-direction:column;border-radius:12px;">
                <i class="fas fa-qrcode" style="font-size:80px;color:#000;"></i>
                <p style="color:#000;font-size:12px;margin-top:8px;">Table ${tableNum}</p>
            </div>
        `;
    }

    label.textContent = `Table #${tableNum}`;
    display.style.display = '';

    showToast('success', 'QR Generated!', `QR code for Table ${tableNum} is ready.`);
}

function downloadQR() {
    const canvas = document.querySelector('#qrCanvas canvas');
    if (canvas) {
        const link = document.createElement('a');
        link.download = `table-qr-${document.getElementById('qrTableNumber').value}.png`;
        link.href = canvas.toDataURL();
        link.click();
        showToast('success', 'Downloaded', 'QR code image saved.');
    } else {
        showToast('info', 'Info', 'QR code image download will work with the QR library.');
    }
}

// ===== RATING SYSTEM =====
function openRating(itemId) {
    const item = state.menuItems.find(i => i.id === itemId);
    if (!item) return;

    state.currentRatingItem = itemId;
    state.selectedRating = 0;

    document.getElementById('ratingItemName').textContent = item.name;
    document.getElementById('ratingText').textContent = 'Select a rating';
    document.getElementById('ratingComment').value = '';

    // Reset stars
    document.querySelectorAll('#ratingStarsInput i').forEach(s => s.classList.remove('active'));

    showModal('ratingModal');
}

function setRating(rating) {
    state.selectedRating = rating;
    const stars = document.querySelectorAll('#ratingStarsInput i');
    const labels = ['', 'Poor 😞', 'Below Average 😐', 'Good 🙂', 'Very Good 😊', 'Excellent 🤩'];

    stars.forEach((star, idx) => {
        star.classList.toggle('active', idx < rating);
    });

    document.getElementById('ratingText').textContent = labels[rating];
}

function submitRating() {
    if (state.selectedRating === 0) {
        showToast('warning', 'Select Rating', 'Please select at least one star.');
        return;
    }

    const item = state.menuItems.find(i => i.id === state.currentRatingItem);
    if (!item) return;

    // Calculate new average
    const totalRating = item.rating * item.ratingCount + state.selectedRating;
    item.ratingCount++;
    item.rating = parseFloat((totalRating / item.ratingCount).toFixed(1));

    DB.set('menuItems', state.menuItems);
    hideModal('ratingModal');

    renderMenuGrid();
    renderPopularItems();
    updateDashboard();

    showToast('success', 'Thanks! ⭐', `You rated ${item.name} ${state.selectedRating} stars.`);
}

// ===== ITEM MANAGEMENT (CRUD) =====
function resetItemForm() {
    document.getElementById('editItemId').value = '';
    document.getElementById('itemName').value = '';
    document.getElementById('itemCategory').value = '';
    document.getElementById('itemPrice').value = '';
    document.getElementById('itemImage').value = '';
    document.getElementById('itemDescription').value = '';
    document.getElementById('itemType').value = 'veg';
    document.getElementById('itemStatus').value = 'available';
    document.getElementById('itemModalTitle').textContent = 'Add New Item';
    document.getElementById('itemModalDesc').textContent = 'Fill in the details to add a new menu item';
    document.getElementById('itemSubmitBtn').innerHTML = '<i class="fas fa-plus"></i> Add Item';
    state.editingItemId = null;
}

function editItem(itemId) {
    const item = state.menuItems.find(i => i.id === itemId);
    if (!item) return;

    state.editingItemId = itemId;
    document.getElementById('editItemId').value = itemId;
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemCategory').value = item.category;
    document.getElementById('itemPrice').value = item.price;
    document.getElementById('itemImage').value = item.image || '';
    document.getElementById('itemDescription').value = item.description;
    document.getElementById('itemType').value = item.type;
    document.getElementById('itemStatus').value = item.status;
    document.getElementById('itemModalTitle').textContent = 'Edit Item';
    document.getElementById('itemModalDesc').textContent = `Editing: ${item.name}`;
    document.getElementById('itemSubmitBtn').innerHTML = '<i class="fas fa-save"></i> Update Item';

    showModal('addItemModal');
}

function handleItemSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('itemName').value.trim();
    const imgInput = document.getElementById('itemImage').value.trim();

    const itemData = {
        name,
        category: document.getElementById('itemCategory').value,
        price: parseInt(document.getElementById('itemPrice').value),
        image: imgInput || FOOD_IMAGES[name] || DEFAULT_FOOD_IMG,
        description: document.getElementById('itemDescription').value.trim(),
        type: document.getElementById('itemType').value,
        status: document.getElementById('itemStatus').value
    };

    if (!itemData.name || !itemData.category || !itemData.price || !itemData.description) {
        showToast('error', 'Error', 'Please fill in all required fields.');
        return;
    }

    if (state.editingItemId) {
        // UPDATE
        const idx = state.menuItems.findIndex(i => i.id === state.editingItemId);
        if (idx !== -1) {
            state.menuItems[idx] = { ...state.menuItems[idx], ...itemData };
            showToast('success', 'Item Updated', `${itemData.name} has been updated.`);
        }
    } else {
        // ADD
        const newItem = {
            id: Date.now(),
            ...itemData,
            rating: 4.0,
            ratingCount: 0
        };
        state.menuItems.push(newItem);
        showToast('success', 'Item Added! 🎉', `${itemData.name} has been added to the menu.`);
    }

    DB.set('menuItems', state.menuItems);
    hideModal('addItemModal');
    renderMenuGrid();
    renderPopularItems();
    renderAutoSuggestions();
    renderDashItems();
    updateDashboard();
}

function deleteItem(itemId) {
    const item = state.menuItems.find(i => i.id === itemId);
    if (!item) return;

    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
        state.menuItems = state.menuItems.filter(i => i.id !== itemId);
        DB.set('menuItems', state.menuItems);
        renderMenuGrid();
        renderPopularItems();
        renderAutoSuggestions();
        renderDashItems();
        updateDashboard();
        showToast('success', 'Item Deleted', `${item.name} has been removed from the menu.`);
    }
}

// ===== ADMIN DASHBOARD =====
function updateDashboard() {
    // Stats
    const totalOrders = state.orders.length;
    const totalRevenue = state.orders.reduce((sum, o) => sum + o.total, 0);
    const totalItems = state.menuItems.length;
    const totalUsers = state.users.length;
    const avgRating = state.menuItems.length > 0
        ? (state.menuItems.reduce((sum, i) => sum + i.rating, 0) / state.menuItems.length).toFixed(1)
        : '0.0';

    const statOrders = document.getElementById('statOrders');
    const statRevenue = document.getElementById('statRevenue');
    const statItems = document.getElementById('statItems');
    const statUsers = document.getElementById('statUsers');
    const statRating = document.getElementById('statRating');

    if (statOrders) statOrders.textContent = totalOrders;
    if (statRevenue) statRevenue.textContent = `₹${totalRevenue.toLocaleString('en-IN')}`;
    if (statItems) statItems.textContent = totalItems;
    if (statUsers) statUsers.textContent = totalUsers;
    if (statRating) statRating.textContent = avgRating;

    renderDashItems();
    renderDashOrders();
    renderUsersTable();
    renderAnalytics();
}

function switchDashTab(tab, btn) {
    document.querySelectorAll('#page-dashboard .dash-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('#page-dashboard .dash-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`panel-${tab}`).classList.add('active');

    if (tab === 'analytics') renderAnalytics();
    if (tab === 'users-manage') renderUsersTable();
}

function renderDashItems() {
    const tbody = document.getElementById('itemsTableBody');
    if (!tbody) return;

    tbody.innerHTML = state.menuItems.map(item => {
        const statusClass = item.status === 'available' ? 'status-available' : 'status-unavailable';
        const statusLabel = item.status === 'available' ? 'Available' : 'Unavailable';
        const catLabel = item.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        const imgUrl = getItemImage(item);

        return `
            <tr>
                <td><img src="${imgUrl}" alt="${item.name}" class="table-item-img"></td>
                <td><strong>${item.name}</strong></td>
                <td>${catLabel}</td>
                <td style="color:var(--gold);font-weight:600;">₹${item.price}</td>
                <td><i class="fas fa-star" style="color:var(--gold);font-size:0.8rem;"></i> ${item.rating.toFixed(1)}</td>
                <td><span class="item-status ${statusClass}">${statusLabel}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="btn-edit" onclick="editItem(${item.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn-danger" onclick="deleteItem(${item.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function renderDashOrders(filterStatus = 'all') {
    const list = document.getElementById('dashOrdersList');
    if (!list) return;

    let orders = [...state.orders];
    if (filterStatus !== 'all') {
        orders = orders.filter(o => o.status === filterStatus);
    }

    if (orders.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard"></i>
                <h3>No orders found</h3>
            </div>
        `;
        return;
    }

    list.innerHTML = `<div class="orders-grid">${orders.map(o => createOrderCard(o)).join('')}</div>`;
}

function filterOrders(status, btn) {
    document.querySelectorAll('#panel-orders .order-filters .btn-outline').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderDashOrders(status);
}

// ===== USERS MANAGEMENT =====
function renderUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;

    const adminCount = state.users.filter(u => u.role === 'admin').length;
    const staffCount = state.users.filter(u => u.role === 'staff').length;
    const guestCount = state.users.filter(u => u.role === 'guest').length;

    const acEl = document.getElementById('adminCount');
    const scEl = document.getElementById('staffCount');
    const gcEl = document.getElementById('guestCount');
    if (acEl) acEl.textContent = adminCount;
    if (scEl) scEl.textContent = staffCount;
    if (gcEl) gcEl.textContent = guestCount;

    tbody.innerHTML = state.users.map(user => {
        const userOrders = state.orders.filter(o => o.customerId === user.id);
        const orderCount = userOrders.length;
        const joinDate = new Date(user.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' });
        const roleBadge = user.role === 'admin' ? 'role-admin' : user.role === 'staff' ? 'role-staff' : 'role-guest';

        return `
            <tr>
                <td><div class="table-user-avatar">${user.name.charAt(0).toUpperCase()}</div></td>
                <td><strong>${user.name}</strong></td>
                <td>${user.email}</td>
                <td>${user.phone || '—'}</td>
                <td><span class="role-badge ${roleBadge}">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span></td>
                <td>${joinDate}</td>
                <td>${orderCount}</td>
                <td>
                    <div class="action-btns">
                        <button class="btn-edit btn-sm" onclick="changeUserRole(${user.id})">
                            <i class="fas fa-user-cog"></i>
                        </button>
                        ${state.currentUser && user.id !== state.currentUser.id ? `
                            <button class="btn-danger btn-sm" onclick="deleteUser(${user.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function changeUserRole(userId) {
    const user = state.users.find(u => u.id === userId);
    if (!user) return;

    const roles = ['guest', 'staff', 'admin'];
    const currentIdx = roles.indexOf(user.role);
    const nextRole = roles[(currentIdx + 1) % roles.length];

    user.role = nextRole;
    DB.set('users', state.users);

    // Update current user if same
    if (state.currentUser && state.currentUser.id === userId) {
        state.currentUser.role = nextRole;
        DB.set('currentUser', state.currentUser);
        showAuthUI(true);
    }

    renderUsersTable();
    showToast('info', 'Role Changed', `${user.name} is now ${nextRole}.`);
}

function deleteUser(userId) {
    const user = state.users.find(u => u.id === userId);
    if (!user) return;

    if (confirm(`Delete user "${user.name}"? This cannot be undone.`)) {
        state.users = state.users.filter(u => u.id !== userId);
        DB.set('users', state.users);
        renderUsersTable();
        updateDashboard();
        showToast('success', 'User Deleted', `${user.name} has been removed.`);
    }
}

// ===== USER DASHBOARD =====
function updateUserDashboard() {
    if (!state.currentUser) return;

    const myOrders = state.orders.filter(o => o.customerId === state.currentUser.id);
    const totalSpent = myOrders.reduce((sum, o) => sum + o.total, 0);
    const pendingOrders = myOrders.filter(o => o.status !== 'completed').length;

    // Find most ordered item
    const itemCounts = {};
    myOrders.forEach(o => {
        o.items.forEach(i => {
            itemCounts[i.name] = (itemCounts[i.name] || 0) + i.qty;
        });
    });
    const favItem = Object.entries(itemCounts).sort((a, b) => b[1] - a[1])[0];

    const usoEl = document.getElementById('userStatOrders');
    const ussEl = document.getElementById('userStatSpent');
    const usfEl = document.getElementById('userStatFavItem');
    const uspEl = document.getElementById('userStatPending');

    if (usoEl) usoEl.textContent = myOrders.length;
    if (ussEl) ussEl.textContent = `₹${totalSpent.toLocaleString('en-IN')}`;
    if (usfEl) usfEl.textContent = favItem ? favItem[0] : '—';
    if (uspEl) uspEl.textContent = pendingOrders;

    renderUserOrders();
    renderUserInvoices();
    renderUserFavorites();
}

function switchUserDashTab(tab, btn) {
    document.querySelectorAll('#page-user-dashboard .dash-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('#page-user-dashboard .dash-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`panel-${tab}`).classList.add('active');
}

function renderUserOrders(filterStatus = 'all') {
    const list = document.getElementById('userOrdersList');
    if (!list || !state.currentUser) return;

    let orders = state.orders.filter(o => o.customerId === state.currentUser.id);
    if (filterStatus === 'pending') {
        orders = orders.filter(o => o.status !== 'completed');
    } else if (filterStatus === 'completed') {
        orders = orders.filter(o => o.status === 'completed');
    }

    if (orders.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-receipt"></i>
                <h3>No orders yet</h3>
                <p>Browse our menu and place your first order!</p>
                <button class="btn-gold" onclick="navigateTo('menu')"><i class="fas fa-utensils"></i> View Menu</button>
            </div>
        `;
        return;
    }

    list.innerHTML = `<div class="orders-grid">${orders.map(o => createOrderCard(o)).join('')}</div>`;
}

function filterUserOrders(status, btn) {
    document.querySelectorAll('#panel-my-orders .order-filters .btn-outline').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderUserOrders(status);
}

function renderUserInvoices() {
    const list = document.getElementById('userInvoicesList');
    if (!list || !state.currentUser) return;

    const invoices = state.invoices.filter(i => i.customerId === state.currentUser.id);

    if (invoices.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-invoice"></i>
                <h3>No invoices yet</h3>
                <p>Invoices are generated when you place orders.</p>
            </div>
        `;
        return;
    }

    list.innerHTML = invoices.map(inv => {
        const date = new Date(inv.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
        const payClass = inv.paymentStatus === 'paid' ? 'pay-paid' : 'pay-unpaid';
        const payLabel = inv.paymentStatus === 'paid' ? '✅ Paid' : '⏳ Pending';

        return `
            <div class="invoice-card" onclick="showInvoice('${inv.id}')">
                <div class="invoice-card-left">
                    <div class="inv-card-icon"><i class="fas fa-file-invoice"></i></div>
                    <div>
                        <h4>${inv.id}</h4>
                        <p>${inv.orderId} · Table #${inv.table}</p>
                        <small>${date}</small>
                    </div>
                </div>
                <div class="invoice-card-right">
                    <span class="inv-amount">₹${inv.total}</span>
                    <span class="pay-badge ${payClass}">${payLabel}</span>
                </div>
            </div>
        `;
    }).join('');
}

function renderUserFavorites() {
    const grid = document.getElementById('userFavoritesGrid');
    if (!grid) return;

    const favItems = state.menuItems.filter(i => state.favorites.includes(i.id));

    if (favItems.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-heart"></i>
                <h3>No favorites yet</h3>
                <p>Click the ♡ icon on menu items to add favorites!</p>
                <button class="btn-gold" onclick="navigateTo('menu')"><i class="fas fa-utensils"></i> Browse Menu</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = '';
    favItems.forEach(item => {
        grid.appendChild(createMenuCard(item));
    });
}

// ===== ANALYTICS CHARTS =====
function renderAnalytics() {
    renderRevenueChart();
    renderCategoryChart();
    renderTopItems();
}

function renderRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;

    // Destroy existing chart
    if (ctx._chart) ctx._chart.destroy();

    const days = [];
    const revenues = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dayStr = d.toLocaleDateString('en-IN', { weekday: 'short' });
        days.push(dayStr);

        const dayOrders = state.orders.filter(o => {
            const orderDate = new Date(o.timestamp);
            return orderDate.toDateString() === d.toDateString();
        });
        revenues.push(dayOrders.reduce((sum, o) => sum + o.total, 0));
    }

    ctx._chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: days,
            datasets: [{
                label: 'Revenue (₹)',
                data: revenues,
                borderColor: '#d4a017',
                backgroundColor: 'rgba(212,160,23,0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#d4a017',
                pointBorderColor: '#d4a017',
                pointRadius: 5,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: '#b0b0b0' } }
            },
            scales: {
                x: { ticks: { color: '#777' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                y: { ticks: { color: '#777' }, grid: { color: 'rgba(255,255,255,0.05)' } }
            }
        }
    });
}

function renderCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;

    if (ctx._chart) ctx._chart.destroy();

    const categories = ['starters', 'main-course', 'desserts', 'beverages'];
    const labels = ['Starters', 'Main Course', 'Desserts', 'Beverages'];
    const colors = ['#f59e0b', '#d4a017', '#22c55e', '#3b82f6'];

    const data = categories.map(cat => {
        return state.orders.reduce((sum, o) => {
            return sum + o.items.filter(i => {
                const menuItem = state.menuItems.find(m => m.id === i.id);
                return menuItem && menuItem.category === cat;
            }).reduce((s, i) => s + i.qty, 0);
        }, 0);
    });

    ctx._chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                data: data.some(d => d > 0) ? data : [25, 35, 20, 20],
                backgroundColor: colors,
                borderColor: '#1a1a1a',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#b0b0b0', padding: 16 }
                }
            }
        }
    });
}

function renderTopItems() {
    const list = document.getElementById('topItemsList');
    if (!list) return;

    const topItems = [...state.menuItems]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);

    list.innerHTML = topItems.map((item, idx) => `
        <div class="top-item">
            <span class="top-item-rank">#${idx + 1}</span>
            <img src="${getItemImage(item)}" alt="${item.name}" class="top-item-img">
            <div class="top-item-info">
                <h4>${item.name}</h4>
                <span>${item.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} · ${item.ratingCount} reviews</span>
            </div>
            <div class="top-item-rating">
                <i class="fas fa-star"></i> ${item.rating.toFixed(1)}
            </div>
        </div>
    `).join('');
}

// ===== TOAST NOTIFICATION SYSTEM =====
function showToast(type, title, message) {
    const container = document.getElementById('toastContainer');
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon"><i class="${icons[type]}"></i></div>
        <div class="toast-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
        <button class="toast-close-btn" onclick="this.parentElement.classList.add('removing'); setTimeout(() => this.parentElement.remove(), 300);">
            <i class="fas fa-times"></i>
        </button>
    `;

    container.appendChild(toast);

    // Auto remove
    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ===== CHECK URL PARAMS (for QR scan) =====
(function checkQRParams() {
    const params = new URLSearchParams(window.location.search);
    const table = params.get('table');
    if (table) {
        document.getElementById('cartTableNum').value = table;
        setTimeout(() => {
            navigateTo('menu');
            showToast('info', `Table ${table}`, `Welcome! You're ordering for Table ${table}. Browse our menu and add items to your cart.`);
        }, 2500);
    }
})();
