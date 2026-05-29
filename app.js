/* ==========================================================================
   📲 WhatsApp Boutique & Secure Cloud DB Configuration (Sodi Daara)
   ========================================================================== */

// Set your WhatsApp Business phone number here (include country code, no symbols, e.g., '919876543210' for India)
const WHATSAPP_PHONE_NUMBER = "919876543210"; 

// If you want a real cloud database, create a free project at supabase.com and paste your details below:
const SUPABASE_URL = "https://kktpfgzuhgeepcweqfui.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrdHBmcXp1aGdlZXBjd2VxZnVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNTQxMTEsImV4cCI6MjA5NTYzMDExMX0.FAVBlT_-a4dmowwfW3P4xJ-7xtdpVwgmCHbj8UnWH9o"; 

let supabase = null;
try {
    if (SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log("Sodi Daara: Central Cloud Database Active! 🔐");
    } else {
        console.log("Sodi Daara: Local Mode Active (using fallback in-browser storage) 🔋");
    }
} catch (e) {
    console.error("Sodi Daara Supabase Init Error:", e);
}

/* ==========================================================================
   Product Database (Inventory)
   ========================================================================== */
let PRODUCTS = [];

async function loadProductsDatabase() {
    if (supabase) {
        try {
            const { data, error } = await supabase.from("sodi_daara_products").select("*");
            if (error) throw error;
            if (data && data.length > 0) {
                PRODUCTS = data;
                localStorage.setItem("sodi_daara_products", JSON.stringify(PRODUCTS));
                
                // Re-render catalog live if product grids exist
                const grid = document.getElementById("products-grid");
                if (grid) renderCatalog(PRODUCTS);
                return;
            }
        } catch (err) {
            console.warn("Sodi Daara Cloud Load Fallback:", err);
        }
    }

    const stored = localStorage.getItem("sodi_daara_products");
    if (stored) {
        PRODUCTS = JSON.parse(stored);
    } else {
        PRODUCTS = [
            {
                id: "p1",
                title: "Chubby Honey Bee Plushie",
                category: "plushies",
                price: 1499,
                rating: 5,
                badge: "Best Seller",
                image: "🐝",
                description: "An incredibly soft, fuzzy bumblebee plushie crocheted with ultra-plush chenille yarn. Features child-safe safety eyes, tiny wings, and embroidered rosy cheeks.",
                size: "Approx. 7\" x 5\"",
                yarn: "100% Chenille Baby Blanket Yarn",
                care: "Hand wash cold, dry flat."
            },
            {
                id: "p2",
                title: "Bubbles the Pastel Octopus",
                category: "plushies",
                price: 1399,
                rating: 5,
                badge: "Artisan Pick",
                image: "🐙",
                description: "The ultimate desk buddy! Bubbles is crocheted in premium velvet yarn, creating a luxurious drape with curly tentacles. Perfect for anxiety relief and sensory comfort.",
                size: "Approx. 6\" x 6\"",
                yarn: "Super-Soft Premium Velvet",
                care: "Spot clean with gentle soap."
            },
            {
                id: "p3",
                title: "Sage Garden Slouchy Cardigan",
                category: "wearables",
                price: 5499,
                rating: 5,
                badge: "Exclusive Design",
                image: "🧥",
                description: "Indulge in cozy elegance. This heavyweight slow-fashion cardigan features stunning waffle stitch details, relaxed cuffs, and a beautifully draped oversized look.",
                size: "One Size Fits Most (S-XL)",
                yarn: "60% Organic Cotton, 40% Soft Alpaca",
                care: "Dry clean or hand wash only."
            },
            {
                id: "p4",
                title: "Retro Granny Square Tote Bag",
                category: "wearables",
                price: 2199,
                rating: 4,
                badge: "Vintage Vibe",
                image: "👜",
                description: "Channel 70s aesthetics with a modern twist. Handcrafted from durable cotton loops, this tote is fully lined with soft beige canvas to keep all your treasures secure.",
                size: "14\" x 14\" (Strap drop 11\")",
                yarn: "100% Double-Combed Organic Cotton",
                care: "Machine wash cold inside laundry bag."
            },
            {
                id: "p5",
                title: "Checkerboard Cozy Throw Blanket",
                category: "decor",
                price: 7999,
                rating: 5,
                badge: "Limited Release",
                image: "🛏️",
                description: "Woven meticulously loop by loop over 35 hours. This gorgeous double-thick throw blanket features an elegant latte and cream checkered pattern with fringe borders.",
                size: "50\" x 60\"",
                yarn: "100% Non-scratch Merino Wool Blend",
                care: "Dry clean recommended."
            },
            {
                id: "p6",
                title: "Cinnamon Slouch Beanie",
                category: "wearables",
                price: 1199,
                rating: 5,
                badge: "Winter Wardrobe",
                image: "👒",
                description: "A super slouchy, extra warm ribbed beanie topped with a giant faux-fur pom-pom. The perfect accessory to complete any cozy winter aesthetic.",
                size: "Stretches to fit all adult sizes",
                yarn: "80% Soft Premium Acrylic, 20% Wool",
                care: "Remove pom-pom before washing."
            }
        ];
        localStorage.setItem("sodi_daara_products", JSON.stringify(PRODUCTS));
    }
}

async function loadOrdersDatabase() {
    if (supabase) {
        try {
            const { data, error } = await supabase.from("sodi_daara_orders").select("*");
            if (error) throw error;
            if (data && data.length > 0) {
                localStorage.setItem("sodi_daara_orders", JSON.stringify(data));
                return;
            }
        } catch (err) {
            console.warn("Sodi Daara Orders Cloud Load Fallback:", err);
        }
    }

    const stored = localStorage.getItem("sodi_daara_orders");
    if (!stored) {
        const initialOrders = [
            {
                id: "LL-4829",
                customer: { firstName: "Jessica", lastName: "Miller", email: "jess.miller@gmail.com", address: "782 Whispering Pines Dr", city: "Seattle", zip: "98101" },
                items: [
                    { id: "p1", title: "Chubby Honey Bee Plushie", price: 1499, quantity: 2, meta: "Chenille", isCustom: false }
                ],
                subtotal: 2998,
                shipping: 199,
                total: 3197,
                date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
                status: "Processing",
                history: [
                    {
                        date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
                        status: "Pending",
                        note: "Your slow-craft order has been received by our workshop queue! 📝"
                    },
                    {
                        date: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
                        status: "Processing",
                        note: "Loops cast on! Sage chenille yarn is being hand-knitted loop-by-loop. 🧶"
                    }
                ]
            },
            {
                id: "LL-9831",
                customer: { firstName: "Noah", lastName: "Benson", email: "noah.benson@live.com", address: "44 Walnut St Apt 2B", city: "Boston", zip: "02108" },
                items: [
                    { id: "p2", title: "Bubbles the Pastel Octopus", price: 1399, quantity: 1, meta: "Velvet", isCustom: false },
                    { id: "p6", title: "Cinnamon Slouch Beanie", price: 1199, quantity: 1, meta: "Acrylic Blend", isCustom: false }
                ],
                subtotal: 2598,
                shipping: 199,
                total: 2797,
                date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
                status: "Pending",
                history: [
                    {
                        date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
                        status: "Pending",
                        note: "Your slow-craft order has been received by our workshop queue! 📝"
                    }
                ]
            }
        ];
        localStorage.setItem("sodi_daara_orders", JSON.stringify(initialOrders));
    }
}

/* ==========================================================================
   Yarn Colors Available for Customizer
   ========================================================================== */
const YARN_COLORS = [
    { name: "Peach Fizz", value: "hsl(14, 90%, 75%)", hex: "#FF9E80" },
    { name: "Dusty Rose", value: "hsl(340, 40%, 75%)", hex: "#D9A3B0" },
    { name: "Sage Green", value: "hsl(100, 25%, 65%)", hex: "#A8C3A0" },
    { name: "Mustard Gold", value: "hsl(45, 75%, 65%)", hex: "#E8C860" },
    { name: "Lavender Haze", value: "hsl(260, 45%, 80%)", hex: "#D1C4E9" },
    { name: "Cotton Candy", value: "hsl(197, 85%, 82%)", hex: "#B3E5FC" },
    { name: "Creamy Oatmeal", value: "hsl(30, 30%, 88%)", hex: "#F5EBE6" },
    { name: "Cinnamon", value: "hsl(14, 60%, 55%)", hex: "#D65E42" }
];

/* ==========================================================================
   Emoji Gradient Background Colors (Visual Identity Mapping)
   ========================================================================== */
const EMOJI_COLORS = {
    '🧸': 'hsl(30, 40%, 80%)',
    '🦖': 'hsl(100, 25%, 70%)',
    '🧣': 'hsl(340, 40%, 80%)',
    '🧶': 'hsl(14, 60%, 75%)',
    '🐝': 'hsl(45, 75%, 70%)',
    '🐙': 'hsl(197, 85%, 85%)',
    '🧥': 'hsl(260, 45%, 85%)',
    '👜': 'hsl(14, 90%, 80%)',
    '🛏️': 'hsl(30, 30%, 85%)',
    '👒': 'hsl(100, 20%, 80%)'
};

/* ==========================================================================
   Product Visual Extractor (Dynamic Emojis & Gradient Colors)
   ========================================================================== */
function getProductVisual(product) {
    let emoji = '🧶';
    let isRealImage = false;
    let imageSrc = '';
    
    if (product.image && (product.image.startsWith('data:image/') || product.image.startsWith('http://') || product.image.startsWith('https://') || product.image.startsWith('assets/'))) {
        isRealImage = true;
        imageSrc = product.image;
    } else if (product.image && product.image.length <= 4) {
        emoji = product.image;
    } else {
        const emRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;
        const matches = product.image ? product.image.match(emRegex) : null;
        if (matches) {
            emoji = matches[0];
        } else if (product.id === 'p1') {
            emoji = '🐝';
        } else if (product.id === 'p2') {
            emoji = '🐙';
        } else if (product.id === 'p3') {
            emoji = '🧥';
        } else if (product.id === 'p4') {
            emoji = '👜';
        } else if (product.id === 'p5') {
            emoji = '🛏️';
        } else if (product.id === 'p6') {
            emoji = '👒';
        }
    }
    
    const bgColor = isRealImage ? 'hsl(30, 30%, 88%)' : (EMOJI_COLORS[emoji] || YARN_COLORS[product.id.charCodeAt(product.id.length - 1) % YARN_COLORS.length].value);
    const gradientStyle = `background: linear-gradient(135deg, ${bgColor} 0%, var(--color-bg-alt) 100%)`;
    
    return { emoji, gradientStyle, isRealImage, imageSrc };
}

/* ==========================================================================
   Click Analytics Tracker (Product Popularity Tracker)
   ========================================================================== */
