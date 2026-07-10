/* -----------------------------------------
   Real Estate Agency - Interactive JS Logic
   Theme: Luxury Navy, White, and Gold Accents
----------------------------------------- */

// --- Properties Database ---
const propertiesData = [
    {
        id: 1,
        title: "The Grand Horizon Penthouse",
        location: "Downtown Skyline Area",
        price: "$2,450,000",
        type: "buy",
        bhk: 4,
        area: "4,200 sq ft",
        image: "assets/images/prop1.png",
        featured: true
    },
    {
        id: 2,
        title: "Modernist Suburban Retreat",
        location: "Green Hills Suburbs",
        price: "$850,000",
        type: "buy",
        bhk: 3,
        area: "2,800 sq ft",
        image: "assets/images/prop2.png",
        featured: true
    },
    {
        id: 3,
        title: "Azure Bay Oceanfront Villa",
        location: "Malibu Coastline",
        price: "$12,500 / mo",
        type: "rent",
        bhk: 5,
        area: "5,500 sq ft",
        image: "assets/images/prop3.png",
        featured: true
    },
    {
        id: 4,
        title: "Whispering Pines Wood Cabin",
        location: "Aspen Forest Ridge",
        price: "$4,500 / mo",
        type: "rent",
        bhk: 2,
        area: "1,800 sq ft",
        image: "assets/images/prop4.png",
        featured: false
    },
    {
        id: 5,
        title: "The Brickworks Office Loft",
        location: "SOHO Commercial District",
        price: "$1,850,000",
        type: "commercial",
        bhk: 6,
        area: "3,400 sq ft",
        image: "assets/images/prop5.png",
        featured: false
    },
    {
        id: 6,
        title: "The Heritage Manor Estate",
        location: "Beverly Hills",
        price: "$5,900,000",
        type: "buy",
        bhk: 5,
        area: "6,700 sq ft",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        featured: true
    }
];

// --- Testimonials Database ---
const testimonialsData = [
    {
        quote: "Working with this agency was an absolute dream. They helped us list our old property and secure a premium penthouse in the city center. Their attention to detail and golden standards of customer service are unmatched.",
        authorName: "Sarah & Robert Jenkins",
        authorTitle: "Penthouse Owners",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
        rating: 5
    },
    {
        quote: "The rental process was smooth, professional, and entirely stress-free. Finding a beachfront villa that accommodated all our needs seemed impossible until our agent stepped in. Highly recommended for elite rentals!",
        authorName: "David K. Harrison",
        authorTitle: "Oceanfront Villa Tenant",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
        rating: 5
    },
    {
        quote: "We needed a spacious corporate commercial loft in SOHO under tight constraints. The agents presented curated, off-market options that exceeded our expectations. The transition was flawless.",
        authorName: "Clara Vance",
        authorTitle: "Vance Design Studio CEO",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80",
        rating: 5
    }
];