function trackProductClick(productId) {
    const stored = localStorage.getItem("sodi_daara_products");
    if (!stored) return;
    
    let products = JSON.parse(stored);
    const product = products.find(p => p.id === productId);
    if (product) {
        product.clicks = (product.clicks || 0) + 1;
        localStorage.setItem("sodi_daara_products", JSON.stringify(products));
        PRODUCTS = products;
    }
}

/* ==========================================================================
   Customizer SVG Outlines
   ========================================================================== */
const SVG_TEMPLATES = {
    octopus: `
        <!-- Main body base group -->
        <g id="body-layer" filter="url(#yarn-texture)">
            <!-- Head -->
            <path d="M120,200 C120,90 280,90 280,200 C280,225 260,250 200,250 C140,250 120,225 120,200 Z" fill="#DEFAULT_PRIMARY#" id="svg-part-primary" stroke="#2C2520" stroke-width="6" stroke-linejoin="round" />
            <!-- Tentacles -->
            <path d="M115,225 C115,225 80,270 120,285 C140,290 150,265 155,245 C155,245 140,285 180,290 C200,292 210,265 210,245 C210,245 220,290 260,285 C280,282 285,260 285,240 C285,240 310,280 340,265 C360,255 330,220 310,215" fill="#DEFAULT_SECONDARY#" id="svg-part-secondary" stroke="#2C2520" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        
        <!-- Craft Details (Always Fixed) -->
        <g id="face-details">
            <!-- Eyes -->
            <circle cx="170" cy="180" r="14" fill="#2C2520" />
            <circle cx="230" cy="180" r="14" fill="#2C2520" />
            <!-- Eye sparkles -->
            <circle cx="166" cy="176" r="4" fill="#ffffff" />
            <circle cx="226" cy="176" r="4" fill="#ffffff" />
            <!-- Cheeks -->
            <ellipse cx="150" cy="195" rx="8" ry="5" fill="#FF8A8A" opacity="0.75" />
            <ellipse cx="250" cy="195" rx="8" ry="5" fill="#FF8A8A" opacity="0.75" />
            <!-- Cute Mouth -->
            <path d="M190,195 Q200,205 210,195" fill="none" stroke="#2C2520" stroke-width="4" stroke-linecap="round" />
        </g>
        
        <!-- Crochet Stitch Effect Filter Overlay -->
        <defs>
            <filter id="yarn-texture" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
        </defs>
    `,
    beanie: `
        <!-- Main body base group -->
        <g id="body-layer" filter="url(#yarn-texture)">
            <!-- Pom Pom -->
            <circle cx="200" cy="90" r="35" fill="#DEFAULT_SECONDARY#" id="svg-part-secondary" stroke="#2C2520" stroke-width="6" stroke-dasharray="10,5" />
            <!-- Main Ribbed Hat -->
            <path d="M120,250 C110,140 290,140 280,250 Z" fill="#DEFAULT_PRIMARY#" id="svg-part-primary" stroke="#2C2520" stroke-width="6" stroke-linejoin="round" />
            <!-- Folding Brim -->
            <rect x="100" y="240" width="200" height="45" rx="10" fill="#DEFAULT_SECONDARY#" id="svg-part-brim" stroke="#2C2520" stroke-width="6" />
            <!-- Textured Rib Lines -->
            <path d="M140,240 L140,285 M170,240 L170,285 M200,240 L200,285 M230,240 L230,285 M260,240 L260,285" stroke="#2C2520" stroke-width="4" stroke-linecap="round" opacity="0.4" />
        </g>
        
        <g id="cute-badge">
            <!-- Little brown leather tag -->
            <rect x="220" y="248" width="30" height="20" rx="3" fill="#8B5A2B" stroke="#2C2520" stroke-width="2" />
            <path d="M225,258 L245,258" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="2,2" />
        </g>
        
        <defs>
            <filter id="yarn-texture" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
        </defs>
    `,
    bee: `
        <!-- Main body base group -->
        <g id="body-layer" filter="url(#yarn-texture)">
            <!-- Bee Body Base -->
            <rect x="110" y="140" width="180" height="120" rx="60" fill="#DEFAULT_PRIMARY#" id="svg-part-primary" stroke="#2C2520" stroke-width="6" />
            <!-- Black Stripes -->
            <path d="M165,142 L165,258 M215,142 L215,258" stroke="#DEFAULT_SECONDARY#" id="svg-part-secondary" stroke-width="24" stroke-linecap="butt" />
            <!-- Redo body border to cover stripe overlap -->
            <rect x="110" y="140" width="180" height="120" rx="60" fill="none" stroke="#2C2520" stroke-width="6" />
            <!-- Little Stinger -->
            <path d="M290,190 L315,200 L290,210 Z" fill="#2C2520" />
            
            <!-- Fluffy wings -->
            <ellipse cx="170" cy="115" rx="25" ry="35" transform="rotate(-25 170 115)" fill="#E0F7FA" stroke="#2C2520" stroke-width="5" opacity="0.9" />
            <ellipse cx="215" cy="110" rx="20" ry="30" transform="rotate(15 215 110)" fill="#E0F7FA" stroke="#2C2520" stroke-width="5" opacity="0.9" />
        </g>
        
        <!-- Cozy face details -->
        <g id="face-details">
            <circle cx="140" cy="185" r="10" fill="#2C2520" />
            <circle cx="140" cy="182" r="3" fill="#ffffff" />
            <ellipse cx="130" cy="198" rx="6" ry="4" fill="#FF8A8A" opacity="0.8" />
            <!-- Mouth -->
            <path d="M150,195 Q154,200 158,195" fill="none" stroke="#2C2520" stroke-width="3" stroke-linecap="round" />
        </g>
        
        <defs>
            <filter id="yarn-texture" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
        </defs>
    `
};

/* ==========================================================================
   State Management
   ========================================================================== */
let cart = [];
let customizerState = {
    base: "octopus",
    yarn: "chenille",
    primaryColor: YARN_COLORS[3],   // Mustard Gold default
    secondaryColor: YARN_COLORS[1], // Dusty Rose default
    price: 1899,
    instructions: "",
    imageB64: ""
};

/* ==========================================================================
   Initialization
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    loadProductsDatabase();
    loadOrdersDatabase();
    initCatalog();
    initCustomizer();
    initCart();
    initCustomOrderWizard();
    initGeneralUI();
    initOrderTracking();
    initCustomerPortal();
    initLoopAssistantChatbot();
});

/* ==========================================================================
   General UI (Navigation, Accordions, Search Overlay)
   ========================================================================== */
function initGeneralUI() {
    // Header Scroll Shadow
    const header = document.getElementById("main-header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Mobile Hamburger Menu Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Close menu when link is clicked
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", (e) => {
            document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
            link.classList.add("active");
            navMenu.classList.remove("active");
        });
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute("id");
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.add("active");
            } else {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.remove("active");
            }
        });
    });

    // FAQ Accordion Toggles
    document.querySelectorAll(".faq-question").forEach(button => {
        button.addEventListener("click", () => {
            const faqItem = button.parentElement;
            const isActive = faqItem.classList.contains("active");
            
            // Close all items
            document.querySelectorAll(".faq-item").forEach(item => {
                item.classList.remove("active");
                item.querySelector(".faq-answer").style.maxHeight = null;
            });

            if (!isActive) {
                faqItem.classList.add("active");
                const answer = faqItem.querySelector(".faq-answer");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Header Search Overlay
    const searchTrigger = document.getElementById("search-trigger");
    const searchOverlay = document.getElementById("search-overlay");
    const closeSearch = document.getElementById("close-search");
    const searchInput = document.getElementById("search-input");

    searchTrigger.addEventListener("click", () => {
        searchOverlay.classList.add("active");
        setTimeout(() => searchInput.focus(), 200);
    });

    closeSearch.addEventListener("click", () => {
        searchOverlay.classList.remove("active");
    });

    searchOverlay.addEventListener("click", (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove("active");
        }
    });

    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const catalogSearch = document.getElementById("catalog-search");
        catalogSearch.value = query;
        filterCatalog(query, "all");
        
        // Auto scroll to catalog after short typing pause
        if (query.length > 2) {
            document.getElementById("shop").scrollIntoView({ behavior: 'smooth' });
            searchOverlay.classList.remove("active");
        }
    });
}

/* ==========================================================================
   Catalog Functionality
   ========================================================================== */
function initCatalog() {
    renderCatalog(PRODUCTS);

    // Category Tabs click
    const tabs = document.querySelectorAll("#category-tabs .tab-btn");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            
            const category = tab.getAttribute("data-category");
            const query = document.getElementById("catalog-search").value.toLowerCase();
            filterCatalog(query, category);
        });
    });

    // Realtime Catalog Search input
    const catalogSearch = document.getElementById("catalog-search");
    catalogSearch.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const activeTab = document.querySelector("#category-tabs .tab-btn.active");
        const category = activeTab ? activeTab.getAttribute("data-category") : "all";
        filterCatalog(query, category);
    });
}

function renderCatalog(items) {
    const grid = document.getElementById("products-grid");
    grid.innerHTML = "";

    if (items.length === 0) {
        grid.innerHTML = `
            <div class="no-results-state" style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-light);">
                <div style="font-size: 3rem;">🧶🔍</div>
                <h4 style="margin: 16px 0 8px 0; font-family: var(--font-heading); font-size: 1.4rem;">No crochet treasures found</h4>
                <p>Try searching for another keyword or change your category filter.</p>
            </div>
        `;
        return;
    }

    items.forEach(product => {
        const card = document.createElement("article");
        card.className = "product-card";
        
        // Retrieve dynamic emoji and background gradient mapping
        const visual = getProductVisual(product);

        card.innerHTML = `
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <div class="product-img-wrapper" style="${visual.gradientStyle}">
                <div class="product-design-art" style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; filter: drop-shadow(0 8px 12px rgba(0,0,0,0.15))">
                    ${visual.isRealImage ? `<img src="${visual.imageSrc}" alt="${product.title}" class="catalog-item-img" style="width: 80%; height: 80%; object-fit: contain;">` : `<span style="font-size: 6rem;">${visual.emoji}</span>`}
                </div>
                <div class="product-actions-overlay">
                    <button class="action-overlay-btn quick-view-trigger" data-id="${product.id}" aria-label="Quick view info">👀</button>
                    <button class="action-overlay-btn add-fast-trigger" data-id="${product.id}" aria-label="Add to cart">🛒</button>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title quick-view-title" data-id="${product.id}">${product.title}</h3>
                <div class="product-rating">
                    ${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}
                </div>
                <div class="product-footer-row">
                    <span class="product-price">₹${Math.round(product.price)}</span>
                    <button class="add-to-basket-btn" data-id="${product.id}">Add to Basket</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    // Attach Event Listeners
    grid.querySelectorAll(".add-to-basket-btn, .add-fast-trigger").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = btn.getAttribute("data-id");
            trackProductClick(id); // Track product click metrics
            addToCart(id);
        });
    });

    grid.querySelectorAll(".quick-view-trigger, .quick-view-title").forEach(element => {
        element.addEventListener("click", () => {
            const id = element.getAttribute("data-id");
            trackProductClick(id); // Track product click metrics
            openQuickView(id);
        });
    });
}

function filterCatalog(query, category) {
    const filtered = PRODUCTS.filter(product => {
        const matchesQuery = product.title.toLowerCase().includes(query) || product.description.toLowerCase().includes(query);
        const matchesCategory = category === "all" || product.category === category;
        return matchesQuery && matchesCategory;
    });
    renderCatalog(filtered);
}

/* ==========================================================================
   Quick View Modal
   ========================================================================== */
function openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    // Create Modal Elements Dynamically
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    
    const visual = getProductVisual(product);

    overlay.innerHTML = `
        <div class="product-modal">
            <button class="close-modal-btn" aria-label="Close modal">&times;</button>
            <div class="modal-grid">
                <div class="modal-img-container" style="${visual.gradientStyle}">
                    <div style="filter: drop-shadow(0 10px 20px rgba(0,0,0,0.15)); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                        ${visual.isRealImage ? `<img src="${visual.imageSrc}" alt="${product.title}" style="width: 75%; height: 75%; object-fit: contain;">` : `<span style="font-size: 9rem;">${visual.emoji}</span>`}
                    </div>
                </div>
                <div class="modal-details">
                    <span class="modal-category">${product.category}</span>
                    <h3 class="modal-product-title">${product.title}</h3>
                    <div class="modal-price">₹${Math.round(product.price)}</div>
                    <p class="modal-desc">${product.description}</p>
                    
                    <div class="modal-meta-row">
                        <span class="modal-meta-label">Dimensions:</span>
                        <span>${product.size}</span>
                    </div>
                    <div class="modal-meta-row">
                        <span class="modal-meta-label">Materials:</span>
                        <span>${product.yarn}</span>
                    </div>
                    <div class="modal-meta-row">
                        <span class="modal-meta-label">Care Tips:</span>
                        <span>${product.care}</span>
                    </div>

                    <div class="modal-actions">
                        <div class="quantity-control">
                            <button class="qty-btn qty-minus">-</button>
                            <span class="qty-val">1</span>
                            <button class="qty-btn qty-plus">+</button>
                        </div>
                        <button class="btn primary-btn add-modal-to-cart" style="flex-grow: 1;">Add to Basket</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    // Modal Close logic
    const closeBtn = overlay.querySelector(".close-modal-btn");
    const closeModal = () => {
        overlay.classList.remove("active");
        setTimeout(() => overlay.remove(), 400);
    };
    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
    });

    // Quantity controls in modal
    const qtyMinus = overlay.querySelector(".qty-minus");
    const qtyPlus = overlay.querySelector(".qty-plus");
    const qtyVal = overlay.querySelector(".qty-val");

    qtyMinus.addEventListener("click", () => {
        let current = parseInt(qtyVal.textContent);
        if (current > 1) qtyVal.textContent = current - 1;
    });

    qtyPlus.addEventListener("click", () => {
        let current = parseInt(qtyVal.textContent);
        qtyVal.textContent = current + 1;
    });

    // Add to cart from modal
    const addToCartBtn = overlay.querySelector(".add-modal-to-cart");
    addToCartBtn.addEventListener("click", () => {
        const qty = parseInt(qtyVal.textContent);
        addToCart(product.id, qty);
        closeModal();
    });
}

/* ==========================================================================
   Design Lab / Interactive Amigurumi Customizer
   ========================================================================== */
function initCustomizer() {
    renderColorPickers();
    renderCustomizerSVG();

    // Base amigurumi item buttons
    const baseBtns = document.querySelectorAll(".base-btn");
    baseBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            baseBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            customizerState.base = btn.getAttribute("data-base");
            
            // Adjust customizer parameters based on chosen item
            const secSection = document.getElementById("secondary-color-section");
            const secTitle = secSection.querySelector(".control-section-title");
            
            if (customizerState.base === "beanie") {
                secTitle.textContent = "4. Pick Brim & Pom-pom Color";
                secSection.style.display = "block";
            } else if (customizerState.base === "bee") {
                secTitle.textContent = "4. Pick Stripe & Wing Color";
                secSection.style.display = "block";
            } else {
                secTitle.textContent = "4. Pick Tentacle Accent Color";
                secSection.style.display = "block";
            }

            renderCustomizerSVG();
        });
    });

    // Yarn type buttons
    const yarnBtns = document.querySelectorAll(".yarn-btn");
    yarnBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            yarnBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            customizerState.yarn = btn.getAttribute("data-yarn");
            updateCustomizerPriceDisplay();
            updateYarnMaterialTextureEffect();
        });
    });

    // Special Instructions listener
    const briefInput = document.getElementById("customizer-brief");
    if (briefInput) {
        briefInput.addEventListener("input", (e) => {
            customizerState.instructions = e.target.value;
            updateCustomizerPriceDisplay();
        });
    }

    // Inspiration image file uploader listener
    const fileInput = document.getElementById("customizer-image-file");
    const previewContainer = document.getElementById("customizer-image-preview-container");
    const previewImg = document.getElementById("customizer-image-preview");
    const clearBtn = document.getElementById("clear-customizer-image-btn");

    if (fileInput) {
        fileInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    customizerState.imageB64 = event.target.result;
                    if (previewImg) previewImg.src = event.target.result;
                    if (previewContainer) previewContainer.style.display = "block";
                    updateCustomizerPriceDisplay();
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            customizerState.imageB64 = "";
            if (fileInput) fileInput.value = "";
            if (previewImg) previewImg.src = "";
            if (previewContainer) previewContainer.style.display = "none";
            updateCustomizerPriceDisplay();
        });
    }

    // Initial price calculation
    updateCustomizerPriceDisplay();

    // Add custom designed item to cart
    const addCustomBtn = document.getElementById("add-custom-to-cart-btn");
    addCustomBtn.addEventListener("click", () => {
        addCustomizerItemToCart();
    });
}

function updateCustomizerPriceDisplay() {
    const activeYarnBtn = document.querySelector(".yarn-btn.active");
    if (!activeYarnBtn) return;
    
    const basePrice = parseInt(activeYarnBtn.getAttribute("data-price"));
    const baseCostEl = document.getElementById("customizer-base-cost");
    if (baseCostEl) baseCostEl.textContent = `₹${basePrice}`;
    
    let surchargeInstructions = 0;
    const briefText = (customizerState.instructions || "").trim();
    const briefRow = document.getElementById("customizer-brief-row");
    if (briefText.length > 0) {
        surchargeInstructions = 299;
        if (briefRow) briefRow.style.display = "flex";
    } else {
        if (briefRow) briefRow.style.display = "none";
    }
    
    let surchargePhoto = 0;
    const photoRow = document.getElementById("customizer-photo-row");
    if (customizerState.imageB64) {
        surchargePhoto = 499;
        if (photoRow) photoRow.style.display = "flex";
    } else {
        if (photoRow) photoRow.style.display = "none";
    }
    
    const total = basePrice + surchargeInstructions + surchargePhoto;
    customizerState.price = total;
    
    const customPriceEl = document.getElementById("custom-price");
    if (customPriceEl) customPriceEl.textContent = `₹${total}`;
}

function renderColorPickers() {
    const primaryContainer = document.getElementById("primary-colors");
    const secondaryContainer = document.getElementById("secondary-colors");

    primaryContainer.innerHTML = "";
    secondaryContainer.innerHTML = "";

    YARN_COLORS.forEach((color, index) => {
        // Primary Picker Color Option
        const primBtn = document.createElement("button");
        primBtn.className = `color-option-btn ${index === 3 ? 'active' : ''}`;
        primBtn.style.backgroundColor = color.hex;
        primBtn.setAttribute("title", color.name);
        primBtn.addEventListener("click", () => {
            primaryContainer.querySelectorAll(".color-option-btn").forEach(b => b.classList.remove("active"));
            primBtn.classList.add("active");
            customizerState.primaryColor = color;
            updateCustomizerColors();
        });
        primaryContainer.appendChild(primBtn);

        // Secondary Picker Color Option
        const secBtn = document.createElement("button");
        secBtn.className = `color-option-btn ${index === 1 ? 'active' : ''}`;
        secBtn.style.backgroundColor = color.hex;
        secBtn.setAttribute("title", color.name);
        secBtn.addEventListener("click", () => {
            secondaryContainer.querySelectorAll(".color-option-btn").forEach(b => b.classList.remove("active"));
            secBtn.classList.add("active");
            customizerState.secondaryColor = color;
            updateCustomizerColors();
        });
        secondaryContainer.appendChild(secBtn);
    });
}

function renderCustomizerSVG() {
    const svgContainer = document.getElementById("customizer-preview");
    let template = SVG_TEMPLATES[customizerState.base];
    
    // Inject current colors
    template = template.replace("#DEFAULT_PRIMARY#", customizerState.primaryColor.hex);
    template = template.replace("#DEFAULT_SECONDARY#", customizerState.secondaryColor.hex);
    
    svgContainer.innerHTML = `
        <div class="yarn-material-effect" id="yarn-material-effect"></div>
        <svg id="customizer-svg" viewBox="0 0 400 400" width="100%" height="100%">
            ${template}
        </svg>
    `;
    updateYarnMaterialTextureEffect();
}

function updateCustomizerColors() {
    const primPart = document.getElementById("svg-part-primary");
    const secPart = document.getElementById("svg-part-secondary");
    const brimPart = document.getElementById("svg-part-brim");

    if (primPart) primPart.setAttribute("fill", customizerState.primaryColor.hex);
    if (secPart) secPart.setAttribute("fill", customizerState.secondaryColor.hex);
    if (brimPart) brimPart.setAttribute("fill", customizerState.secondaryColor.hex);
}

function updateYarnMaterialTextureEffect() {
    const textureOverlay = document.getElementById("yarn-material-effect");
    if (!textureOverlay) return;

    if (customizerState.yarn === "chenille") {
        textureOverlay.style.backgroundSize = "10px 10px";
        textureOverlay.style.opacity = "0.08";
    } else if (customizerState.yarn === "cotton") {
        textureOverlay.style.backgroundSize = "4px 4px";
        textureOverlay.style.opacity = "0.05";
    } else if (customizerState.yarn === "boucle") {
        textureOverlay.style.backgroundSize = "16px 16px";
        textureOverlay.style.opacity = "0.14";
    }
}