// --- Main App Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    // Dom Elements
    const propertiesGrid = document.getElementById("properties-grid");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const searchForm = document.getElementById("hero-search-form");
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const menuOverlay = document.querySelector(".menu-overlay");
    const navbar = document.querySelector(".navbar");
    const inquiryForm = document.getElementById("inquiry-form");
    const formStatus = document.getElementById("form-status");
    const themeToggle = document.getElementById("theme-toggle");
    const themeToggleIcon = document.getElementById("theme-toggle-icon");

    // --- Active Link Highlight based on current URL ---
    const currentPath = window.location.pathname.split("/").pop();
    const isHome = currentPath === "" || currentPath === "index.html" || !currentPath;
    document.querySelectorAll(".nav-link").forEach(link => {
        const href = link.getAttribute("href");
        if ((isHome && href === "index.html") || href === currentPath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Helper search function for local filtering
    function filterAndRenderProperties(locationVal, typeVal) {
        const query = locationVal.toLowerCase().trim();
        const filtered = propertiesData.filter(prop => {
            const matchesLocation = prop.location.toLowerCase().includes(query) || 
                                    prop.title.toLowerCase().includes(query);
            const matchesType = (typeVal === "all") || (prop.type === typeVal);
            return matchesLocation && matchesType;
        });

        renderProperties(filtered);

        // Update form values to match search params
        const locationInput = document.getElementById("search-location");
        const typeSelect = document.getElementById("search-type");
        if (locationInput) locationInput.value = locationVal;
        if (typeSelect) typeSelect.value = typeVal;

        // Update filter tabs active state to match searched type
        const filterBtns = document.querySelectorAll(".filter-btn");
        if (filterBtns.length > 0) {
            filterBtns.forEach(btn => {
                if (btn.getAttribute("data-filter") === typeVal) {
                    btn.classList.add("active");
                } else {
                    btn.classList.remove("active");
                }
            });
        }

        // Scroll to properties section
        const propertiesSec = document.getElementById("properties");
        if (propertiesSec) {
            propertiesSec.scrollIntoView({ behavior: "smooth" });
        }
    }

    // Initialize UI
    if (currentPath === "properties.html") {
        // Parse URL params for pre-applied search filters
        const urlParams = new URLSearchParams(window.location.search);
        const locationParam = urlParams.get("location") || "";
        const typeParam = urlParams.get("type") || "all";
        
        if (locationParam || typeParam !== "all") {
            filterAndRenderProperties(locationParam, typeParam);
        } else {
            renderProperties(propertiesData);
        }
    } else {
        renderProperties(propertiesData);
    }

    if (currentPath === "contact.html") {
        // Parse URL params for property query
        const urlParams = new URLSearchParams(window.location.search);
        const propertyParam = urlParams.get("property") || "";
        if (propertyParam) {
            const clientMsg = document.getElementById("client-message");
            if (clientMsg) {
                clientMsg.value = `Hello, I am interested in inquiring about the property: "${propertyParam}". Please provide more details.`;
            }
            const inquirySubject = document.getElementById("inquiry-subject");
            if (inquirySubject) {
                inquirySubject.value = "Schedule a Tour";
            }
        }

        // Parse URL params for agent query
        const agentParam = urlParams.get("agent") || "";
        if (agentParam) {
            const preferredAgent = document.getElementById("preferred-agent");
            if (preferredAgent) {
                preferredAgent.value = agentParam;
            }
        }
    }

    initTestimonialSlider();
    initScrollReveal();

    // --- Theme Toggle Logic ---
    const updateThemeIcon = (theme) => {
        if (theme === "dark") {
            themeToggleIcon.className = "fas fa-sun";
        } else {
            themeToggleIcon.className = "fas fa-moon";
        }
    };

    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    if (themeToggleIcon) {
        updateThemeIcon(savedTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            updateThemeIcon(newTheme);
        });
    }

    // --- Header & Scroll Events ---
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // --- Mobile Drawer Toggle ---
    const toggleMobileMenu = () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        menuOverlay.classList.toggle("active");
        
        // Prevent body scrolling when menu is open
        if (navMenu.classList.contains("active")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    };

    hamburger.addEventListener("click", toggleMobileMenu);
    menuOverlay.addEventListener("click", toggleMobileMenu);

    // Close menu when clicking nav links
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", (e) => {
            // Remove active classes
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            menuOverlay.classList.remove("active");
            document.body.style.overflow = "";
            
            // Set active link highlight
            document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });

    // --- Property Filtering (Buy / Rent / Commercial) ---
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Toggle active state
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");
            
            // Filter and render
            if (filterValue === "all") {
                renderProperties(propertiesData);
            } else {
                const filtered = propertiesData.filter(prop => prop.type === filterValue);
                renderProperties(filtered);
            }
        });
    });

    // --- Search functionality (Location & Dropdown) ---
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const locationVal = document.getElementById("search-location").value.trim();
            const typeVal = document.getElementById("search-type").value; // 'all', 'buy', 'rent', 'commercial'

            const currentPathName = window.location.pathname.split("/").pop();
            const isPropertiesPage = currentPathName === "properties.html";

            if (!isPropertiesPage) {
                // Redirect to properties.html with search parameters
                window.location.href = `properties.html?location=${encodeURIComponent(locationVal)}&type=${encodeURIComponent(typeVal)}`;
                return;
            }

            // Local filtering on properties.html
            filterAndRenderProperties(locationVal, typeVal);
        });
    }

    // --- Inquiry Form Submission & SMTP Simulator ---
    if (inquiryForm) {
        inquiryForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Clear previous states
            formStatus.className = "form-status";
            formStatus.style.display = "none";

            const name = document.getElementById("client-name").value.trim();
            const email = document.getElementById("client-email").value.trim();
            const phone = document.getElementById("client-phone").value.trim();
            const subject = document.getElementById("inquiry-subject").value;
            const message = document.getElementById("client-message").value.trim();

            // Basic Validation
            if (!name || !email || !message) {
                showFormStatus("Please fill in all required fields (*).", "error");
                return;
            }

            if (!validateEmail(email)) {
                showFormStatus("Please enter a valid email address.", "error");
                return;
            }

            // Show simulated loading on submit button
            const submitBtn = inquiryForm.querySelector(".contact-btn");
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Inquiry...';

            // Simulate Email Sending via SMTP Service (1.5s delay)
            setTimeout(() => {
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                // Log the developer-friendly integration details
                console.log(`%c[Google SMTP / EmailJS Integration Info]`, "color: #D4AF37; font-weight: bold; font-size: 14px;");
                console.log(
                    "To send this inquiry data directly to your Gmail/Google SMTP inbox securely, follow these options:\n\n" +
                    "Option A: EmailJS (Recommended for Client-Side)\n" +
                    "1. Sign up on emailjs.com and link your Google Account (SMTP server).\n" +
                    "2. Create an Email Template with placeholders like {{name}}, {{email}}, {{phone}}, {{subject}}, {{message}}.\n" +
                    "3. Add the EmailJS CDN script to index.html:\n" +
                    "   <script src='https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'></script>\n" +
                    "4. Initialize: emailjs.init('YOUR_PUBLIC_KEY');\n" +
                    "5. Replace this simulator code with:\n" +
                    "   emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', '#inquiry-form')\n" +
                    "     .then(() => alert('Sent!'), (err) => alert('Failed: ' + err));\n\n" +
                    "Option B: Server-Side Node.js / Nodemailer\n" +
                    "Set up a small Express API endpoint using 'nodemailer' package, authenticating with Gmail App Passwords (SMTP), and fetch it here."
                );

                // Show Success Message
                showFormStatus("Thank you! Your inquiry has been sent successfully. An agent will contact you shortly.", "success");
                inquiryForm.reset();
            }, 1500);
        });
    }

    // Helper functions
    function showFormStatus(text, type) {
        formStatus.textContent = text;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = "block";
        formStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});