function addCustomizerItemToCart() {
    // Generate a unique custom item configuration
    const itemTitle = `Custom ${customizerState.base.charAt(0).toUpperCase() + customizerState.base.slice(1)}`;
    
    // Compile elegant styled HTML metadata
    let metaHtml = `
        <div class="custom-specs" style="margin-top: 6px; font-size: 0.8rem; line-height: 1.4; color: var(--color-text-light);">
            <div><strong>Colors:</strong> ${customizerState.primaryColor.name} & ${customizerState.secondaryColor.name}</div>
            <div><strong>Yarn:</strong> ${customizerState.yarn.charAt(0).toUpperCase() + customizerState.yarn.slice(1)}</div>
    `;
    if (customizerState.instructions && customizerState.instructions.trim()) {
        metaHtml += `<div style="margin-top: 4px; border-left: 2px solid var(--color-primary); padding-left: 6px; font-style: italic;">"${customizerState.instructions.trim()}"</div>`;
    }
    if (customizerState.imageB64) {
        metaHtml += `
            <div style="margin-top: 6px; display: flex; align-items: center; gap: 6px;">
                <strong>Ref Photo:</strong>
                <img src="${customizerState.imageB64}" style="width: 32px; height: 32px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid rgba(44, 37, 32, 0.1);" />
            </div>
        `;
    }
    metaHtml += `</div>`;
    
    const customItem = {
        id: `custom_${Date.now()}`,
        title: itemTitle,
        price: customizerState.price,
        meta: metaHtml,
        quantity: 1,
        isCustom: true,
        base: customizerState.base,
        primaryHex: customizerState.primaryColor.hex,
        secondaryHex: customizerState.secondaryColor.hex
    };

    // Add to cart list
    cart.push(customItem);
    updateCartUI();
    openCartSidebar();
    showToast("Your custom design added to basket! 🎨", "success");

    // Reset customization fields
    const briefInput = document.getElementById("customizer-brief");
    if (briefInput) briefInput.value = "";
    customizerState.instructions = "";
    
    const fileInput = document.getElementById("customizer-image-file");
    if (fileInput) fileInput.value = "";
    customizerState.imageB64 = "";
    
    const previewContainer = document.getElementById("customizer-image-preview-container");
    const previewImg = document.getElementById("customizer-image-preview");
    if (previewImg) previewImg.src = "";
    if (previewContainer) previewContainer.style.display = "none";
    
    updateCustomizerPriceDisplay();
}

/* ==========================================================================
   Shopping Cart Sidebar Management
   ========================================================================== */
function initCart() {
    const trigger = document.getElementById("cart-trigger");
    const sidebar = document.getElementById("cart-sidebar");
    const overlay = document.getElementById("cart-overlay");
    const closeBtn = document.getElementById("close-cart");
    const closeLink = document.querySelector(".close-cart-link");

    const openCart = () => {
        sidebar.classList.add("active");
        overlay.classList.add("active");
    };

    const closeCart = () => {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    };

    trigger.addEventListener("click", openCart);
    closeBtn.addEventListener("click", closeCart);
    overlay.addEventListener("click", closeCart);
    if (closeLink) closeLink.addEventListener("click", closeCart);

    // Simulated Checkout wizard trigger
    const checkoutBtn = document.getElementById("checkout-btn");
    checkoutBtn.addEventListener("click", () => {
        const currentUserStr = sessionStorage.getItem("sodi_daara_current_user");
        if (!currentUserStr) {
            showToast("Please sign in or create an account to proceed to checkout! 👤", "info");
            closeCart();
            // Open the customer login portal
            const profileTrigger = document.getElementById("profile-trigger");
            if (profileTrigger) profileTrigger.click();
            return;
        }
        closeCart();
        openCheckoutWizard();
    });
}

function openCartSidebar() {
    document.getElementById("cart-sidebar").classList.add("active");
    document.getElementById("cart-overlay").classList.add("active");
}

function addToCart(productId, quantity = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    // Check if standard product already exists in cart
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            meta: product.yarn,
            quantity: quantity,
            isCustom: false
        });
    }

    updateCartUI();
    openCartSidebar();
    showToast(`${product.title} added to basket! 🧶`, "success");
}

function removeFromCart(itemId) {
    const item = cart.find(i => i.id === itemId);
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
    if (item) showToast(`Removed ${item.title} from basket.`, "info");
}

function updateCartUI() {
    const container = document.getElementById("cart-items-container");
    const badge = document.getElementById("cart-badge");
    const footer = document.getElementById("cart-footer");
    
    // Clear dynamic list
    container.innerHTML = "";

    // Quantity calculations
    let totalItems = 0;
    let subtotal = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        subtotal += item.price * item.quantity;
    });

    badge.textContent = totalItems;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart-state" id="empty-cart-state">
                <div class="empty-cart-icon">🧶</div>
                <p class="empty-cart-message">Your basket is currently empty.</p>
                <a href="#shop" class="btn primary-btn fill-btn close-cart-link">Browse Shop</a>
            </div>
        `;
        footer.style.display = "none";
        
        // Wire up browse shop button in cart
        const link = container.querySelector(".close-cart-link");
        link.addEventListener("click", () => {
            document.getElementById("cart-sidebar").classList.remove("active");
            document.getElementById("cart-overlay").classList.remove("active");
        });
        return;
    }

    // Render Cart Items
    cart.forEach(item => {
        const itemRow = document.createElement("div");
        itemRow.className = "cart-item";
        
        // Dynamic decorative customizer visual representation or item icon
        let itemIcon = '🧶';
        let gradientBg = 'background-color: var(--color-bg-alt)';
        let visual = null;
        
        if (item.isCustom) {
            itemIcon = item.base === 'octopus' ? '🐙' : item.base === 'beanie' ? '👒' : '🐝';
            gradientBg = `background: linear-gradient(135deg, ${item.primaryHex} 0%, ${item.secondaryHex} 100%)`;
        } else {
            const product = PRODUCTS.find(p => p.id === item.id);
            if (product) {
                visual = getProductVisual(product);
                itemIcon = visual.emoji;
                gradientBg = visual.gradientStyle;
            } else {
                itemIcon = item.id === 'p1' ? '🐝' : item.id === 'p2' ? '🐙' : item.id === 'p3' ? '🧥' : item.id === 'p4' ? '👜' : item.id === 'p5' ? '🛏️' : '👒';
                gradientBg = `background: linear-gradient(135deg, ${YARN_COLORS[item.id.charCodeAt(1) % YARN_COLORS.length].value} 0%, var(--color-bg-alt) 100%)`;
            }
        }

        itemRow.innerHTML = `
            <div class="cart-item-img-container" style="${gradientBg}; display: flex; align-items: center; justify-content: center;">
                ${visual && visual.isRealImage ? `<img src="${visual.imageSrc}" alt="${item.title}" style="width: 80%; height: 80%; object-fit: contain; border-radius: var(--radius-sm);">` : `<span style="font-size: 2.2rem;">${itemIcon}</span>`}
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.title}</h4>
                <span class="cart-item-meta">${item.meta}</span>
                <span class="cart-item-price">₹${Math.round(item.price)} &times; ${item.quantity}</span>
            </div>
            <button class="cart-item-remove-btn" data-id="${item.id}" aria-label="Remove item">&times;</button>
        `;

        itemRow.querySelector(".cart-item-remove-btn").addEventListener("click", () => {
            removeFromCart(item.id);
        });

        container.appendChild(itemRow);
    });

    // Calculations
    const shipping = subtotal >= 2999 || subtotal === 0 ? 0 : 199;
    const grandTotal = subtotal + shipping;

    document.getElementById("cart-subtotal").textContent = `₹${Math.round(subtotal)}`;
    document.getElementById("cart-shipping").textContent = shipping === 0 ? "Free" : `₹${Math.round(shipping)}`;
    document.getElementById("cart-total").textContent = `₹${Math.round(grandTotal)}`;
    
    footer.style.display = "block";
}

/* ==========================================================================
   Checkout Wizard System
   ========================================================================== */
function openCheckoutWizard() {
    const overlay = document.getElementById("checkout-modal-overlay");
    const modal = document.getElementById("checkout-modal");
    
    // Set final amounts
    let subtotal = 0;
    cart.forEach(item => subtotal += item.price * item.quantity);
    const shipping = subtotal >= 2999 ? 0 : 199;
    const finalAmount = subtotal + shipping;

    document.getElementById("final-checkout-amount").textContent = Math.round(finalAmount);

    overlay.classList.add("active");

    // Reset steps
    document.querySelectorAll(".wizard-step").forEach(s => s.classList.remove("active"));
    document.getElementById("wizard-step-1").classList.add("active");

    // Form Navigation
    const closeBtn = document.getElementById("close-checkout-modal");
    const closeModal = () => {
        overlay.classList.remove("active");
    };
    closeBtn.addEventListener("click", closeModal);

    // Step 1 Submission
    const shipForm = document.getElementById("shipping-form");
    shipForm.onsubmit = (e) => {
        e.preventDefault();
        document.getElementById("wizard-step-1").classList.remove("active");
        document.getElementById("wizard-step-2").classList.add("active");
    };

    // Step 2 Back & Place Order
    document.getElementById("back-to-shipping-btn").onclick = () => {
        document.getElementById("wizard-step-2").classList.remove("active");
        document.getElementById("wizard-step-1").classList.add("active");
    };

    const payForm = document.getElementById("payment-form");
    payForm.onsubmit = (e) => {
        e.preventDefault();

        // Capture order details
        const firstName = document.getElementById("checkout-first-name").value;
        const lastName = document.getElementById("checkout-last-name").value;
        const email = document.getElementById("checkout-email").value;
        const phone = document.getElementById("checkout-phone") ? document.getElementById("checkout-phone").value : "";
        const address = document.getElementById("checkout-address").value;
        const city = document.getElementById("checkout-city").value;
        const zip = document.getElementById("checkout-zip").value;
        
        const orderId = "LL-" + Math.floor(1000 + Math.random() * 9000);
        
        const items = cart.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            meta: item.meta,
            isCustom: item.isCustom || false,
            base: item.base || null
        }));
        
        const newOrder = {
            id: orderId,
            customer: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                address: address,
                city: city,
                zip: zip
            },
            items: items,
            subtotal: subtotal,
            shipping: shipping,
            total: finalAmount,
            date: new Date().toISOString(),
            status: "Pending"
        };
        
        // 5. Save to Cloud Database (Supabase) if available, with offline localStorage fallback
        if (supabase) {
            try {
                // We use async/await inside an IIFE or non-blocking promise since payForm.onsubmit isn't async
                (async () => {
                    const { error } = await supabase.from("sodi_daara_orders").insert([newOrder]);
                    if (error) console.error("Supabase Order Insert Error:", error);
                    else console.log("Order saved securely to Sodi Daara Cloud!");
                })();
            } catch (err) {
                console.warn("Sodi Daara Cloud Save Fallback:", err);
            }
        }
        
        const storedOrders = localStorage.getItem("sodi_daara_orders");
        let ordersList = storedOrders ? JSON.parse(storedOrders) : [];
        ordersList.push(newOrder);
        localStorage.setItem("sodi_daara_orders", JSON.stringify(ordersList));

        // Save order to this customer's device history
        let myOrders = JSON.parse(localStorage.getItem("sodi_daara_my_orders") || "[]");
        if (!myOrders.includes(orderId)) {
            myOrders.push(orderId);
            localStorage.setItem("sodi_daara_my_orders", JSON.stringify(myOrders));
        }

        // Display success email & order ID
        document.getElementById("success-email-display").textContent = email;
        document.getElementById("success-order-id").textContent = "#" + orderId;

        // Populate Simulated HTML Email Receipt Slider
        const emailRecipient = document.getElementById("email-recipient-name");
        if (emailRecipient) emailRecipient.textContent = firstName;
        const emailTotal = document.getElementById("email-total-amount");
        if (emailTotal) emailTotal.textContent = `₹${Math.round(finalAmount)}`;
        
        const emailItemsContainer = document.getElementById("email-invoice-items");
        if (emailItemsContainer) {
            emailItemsContainer.innerHTML = "";
            cart.forEach(item => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;">${item.quantity}x ${item.title}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #f0f0f0; text-align: right;">₹${Math.round(item.price * item.quantity)}</td>
                `;
                emailItemsContainer.appendChild(tr);
            });
            if (shipping > 0) {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td style="padding: 8px; border-bottom: 1px solid #f0f0f0; color: #888;">Standard Cozy Shipping</td>
                    <td style="padding: 8px; border-bottom: 1px solid #f0f0f0; text-align: right; color: #888;">₹${Math.round(shipping)}</td>
                `;
                emailItemsContainer.appendChild(tr);
            }
        }

        // Trigger Success Toast
        if (typeof showToast === 'function') {
            showToast("Order #" + orderId + " placed with love! 💖", "success");
        }

        // Bind live status tracking button on success screen
        document.getElementById("success-track-btn").onclick = () => {
            overlay.classList.remove("active");
            openOrderTrackingModal(orderId);
        };

        // Reset forms & clear cart
        shipForm.reset();
        payForm.reset();
        cart = [];
        updateCartUI();

        document.getElementById("wizard-step-2").classList.remove("active");
        document.getElementById("wizard-step-3").classList.add("active");
    };

    // Step 3 Success Close
    document.getElementById("finish-checkout-btn").onclick = closeModal;
    document.getElementById("close-checkout-modal").onclick = closeModal;
}

/* ==========================================================================
   Custom Order Wizard Section
   ========================================================================== */
function initCustomOrderWizard() {
    const categorySel = document.getElementById("commission-category");
    const descInput = document.getElementById("commission-desc");
    const charCount = document.getElementById("char-count");
    const yarnSel = document.getElementById("commission-yarn");
    const form = document.getElementById("custom-commission-form");
    const card = document.querySelector(".custom-order-card");
    const successBox = document.getElementById("inquiry-success");

    // Live description character counter
    descInput.addEventListener("input", (e) => {
        const length = e.target.value.length;
        charCount.textContent = length;
        if (length > 400) {
            e.target.value = e.target.value.substring(0, 400);
            charCount.textContent = 400;
        }
    });

    // Step navigation triggers
    document.getElementById("comm-to-step-2").onclick = () => {
        if (!categorySel.value) {
            categorySel.reportValidity();
            return;
        }
        if (!descInput.value) {
            descInput.reportValidity();
            return;
        }
        
        transitionCommissionStep(1, 2);
    };

    document.getElementById("comm-back-to-step-1").onclick = () => {
        transitionCommissionStep(2, 1);
    };

    document.getElementById("comm-to-step-3").onclick = () => {
        calculateLiveEstimate();
        transitionCommissionStep(2, 3);
    };

    document.getElementById("comm-back-to-step-2").onclick = () => {
        transitionCommissionStep(3, 2);
    };

    // Submit inquiry
    form.onsubmit = (e) => {
        e.preventDefault();
        const currentUserStr = sessionStorage.getItem("sodi_daara_current_user");
        if (!currentUserStr) {
            showToast("Please sign in or create an account to submit your commission request! 👤", "info");
            // Open the customer login portal
            const profileTrigger = document.getElementById("profile-trigger");
            if (profileTrigger) profileTrigger.click();
            return;
        }
        const categoryVal = document.getElementById("commission-category").value;
        const descVal = document.getElementById("commission-desc").value;
        const sizeVal = document.querySelector("input[name='comm-size']:checked").value;
        const yarnVal = document.getElementById("commission-yarn").value;
        const nameVal = document.getElementById("comm-name").value;
        const emailVal = document.getElementById("comm-email").value;

        // 1. Estimate Calculation (Rupees)
        let baseCost = 0;
        if (categoryVal === "plushie") baseCost = 2499;
        else if (categoryVal === "apparel") baseCost = 5499;
        else if (categoryVal === "home") baseCost = 6499;
        else baseCost = 2999;

        let sizeMultiplier = 1.0;
        if (sizeVal === "small") sizeMultiplier = 0.85;
        else if (sizeVal === "large") sizeMultiplier = 1.6;

        let materialSurcharge = 0;
        if (yarnVal === "chenille") materialSurcharge = 599;
        else if (yarnVal === "organic") materialSurcharge = 399;
        else if (yarnVal === "merino") materialSurcharge = 1299;

        const totalEstimate = Math.round((baseCost * sizeMultiplier) + materialSurcharge);

        // 2. Compile Elegant Styled HTML Metadata for Sync
        const yarnDisplay = yarnVal === "chenille" ? "Fluffy Chenille" : 
                            yarnVal === "organic" ? "Organic Cotton" : 
                            yarnVal === "merino" ? "Merino Wool" : "Cozy Acrylic Blend";
        const metaHtml = `
            <div class="custom-specs" style="margin-top: 6px; font-size: 0.8rem; line-height: 1.4; color: var(--color-text-light);">
                <div><strong>Category:</strong> ${categoryVal.charAt(0).toUpperCase() + categoryVal.slice(1)}</div>
                <div><strong>Size:</strong> ${sizeVal.charAt(0).toUpperCase() + sizeVal.slice(1)}</div>
                <div><strong>Yarn Type:</strong> ${yarnDisplay}</div>
                <div style="margin-top: 4px; border-left: 2px solid var(--color-primary); padding-left: 6px; font-style: italic;">"${descVal.trim()}"</div>
            </div>
        `;

        // 3. Generate Tracking ID LL-C-XXXX
        const inquiryId = "LL-C-" + Math.floor(1000 + Math.random() * 9000);

        // 4. Assemble Database Order Object
        const newOrder = {
            id: inquiryId,
            customer: { 
                firstName: nameVal.split(" ")[0] || nameVal, 
                lastName: nameVal.split(" ").slice(1).join(" ") || "", 
                email: emailVal, 
                address: "Custom Commission Queue", 
                city: "Online Design Portal", 
                zip: "IN-CUST" 
            },
            items: [
                { id: "commission", title: "Bespoke Custom Commission", price: totalEstimate, quantity: 1, meta: metaHtml, isCustom: true }
            ],
            subtotal: totalEstimate,
            shipping: 0,
            total: totalEstimate,
            date: new Date().toISOString(),
            status: "Pending",
            history: [
                {
                    date: new Date().toISOString(),
                    status: "Pending",
                    note: "Your bespoke custom commission inquiry has been logged! Our head artisan will review your design, sketch reference, and yarn choice. 🧶"
                }
            ]
        };

        // 5. Save to Cloud Database (Supabase) if available, with offline localStorage fallback
        if (supabase) {
            try {
                (async () => {
                    const { error } = await supabase.from("sodi_daara_orders").insert([newOrder]);
                    if (error) console.error("Supabase Commission Insert Error:", error);
                    else console.log("Commission inquiry saved securely to Sodi Daara Cloud!");
                })();
            } catch (err) {
                console.warn("Sodi Daara Cloud Save Fallback:", err);
            }
        }

        // 6. Save to local storage database
        const storedOrders = localStorage.getItem("sodi_daara_orders");
        const orders = storedOrders ? JSON.parse(storedOrders) : [];
        orders.push(newOrder);
        localStorage.setItem("sodi_daara_orders", JSON.stringify(orders));

        // 7. Associate with Customer Profile tracking
        const myOrderIds = JSON.parse(localStorage.getItem("sodi_daara_my_orders") || "[]");
        myOrderIds.push(inquiryId);
        localStorage.setItem("sodi_daara_my_orders", JSON.stringify(myOrderIds));

        // Show cute success box & message
        document.getElementById("inquiry-email-display").textContent = emailVal;
        form.style.display = "none";
        successBox.style.display = "block";
        
        // Bind WhatsApp click handler for Sodi Daara spec sync
        const whatsappBtn = document.getElementById("whatsapp-inquiry-btn");
        if (whatsappBtn) {
            whatsappBtn.onclick = () => {
                const message = `🧶 *Sodi Daara Custom Commission Request* 🧶\n\n` +
                                `Hello! I just submitted a custom commission inquiry on your website.\n\n` +
                                `*Inquiry ID:* #${inquiryId}\n` +
                                `*Name:* ${nameVal}\n` +
                                `*Email:* ${emailVal}\n\n` +
                                `*--- SPECIFICATIONS ---*\n` +
                                `*Category:* ${categoryVal.toUpperCase()}\n` +
                                `*Size:* ${sizeVal.toUpperCase()}\n` +
                                `*Yarn Type:* ${yarnDisplay}\n` +
                                `*Estimated Price:* ₹${totalEstimate}\n\n` +
                                `*Design Description:* \n"${descVal.trim()}"\n\n` +
                                `Please review my request, and I can share further inspiration details here! 💖`;
                
                const encodedMsg = encodeURIComponent(message);
                const waUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMsg}`;
                window.open(waUrl, "_blank");
            };
        }

        // Show success toast
        showToast(`Commission inquiry logged! Tracking code: ${inquiryId} 💌`, "success");
    };

    // Restart inquiry wizard
    document.getElementById("restart-inquiry-btn").onclick = () => {
        form.reset();
        charCount.textContent = "0";
        successBox.style.display = "none";
        form.style.display = "block";
        transitionCommissionStep(3, 1);
    };
}

function transitionCommissionStep(fromStep, toStep) {
    document.getElementById(`commission-step-${fromStep}`).classList.remove("active");
    document.getElementById(`commission-step-${toStep}`).classList.add("active");

    // Progress Bar adjustments
    const bar = document.getElementById("commission-progress");
    const labels = document.querySelectorAll(".progress-step-labels .step-label");
    
    const percentage = toStep === 1 ? 33 : toStep === 2 ? 66 : 100;
    bar.style.width = `${percentage}%`;

    labels.forEach((label, idx) => {
        if (idx < toStep) {
            label.classList.add("active");
        } else {
            label.classList.remove("active");
        }
    });
}

function calculateLiveEstimate() {
    const category = document.getElementById("commission-category").value;
    const size = document.querySelector("input[name='comm-size']:checked").value;
    const yarn = document.getElementById("commission-yarn").value;

    let baseCost = 0;
    let sizeMultiplier = 1.0;
    let materialSurcharge = 0;

    // 1. Category Base
    if (category === "plushie") baseCost = 2499;
    else if (category === "apparel") baseCost = 5499;
    else if (category === "home") baseCost = 6499;
    else baseCost = 2999;

    // 2. Size Multiplier
    if (size === "small") sizeMultiplier = 0.85;
    else if (size === "large") sizeMultiplier = 1.6;

    // 3. Yarn Texture Surcharge
    if (yarn === "chenille") materialSurcharge = 599;
    else if (yarn === "organic") materialSurcharge = 399;
    else if (yarn === "merino") materialSurcharge = 1299;

    // Calculate details
    const sizeAdjustCost = Math.round((baseCost * sizeMultiplier) - baseCost);
    const totalEstimate = Math.round((baseCost * sizeMultiplier) + materialSurcharge);

    // Render pricing estimate breakdown
    document.getElementById("est-base-cost").textContent = `₹${baseCost}`;
    document.getElementById("est-size-cost").textContent = sizeAdjustCost >= 0 ? `+₹${sizeAdjustCost}` : `-₹${Math.abs(sizeAdjustCost)}`;
    document.getElementById("est-material-cost").textContent = materialSurcharge > 0 ? `+₹${materialSurcharge}` : "₹0";
    document.getElementById("est-total-cost").textContent = `₹${totalEstimate}`;
}

/* ==========================================================================
   Cozy Order Status Tracking System
   ========================================================================== */
function initOrderTracking() {
    // Seed some demo recent orders for the customer so they can test immediately
    if (!localStorage.getItem("sodi_daara_my_orders")) {
        localStorage.setItem("sodi_daara_my_orders", JSON.stringify(["LL-4829", "LL-9831"]));
    }

    const link = document.getElementById("track-order-link");
    const headerLink = document.getElementById("header-track-order-link");
    const overlay = document.getElementById("order-tracking-modal-overlay");
    const closeBtn = document.getElementById("close-tracking-modal-btn");
    const searchInput = document.getElementById("tracking-search-input");
    const searchBtn = document.getElementById("tracking-search-btn");

    if (!overlay) return;

    // Open Modal Clicks
    if (link) {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            openOrderTrackingModal();
        });
    }

    if (headerLink) {
        headerLink.addEventListener("click", (e) => {
            e.preventDefault();
            openOrderTrackingModal();
        });
    }

    // Close Modal Clicks
    const closeModal = () => {
        overlay.classList.remove("active");
        // Clear input and state
        searchInput.value = "";
        document.getElementById("tracking-results-area").style.display = "none";
        document.getElementById("tracking-error-msg").style.display = "none";
    };

    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
    });

    // Lookup Trigger
    searchBtn.addEventListener("click", () => {
        const value = searchInput.value;
        performOrderTrackingLookup(value);
    });

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            performOrderTrackingLookup(searchInput.value);
        }
    });
}

function openOrderTrackingModal(targetOrderId = "") {
    const overlay = document.getElementById("order-tracking-modal-overlay");
    const searchInput = document.getElementById("tracking-search-input");
    if (!overlay) return;

    overlay.classList.add("active");

    // Dynamic render of orders placed on this device
    renderRecentOrdersList();

    if (targetOrderId) {
        searchInput.value = targetOrderId;
        performOrderTrackingLookup(targetOrderId);
    }
}

function renderRecentOrdersList() {
    const section = document.getElementById("tracking-recent-orders-section");
    const listContainer = document.getElementById("tracking-recent-orders-list");
    if (!section || !listContainer) return;

    const myOrderIds = JSON.parse(localStorage.getItem("sodi_daara_my_orders") || "[]");
    if (myOrderIds.length === 0) {
        section.style.display = "none";
        return;
    }

    const storedOrders = localStorage.getItem("sodi_daara_orders");
    const orders = storedOrders ? JSON.parse(storedOrders) : [];

    // Filter and map to order details, sort by date descending
    const myOrders = orders.filter(o => myOrderIds.includes(o.id))
                           .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (myOrders.length === 0) {
        section.style.display = "none";
        return;
    }

    section.style.display = "block";
    listContainer.innerHTML = "";

    myOrders.forEach(order => {
        const item = document.createElement("div");
        item.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: var(--color-white); border: 1px solid var(--color-bg-alt); border-radius: var(--radius-sm); cursor: pointer; transition: var(--transition-smooth); box-shadow: var(--shadow-sm);";
        
        // Add subtle micro-animations for hover
        item.onmouseenter = () => {
            item.style.borderColor = "var(--color-primary)";
            item.style.transform = "translateX(2px)";
        };
        item.onmouseleave = () => {
            item.style.borderColor = "var(--color-bg-alt)";
            item.style.transform = "translateX(0)";
        };

        // Format Date
        const dateObj = new Date(order.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        // Status Badge Style
        let badgeColor = "background-color: var(--color-bg-alt); color: var(--color-text-light);";
        let badgeText = order.status;
        if (order.status === "Pending") {
            badgeColor = "background-color: rgba(214, 94, 66, 0.08); color: var(--color-primary); border: 1px solid rgba(214, 94, 66, 0.15);";
            badgeText = "📝 Pending";
        } else if (order.status === "Processing") {
            badgeColor = "background-color: rgba(232, 200, 96, 0.12); color: hsl(45, 75%, 35%); border: 1px solid rgba(232, 200, 96, 0.25);";
            badgeText = "🧶 Crafting";
        } else if (order.status === "Shipped") {
            badgeColor = "background-color: rgba(99, 124, 87, 0.08); color: var(--color-secondary); border: 1px solid rgba(99, 124, 87, 0.15);";
            badgeText = "📦 Shipped";
        } else if (order.status === "Completed") {
            badgeColor = "background-color: rgba(217, 163, 176, 0.15); color: hsl(340, 40%, 35%); border: 1px solid rgba(217, 163, 176, 0.3);";
            badgeText = "💖 Arrived";
        }

        item.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 2px; text-align: left;">
                <strong style="color: var(--color-primary); font-family: monospace; font-size: 0.95rem;">#${order.id}</strong>
                <span style="font-size: 0.75rem; color: var(--color-text-light);">${formattedDate} • ${order.items.length} item${order.items.length > 1 ? 's' : ''} • ₹${Math.round(order.total)}</span>
            </div>
            <div style="${badgeColor} padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 700; white-space: nowrap;">
                ${badgeText}
            </div>
        `;

        item.addEventListener("click", () => {
            const searchInput = document.getElementById("tracking-search-input");
            searchInput.value = order.id;
            performOrderTrackingLookup(order.id);
        });

        listContainer.appendChild(item);
    });
}