// --- Dynamic Render Functions ---
function renderProperties(properties) {
    const grid = document.getElementById("properties-grid");
    if (!grid) return;

    if (properties.length === 0) {
        grid.innerHTML = `
            <div class="no-properties" style="grid-column: 1 / -1; padding: 50px 20px; text-align: center; background: white; border-radius: 8px; border: 1px dashed var(--color-gray-border);">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--color-gold); margin-bottom: 15px; display: block;"></i>
                <h3 style="margin-bottom: 10px;">No Properties Found</h3>
                <p style="color: var(--color-text-muted);">We couldn't find any listings matching your search criteria. Try modifying your keywords or filters.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = properties.map(prop => {
        let typeBadgeClass = "buy";
        let typeText = "For Sale";
        if (prop.type === "rent") {
            typeBadgeClass = "rent";
            typeText = "For Rent";
        } else if (prop.type === "commercial") {
            typeBadgeClass = "commercial";
            typeText = "Commercial";
        }

        return `
            <div class="property-card reveal">
                <div class="property-img-wrapper">
                    ${prop.featured ? `<div class="badge-featured"><i class="fas fa-star" style="color: var(--color-gold); margin-right: 4px;"></i> Premium</div>` : ""}
                    <div class="badge-status ${typeBadgeClass}">${typeText}</div>
                    <img src="${prop.image}" alt="${prop.title}" class="property-img" loading="lazy">
                </div>
                <div class="property-info">
                    <div class="property-price"><span>${prop.price.split(' ')[0]}</span> ${prop.price.split(' ').slice(1).join(' ')}</div>
                    <h3 class="property-title"><a href="contact.html?property=${encodeURIComponent(prop.title)}">${prop.title}</a></h3>
                    <div class="property-location">
                        <i class="fas fa-map-marker-alt"></i> ${prop.location}
                    </div>
                    <div class="property-specs">
                        <div class="spec-item">
                            <i class="fas fa-bed"></i> ${prop.bhk} BHK
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-ruler-combined"></i> ${prop.area}
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-shield-alt"></i> Verified
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Trigger scroll reveal on newly rendered items
    initScrollReveal();
}

// --- Testimonials Slider Logic ---
function initTestimonialSlider() {
    const sliderWrapper = document.getElementById("testimonials-wrapper");
    const prevBtn = document.querySelector(".slider-btn-prev");
    const nextBtn = document.querySelector(".slider-btn-next");
    const dotsContainer = document.querySelector(".slider-dots");
    
    if (!sliderWrapper) return;

    // Render Testimonials
    sliderWrapper.innerHTML = testimonialsData.map((test, index) => {
        // Build star rating HTML
        let starsHtml = "";
        for (let i = 0; i < 5; i++) {
            starsHtml += `<i class="${i < test.rating ? 'fas' : 'far'} fa-star"></i>`;
        }

        return `
            <div class="testimonial-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                <p class="testimonial-quote">${test.quote}</p>
                <div class="testimonial-rating">
                    ${starsHtml}
                </div>
                <div class="testimonial-author">
                    <img src="${test.avatar}" alt="${test.authorName}" class="author-avatar" loading="lazy">
                    <div>
                        <h4 class="author-name">${test.authorName}</h4>
                        <p class="author-title">${test.authorTitle}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Render Dots
    dotsContainer.innerHTML = testimonialsData.map((_, index) => {
        return `<div class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>`;
    }).join('');

    const slides = document.querySelectorAll(".testimonial-slide");
    const dots = document.querySelectorAll(".dot");
    let currentSlide = 0;
    let sliderTimer = null;

    function goToSlide(index) {
        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");
        
        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Auto rotate every 6 seconds
    function startAutoSlide() {
        stopAutoSlide();
        sliderTimer = setInterval(nextSlide, 6000);
    }

    function stopAutoSlide() {
        if (sliderTimer) clearInterval(sliderTimer);
    }

    // Button Click Handlers
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            nextSlide();
            startAutoSlide();
        });
    }
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            prevSlide();
            startAutoSlide();
        });
    }

    // Dot Navigation
    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const index = parseInt(dot.getAttribute("data-index"));
            goToSlide(index);
            startAutoSlide();
        });
    });

    // Start
    startAutoSlide();
}

// --- Scroll Reveal Animations ---
function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal");
    
    // Check if browser supports IntersectionObserver
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    // Unobserve after animating once
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of element is visible
            rootMargin: "0px 0px -50px 0px" // Trigger slightly before screen bottom
        });

        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add("active"));
    }
}