function performOrderTrackingLookup(inputVal) {
    const resultsArea = document.getElementById("tracking-results-area");
    const errorMsg = document.getElementById("tracking-error-msg");
    const progressFill = document.getElementById("tracking-progress-fill");
    const banner = document.getElementById("tracking-status-banner");
    const customerName = document.getElementById("tracking-customer-name");
    const itemsList = document.getElementById("tracking-items-list");
    const totalAmount = document.getElementById("tracking-total-amount");
    const auditTimeline = document.getElementById("tracking-audit-timeline");

    if (!inputVal) {
        resultsArea.style.display = "none";
        errorMsg.style.display = "block";
        errorMsg.textContent = "⚠️ Please enter an Order ID to search!";
        return;
    }

    const cleanInput = inputVal.toUpperCase().replace("#", "").replace("LL-", "").trim();
    const stored = localStorage.getItem("sodi_daara_orders");
    const orders = stored ? JSON.parse(stored) : [];

    const order = orders.find(o => o.id.replace("LL-", "") === cleanInput);

    if (order) {
        errorMsg.style.display = "none";
        resultsArea.style.display = "block";

        // Update receipt details
        customerName.textContent = `${order.customer.firstName} ${order.customer.lastName}`;
        totalAmount.textContent = `₹${Math.round(order.total)}`;

        // List items
        itemsList.innerHTML = "";
        order.items.forEach(item => {
            const row = document.createElement("div");
            row.style.cssText = "display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.85rem; border-bottom: 1px solid var(--color-bg-alt); padding-bottom: 6px;";
            let details = item.meta ? ` <span style="font-size: 0.75rem; color: var(--color-text-light);">(${item.meta})</span>` : "";
            row.innerHTML = `
                <span>${item.quantity}x ${item.title}${details}</span>
                <strong>₹${Math.round(item.price * item.quantity)}</strong>
            `;
            itemsList.appendChild(row);
        });

        // Dynamic Chronological Audit Logs
        if (auditTimeline) {
            auditTimeline.innerHTML = "";
            const history = order.history || [
                {
                    date: order.date,
                    status: "Pending",
                    note: "Your slow-craft order has been received by our workshop queue! 📝"
                }
            ];
            
            history.forEach((h, idx) => {
                const entry = document.createElement("div");
                entry.className = `audit-item ${idx === history.length - 1 ? 'active' : ''}`;
                
                const timeStr = new Date(h.date).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                
                entry.innerHTML = `
                    <div class="audit-marker"></div>
                    <div class="audit-item-box">
                        <div class="audit-item-header">
                            <span class="audit-item-status">${h.status}</span>
                            <span class="audit-item-date">${timeStr}</span>
                        </div>
                        <div class="audit-item-note">${h.note}</div>
                    </div>
                `;
                auditTimeline.appendChild(entry);
            });
        }

        // Hook up Print Invoice Button
        const printBtn = document.getElementById("print-invoice-btn");
        if (printBtn) {
            printBtn.onclick = () => {
                const printId = document.getElementById("print-order-id");
                const printDate = document.getElementById("print-order-date");
                const printName = document.getElementById("print-customer-name");
                const printEmail = document.getElementById("print-customer-email");
                const printAddress = document.getElementById("print-customer-address");
                const printItems = document.getElementById("print-invoice-items");
                const printTotal = document.getElementById("print-total-amount");
                
                if (printId) printId.textContent = "#" + order.id;
                if (printDate) printDate.textContent = new Date(order.date).toLocaleDateString();
                if (printName) printName.textContent = `${order.customer.firstName} ${order.customer.lastName}`;
                if (printEmail) printEmail.textContent = order.customer.email;
                if (printAddress) printAddress.textContent = `${order.customer.address}, ${order.customer.city}, ${order.customer.zip}`;
                
                if (printItems) {
                    printItems.innerHTML = "";
                    order.items.forEach(item => {
                        const tr = document.createElement("tr");
                        tr.style.borderBottom = "1px solid #eee";
                        tr.innerHTML = `
                            <td style="padding: 8px 0; text-align: left;">${item.quantity}x ${item.title} ${item.meta ? `(${item.meta})` : ''}</td>
                            <td style="padding: 8px 0; text-align: right;">₹${Math.round(item.price * item.quantity)}</td>
                        `;
                        printItems.appendChild(tr);
                    });
                }
                
                if (printTotal) printTotal.textContent = `₹${Math.round(order.total)}`;
                
                window.print();
            };
        }

        // Calculate progress percentage and active step indicators
        let progressPercent = 0;
        const steps = ["Pending", "Processing", "Shipped", "Completed"];
        const currentIdx = steps.indexOf(order.status);

        if (currentIdx !== -1) {
            progressPercent = (currentIdx / (steps.length - 1)) * 100;
        }

        progressFill.style.width = `${progressPercent}%`;

        // Update dots visual active states
        const dotPending = document.querySelector("#step-pending .step-icon-dot");
        const dotProcessing = document.querySelector("#step-processing .step-icon-dot");
        const dotShipped = document.querySelector("#step-shipped .step-icon-dot");
        const dotCompleted = document.querySelector("#step-completed .step-icon-dot");

        const labelPending = document.getElementById("step-pending");
        const labelProcessing = document.getElementById("step-processing");
        const labelShipped = document.getElementById("step-shipped");
        const labelCompleted = document.getElementById("step-completed");

        // Clear active styles
        [dotPending, dotProcessing, dotShipped, dotCompleted].forEach(dot => dot?.classList.remove("active"));
        [labelPending, labelProcessing, labelShipped, labelCompleted].forEach(label => label?.classList.remove("active"));

        // Set active states
        if (currentIdx >= 0) {
            dotPending?.classList.add("active");
            labelPending?.classList.add("active");
        }
        if (currentIdx >= 1) {
            dotProcessing?.classList.add("active");
            labelProcessing?.classList.add("active");
        }
        if (currentIdx >= 2) {
            dotShipped?.classList.add("active");
            labelShipped?.classList.add("active");
        }
        if (currentIdx >= 3) {
            dotCompleted?.classList.add("active");
            labelCompleted?.classList.add("active");
        }

        // Set status description text inside the banner
        let displayStatus = order.status;
        if (order.status === "Processing") displayStatus = "Knit / Crafting Process 🧶";
        else if (order.status === "Pending") displayStatus = "Pending Queue Review 📝";
        else if (order.status === "Shipped") displayStatus = "Shipped via Eco-Courier 📦";
        else if (order.status === "Completed") displayStatus = "Delivered to New Snuggle Home 💖";

        banner.textContent = `Status: ${displayStatus}`;
    } else {
        resultsArea.style.display = "none";
        errorMsg.style.display = "block";
        errorMsg.textContent = "⚠️ We couldn't find an order with that tracking ID. Please double check and try again!";
    }
}

/* ==========================================================================
   HSL Glassmorphic Toast Notification Utility
   ========================================================================== */
function showToast(message, type = "info") {
    const container = document.getElementById("cozy-toast-container");
    if (!container) return;
    
    const toast = document.createElement("div");
    toast.className = `cozy-toast toast-${type}`;
    
    let emoji = "✨";
    if (type === "success") emoji = "💖";
    else if (type === "error" || type === "warning") emoji = "⚠️";
    else if (type === "info") emoji = "🧶";
    
    toast.innerHTML = `
        <span class="toast-emoji">${emoji}</span>
        <span class="toast-message">${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Trigger entry transition
    setTimeout(() => {
        toast.classList.add("active");
    }, 50);
    
    // Auto remove after 4s
    setTimeout(() => {
        toast.classList.remove("active");
        toast.classList.add("fade-out");
        toast.addEventListener("transitionend", () => toast.remove());
    }, 4000);
}

/* ==========================================================================
   Customer Registration & Authentication Portal
   ========================================================================== */
function initCustomerPortal() {
    // Seed default customer inside sodi_daara_users database
    if (!localStorage.getItem("sodi_daara_users")) {
        const initialUsers = {
            "jane@gmail.com": {
                name: "Jane Doe",
                email: "jane@gmail.com",
                password: "cozy",
                address: "123 Cozy Lane",
                city: "Knit City",
                zip: "54321"
            }
        };
        localStorage.setItem("sodi_daara_users", JSON.stringify(initialUsers));
    }
    
    const trigger = document.getElementById("profile-trigger");
    const overlay = document.getElementById("customer-portal-modal-overlay");
    const closeBtn = document.getElementById("close-portal-modal-btn");
    
    const tabLoginBtn = document.getElementById("tab-login-btn");
    const tabRegisterBtn = document.getElementById("tab-register-btn");
    const loginForm = document.getElementById("portal-login-form");
    const registerForm = document.getElementById("portal-register-form");
    
    const authView = document.getElementById("portal-auth-view");
    const profileView = document.getElementById("portal-profile-view");
    const logoutBtn = document.getElementById("portal-logout-btn");
    
    if (!trigger || !overlay) return;
    
    // Open Portal click
    trigger.addEventListener("click", () => {
        overlay.classList.add("active");
        renderPortalView();
    });
    
    // Close Portal triggers
    const closeModal = () => {
        overlay.classList.remove("active");
    };
    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
    });
    
    // Tab switching Sign In / Create Account
    tabLoginBtn.addEventListener("click", () => {
        tabLoginBtn.classList.add("active");
        tabRegisterBtn.classList.remove("active");
        loginForm.style.display = "flex";
        registerForm.style.display = "none";
    });
    
    tabRegisterBtn.addEventListener("click", () => {
        tabRegisterBtn.classList.add("active");
        tabLoginBtn.classList.remove("active");
        registerForm.style.display = "flex";
        loginForm.style.display = "none";
    });
    
    // Customer Sign In execution
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value.trim().toLowerCase();
        const pass = document.getElementById("login-password").value.trim();
        
        const users = JSON.parse(localStorage.getItem("sodi_daara_users") || "{}");
        const user = users[email];
        
        if (user && user.password === pass) {
            sessionStorage.setItem("sodi_daara_current_user", JSON.stringify(user));
            showToast(`Welcome back, ${user.name}! 💖`, "success");
            loginForm.reset();
            renderPortalView();
            prefillCheckoutFields();
        } else {
            showToast("Invalid email or password! ⚠️", "error");
        }
    });
    
    let pendingUserToRegister = null;

    // OTP Modal Listeners
    const otpOverlay = document.getElementById("otp-modal-overlay");
    const otpInput = document.getElementById("otp-input");
    const cancelOtpBtn = document.getElementById("cancel-otp-btn");
    const confirmOtpBtn = document.getElementById("confirm-otp-btn");

    if (cancelOtpBtn && otpOverlay) {
        cancelOtpBtn.addEventListener("click", () => {
            otpOverlay.classList.remove("active");
            pendingUserToRegister = null;
        });
    }

    if (confirmOtpBtn && otpOverlay) {
        confirmOtpBtn.addEventListener("click", () => {
            const enteredOtp = otpInput.value.trim();
            if (enteredOtp === "1234") {
                if (!pendingUserToRegister) return;
                
                const users = JSON.parse(localStorage.getItem("sodi_daara_users") || "{}");
                users[pendingUserToRegister.email] = pendingUserToRegister;
                localStorage.setItem("sodi_daara_users", JSON.stringify(users));
                
                sessionStorage.setItem("sodi_daara_current_user", JSON.stringify(pendingUserToRegister));
                showToast("Verification successful! 💖 Welcome to Sodi Daara.", "success");
                
                registerForm.reset();
                renderPortalView();
                prefillCheckoutFields();
                
                otpOverlay.classList.remove("active");
                overlay.classList.remove("active"); // Close customer portal login panel
                pendingUserToRegister = null;
            } else {
                showToast("Invalid OTP verification code! Please enter the correct code. ⚠️", "error");
            }
        });
    }

    // Customer Registration execution
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("register-name").value.trim();
        const email = document.getElementById("register-email").value.trim().toLowerCase();
        const phone = document.getElementById("register-phone").value.trim();
        const address = document.getElementById("register-address").value.trim();
        const city = document.getElementById("register-city").value.trim();
        const zip = document.getElementById("register-zip").value.trim();
        const pass = document.getElementById("register-password").value.trim();
        
        // 1. Robust Email Validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            showToast("Please enter a valid email address! 📧", "error");
            return;
        }

        // 2. Mock / Fake Email Domain Prevention
        const fakeDomains = ["test.com", "fake.com", "mock.com", "example.com", "temp.com", "mailinator.com", "yopmail.com"];
        const domain = email.split("@")[1];
        if (fakeDomains.includes(domain)) {
            showToast("Temporary or mock email domains are not allowed! 📧", "error");
            return;
        }

        // 3. Indian Mobile Phone Validation (10-Digit starting with 6-9)
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            showToast("Please enter a valid 10-digit Indian mobile number (starting with 6-9)! 📱", "error");
            return;
        }
        
        const users = JSON.parse(localStorage.getItem("sodi_daara_users") || "{}");
        if (users[email]) {
            showToast("An account with this email already exists! ⚠️", "error");
            return;
        }
        
        // 4. Cache Pending User & Trigger OTP Modal
        pendingUserToRegister = { name, email, phone, password: pass, address, city, zip };
        
        if (otpOverlay && otpInput) {
            otpInput.value = "";
            otpOverlay.classList.add("active");
            showToast("Verification OTP sent to your contact details! (Code: 1234) 🔑", "info");
        }
    });
    
    // Sign Out execution
    logoutBtn.addEventListener("click", () => {
        sessionStorage.removeItem("sodi_daara_current_user");
        showToast("Logged out successfully. See you soon! 🧶", "info");
        renderPortalView();
        clearCheckoutFields();
    });
    
    function renderPortalView() {
        const currentUserStr = sessionStorage.getItem("sodi_daara_current_user");
        if (currentUserStr) {
            const user = JSON.parse(currentUserStr);
            authView.style.display = "none";
            profileView.style.display = "block";
            
            document.getElementById("profile-display-name").textContent = user.name;
            document.getElementById("profile-display-email").textContent = user.email;
            document.getElementById("profile-avatar-char").textContent = user.name.charAt(0).toUpperCase();
            
            renderPortalOrders(user.email);
        } else {
            authView.style.display = "block";
            profileView.style.display = "none";
            tabLoginBtn.click(); // Default to login tab
        }
    }
    
    function renderPortalOrders(email) {
        const ordersListContainer = document.getElementById("portal-orders-list");
        if (!ordersListContainer) return;
        
        ordersListContainer.innerHTML = "";
        
        const storedOrders = localStorage.getItem("sodi_daara_orders");
        const orders = storedOrders ? JSON.parse(storedOrders) : [];
        
        // Filter and map customer orders
        const customerOrders = orders.filter(o => o.customer.email.toLowerCase() === email.toLowerCase())
                                     .sort((a, b) => new Date(b.date) - new Date(a.date));
                                     
        if (customerOrders.length === 0) {
            ordersListContainer.innerHTML = `
                <div style="text-align: center; padding: 20px; color: var(--color-text-light); font-size: 0.85rem;">
                    No orders placed yet under this email. 🧶
                </div>
            `;
            return;
        }
        
        customerOrders.forEach(order => {
            const item = document.createElement("div");
            item.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 10px; background: var(--color-white); border: 1px solid var(--color-bg-alt); border-radius: var(--radius-sm); font-size: 0.8rem; box-shadow: var(--shadow-sm); transition: var(--transition-smooth);";
            
            // Subtle hover effect
            item.onmouseenter = () => { item.style.borderColor = "var(--color-primary)"; };
            item.onmouseleave = () => { item.style.borderColor = "var(--color-bg-alt)"; };
            
            let statusText = order.status;
            let badgeStyle = "background-color: var(--color-bg-alt); color: var(--color-text-light);";
            if (order.status === "Pending") badgeStyle = "background-color: rgba(214, 94, 66, 0.08); color: var(--color-primary);";
            else if (order.status === "Processing") badgeStyle = "background-color: rgba(232, 200, 96, 0.12); color: hsl(45, 75%, 35%);";
            else if (order.status === "Shipped") badgeStyle = "background-color: rgba(99, 124, 87, 0.08); color: var(--color-secondary);";
            else if (order.status === "Completed") badgeStyle = "background-color: rgba(217, 163, 176, 0.15); color: hsl(340, 40%, 35%);";
            
            item.innerHTML = `
                <div style="text-align: left; display: flex; flex-direction: column; gap: 2px;">
                    <strong style="color: var(--color-primary); font-family: monospace;">#${order.id}</strong>
                    <span style="font-size: 0.7rem; color: var(--color-text-light);">${new Date(order.date).toLocaleDateString()} • ₹${Math.round(order.total)}</span>
                </div>
                <div style="display: flex; gap: 8px; align-items: center;">
                    <span style="${badgeStyle} padding: 2px 8px; border-radius: var(--radius-full); font-weight: 700; font-size: 0.7rem;">${statusText}</span>
                    <button class="btn primary-btn" style="padding: 4px 8px; font-size: 0.7rem; border-radius: var(--radius-sm);" onclick="openPortalOrderTracking('${order.id}')">Track 🔍</button>
                </div>
            `;
            ordersListContainer.appendChild(item);
        });
    }
    
    // Auto-fill on first load
    prefillCheckoutFields();
}

window.openPortalOrderTracking = function(orderId) {
    document.getElementById("customer-portal-modal-overlay").classList.remove("active");
    openOrderTrackingModal(orderId);
};

function prefillCheckoutFields() {
    const currentUserStr = sessionStorage.getItem("sodi_daara_current_user");
    if (currentUserStr) {
        const user = JSON.parse(currentUserStr);
        const nameParts = user.name.split(" ");
        const first = nameParts[0] || "";
        const last = nameParts.slice(1).join(" ") || "";
        
        const fNameInput = document.getElementById("checkout-first-name");
        const lNameInput = document.getElementById("checkout-last-name");
        const emailInput = document.getElementById("checkout-email");
        const phoneInput = document.getElementById("checkout-phone");
        const addrInput = document.getElementById("checkout-address");
        const cityInput = document.getElementById("checkout-city");
        const zipInput = document.getElementById("checkout-zip");
        
        const commNameInput = document.getElementById("comm-name");
        const commEmailInput = document.getElementById("comm-email");
        
        if (fNameInput) fNameInput.value = first;
        if (lNameInput) lNameInput.value = last;
        if (emailInput) emailInput.value = user.email;
        if (phoneInput) phoneInput.value = user.phone || "";
        if (addrInput) addrInput.value = user.address;
        if (cityInput) cityInput.value = user.city;
        if (zipInput) zipInput.value = user.zip;
        
        if (commNameInput) commNameInput.value = user.name;
        if (commEmailInput) commEmailInput.value = user.email;
    }
}

function clearCheckoutFields() {
    const fNameInput = document.getElementById("checkout-first-name");
    const lNameInput = document.getElementById("checkout-last-name");
    const emailInput = document.getElementById("checkout-email");
    const phoneInput = document.getElementById("checkout-phone");
    const addrInput = document.getElementById("checkout-address");
    const cityInput = document.getElementById("checkout-city");
    const zipInput = document.getElementById("checkout-zip");
    
    const commNameInput = document.getElementById("comm-name");
    const commEmailInput = document.getElementById("comm-email");
    
    if (fNameInput) fNameInput.value = "";
    if (lNameInput) lNameInput.value = "";
    if (emailInput) emailInput.value = "";
    if (phoneInput) phoneInput.value = "";
    if (addrInput) addrInput.value = "";
    if (cityInput) cityInput.value = "";
    if (zipInput) zipInput.value = "";
    
    if (commNameInput) commNameInput.value = "";
    if (commEmailInput) commEmailInput.value = "";
}

/* ==========================================================================
   Loop Assistant Chatbot Widget (FAQ & Real-Time Tracking Logs)
   ========================================================================== */
function initLoopAssistantChatbot() {
    const bubble = document.getElementById("loop-assistant-bubble");
    const windowEl = document.getElementById("loop-assistant-window");
    const closeBtn = document.getElementById("loop-assistant-close-btn");
    const messagesContainer = document.getElementById("loop-assistant-messages");
    const inputField = document.getElementById("loop-assistant-input-field");
    const sendBtn = document.getElementById("loop-assistant-send-btn");
    const repliesContainer = document.getElementById("loop-assistant-replies");
    const notifDot = document.getElementById("loop-assistant-notif");
    
    if (!bubble || !windowEl) return;
    
    // Toggle active state
    bubble.addEventListener("click", () => {
        windowEl.classList.toggle("active");
        if (notifDot) notifDot.style.display = "none";
        scrollToBottom();
    });
    
    closeBtn.addEventListener("click", () => {
        windowEl.classList.remove("active");
    });
    
    sendBtn.addEventListener("click", () => {
        handleUserInput();
    });
    
    inputField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handleUserInput();
        }
    });
    
    repliesContainer.addEventListener("click", (e) => {
        const btn = e.target.closest(".quick-reply-btn");
        if (!btn) return;
        
        const replyType = btn.getAttribute("data-reply");
        let text = btn.textContent;
        appendMessage(text, "user");
        
        setTimeout(() => {
            let botText = "";
            if (replyType === "track") {
                botText = "Sure! 🔍 Please enter your Order ID (for example, type **LL-4829**) and I will fetch its real-time crafting status for you.";
            } else if (replyType === "clean") {
                botText = "Slow-fashion crochet loves gentle care! 🧼\\n\\n1. **Plushies:** Spot clean with cold water and mild baby soap. Never wring!\\n2. **Cardigans:** Hand wash cold, roll in a clean dry towel to squeeze excess water, then dry flat.\\n3. **Do not machine dry** or hang dry while heavy, or they might lose their beautiful shape! 💖";
            } else if (replyType === "custom") {
                botText = "Designing your dream plushie or beanie is simple! 🎨\\n\\n1. Go to the **Design Lab Customizer** section.\\n2. Pick your base amigurumi item, wool texture, and custom colors.\\n3. Click 'Add Custom Design to Basket' and check out.\\n\\nOur local artisans will receive your exact hex pattern and knit it loop-by-loop within 3-5 days! 🧶";
            }
            appendMessage(botText, "assistant");
        }, 600);
    });
    
    function handleUserInput() {
        const val = inputField.value.trim();
        if (!val) return;
        
        appendMessage(val, "user");
        inputField.value = "";
        
        setTimeout(() => {
            let reply = getBotReply(val);
            appendMessage(reply, "assistant");
        }, 650);
    }
    
    function appendMessage(text, sender) {
        const bubble = document.createElement("div");
        bubble.className = `chat-bubble ${sender}`;
        
        let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                       .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="chat-link" style="color: var(--color-primary); font-weight: 700; text-decoration: underline;">$1</a>');
        
        bubble.innerHTML = html.replace(/\\n/g, "<br>").replace(/\n/g, "<br>");
        messagesContainer.appendChild(bubble);
        scrollToBottom();
    }
    
    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function getBotReply(input) {
        const query = input.toLowerCase();
        const orderMatch = query.match(/ll-\d{4}/i);
        
        if (orderMatch) {
            const orderId = orderMatch[0].toUpperCase();
            const stored = localStorage.getItem("sodi_daara_orders");
            const orders = stored ? JSON.parse(stored) : [];
            const order = orders.find(o => o.id === orderId);
            
            if (order) {
                let statusDetails = "";
                if (order.status === "Pending") statusDetails = "Pending Queue Review 📝";
                else if (order.status === "Processing") statusDetails = "Knit / Crafting Process 🧶";
                else if (order.status === "Shipped") statusDetails = "Shipped via Eco-Courier 📦";
                else if (order.status === "Completed") statusDetails = "Delivered to Snuggle Home 💖";
                
                return `Found it! 📦 Order **#${order.id}** is currently **${order.status}**.\\n\\n*Artisan Status:* ${statusDetails}\\n*Items:* ${order.items.map(i => `${i.quantity}x ${i.title}`).join(', ')}\\n\\n[Click here to track in detail](javascript:openOrderTrackingModal('${order.id}'))`;
            } else {
                return `I couldn't find that Order ID (**${orderId}**) in our database. 😿 Please double-check the code on your receipt and try again!`;
            }
        }
        
        if (query.includes("clean") || query.includes("wash") || query.includes("dry") || query.includes("laundry") || query.includes("care")) {
            return "Slow-fashion crochet loves gentle care! 🧼\\n\\n1. **Plushies:** Spot clean with cold water and mild baby soap. Never wring!\\n2. **Cardigans:** Hand wash cold, roll in a clean dry towel to squeeze excess water, then dry flat.\\n3. **Do not machine dry** or hang dry while heavy, or they might lose their beautiful shape! 💖";
        }
        
        if (query.includes("custom") || query.includes("yarn") || query.includes("design") || query.includes("commission") || query.includes("wizard")) {
            return "Designing your dream plushie or beanie is simple! 🎨\\n\\n1. Go to the **Design Lab Customizer** section.\\n2. Pick your base amigurumi item, wool texture, and custom colors.\\n3. Click 'Add Custom Design to Basket' and check out.\\n\\nOur local artisans will receive your exact hex pattern and knit it loop-by-loop within 3-5 days! 🧶";
        }
        
        if (query.includes("track") || query.includes("order") || query.includes("status")) {
            return "Sure thing! 📦 Please provide your 4-digit order ID starting with 'LL-' (like **LL-4829**) and I'll find it right away.";
        }
        
        return "Aww, how cozy! 🧶 I'm Loop Care, a small AI assistant. If you have questions about crochet clean care tips, slow-fashion commissions, or tracking your order, let me know! You can also check our FAQ accordion or send a custom inquiry in the story section!";
    }
}
