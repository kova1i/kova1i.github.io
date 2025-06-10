// Virtual Exhibition Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initNavigation();
    initInteractiveElements();
    initMedicalCase();
    initEthicsSection();
    initScrollAnimations();
    initMobileMenu();
    initCardAnimations();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state
                updateActiveNavLink(this);
            }
        });
    });
    
    // Update active navigation on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        if (current) {
            const currentLink = document.querySelector(`.nav-link[href="#${current}"]`);
            if (currentLink) {
                updateActiveNavLink(currentLink);
            }
        }
    });
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', function() {
            navList.classList.toggle('active');
            
            // Animate mobile menu button
            const spans = this.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transform = navList.classList.contains('active') 
                    ? `rotate(${index === 1 ? 45 : index === 2 ? -45 : 0}deg)` 
                    : 'rotate(0deg)';
            });
        });
        
        // Close mobile menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'rotate(0deg)';
                });
            });
        });
    }
}

// Interactive elements for thematic zones
function initInteractiveElements() {
    initDiagnosticsInteractive();
    initPersonalizedInteractive();
    initRegenerativeInteractive();
}

// Diagnostics interactive functionality
function initDiagnosticsInteractive() {
    const stages = document.querySelectorAll('#diagnostics-interactive .stage');
    const stageInfos = document.querySelectorAll('#diagnostics-interactive .stage-info');
    
    if (stages.length > 0 && stageInfos.length > 0) {
        // Show first stage by default
        stages[0].classList.add('active');
        stageInfos[0].classList.add('active');
        
        stages.forEach((stage, index) => {
            stage.addEventListener('click', function() {
                // Remove active class from all stages and infos
                stages.forEach(s => s.classList.remove('active'));
                stageInfos.forEach(info => info.classList.remove('active'));
                
                // Add active class to clicked stage and corresponding info
                this.classList.add('active');
                const correspondingInfo = document.querySelector(`[data-info="${this.dataset.stage}"]`);
                if (correspondingInfo) {
                    correspondingInfo.classList.add('active');
                }
            });
        });
    }
}

// Personalized medicine interactive functionality
function initPersonalizedInteractive() {
    const factors = document.querySelectorAll('#personalized-interactive .factor');
    const factorInfos = document.querySelectorAll('#personalized-interactive .factor-info');
    
    if (factors.length > 0 && factorInfos.length > 0) {
        // Show first factor by default
        factors[0].classList.add('active');
        factorInfos[0].classList.add('active');
        
        factors.forEach((factor, index) => {
            factor.addEventListener('click', function() {
                // Remove active class from all factors and infos
                factors.forEach(f => f.classList.remove('active'));
                factorInfos.forEach(info => info.classList.remove('active'));
                
                // Add active class to clicked factor and corresponding info
                this.classList.add('active');
                const correspondingInfo = document.querySelector(`[data-info="${this.dataset.factor}"]`);
                if (correspondingInfo) {
                    correspondingInfo.classList.add('active');
                }
            });
        });
    }
}

// Regenerative medicine interactive functionality
function initRegenerativeInteractive() {
    const processStages = document.querySelectorAll('#regenerative-interactive .process-stage');
    const processInfos = document.querySelectorAll('#regenerative-interactive .process-info');
    
    if (processStages.length > 0 && processInfos.length > 0) {
        // Show first stage by default
        processStages[0].classList.add('active');
        processInfos[0].classList.add('active');
        
        processStages.forEach((stage, index) => {
            stage.addEventListener('click', function() {
                // Remove active class from all stages and infos
                processStages.forEach(s => s.classList.remove('active'));
                processInfos.forEach(info => info.classList.remove('active'));
                
                // Add active class to clicked stage and corresponding info
                this.classList.add('active');
                const correspondingInfo = document.querySelector(`#regenerative-interactive [data-info="${this.dataset.stage}"]`);
                if (correspondingInfo) {
                    correspondingInfo.classList.add('active');
                }
            });
        });
    }
}

// Medical Case interactive functionality
function initMedicalCase() {
    const symptoms = document.querySelectorAll('.symptom');
    const diagnosisResult = document.querySelector('.diagnosis-result');
    const treatmentResult = document.querySelector('.treatment-result');
    
    const caseData = {
        fatigue: {
            diagnosis: "Анализ биомаркеров в крови с помощью нанотехнологий выявляет ранние признаки нарушения мозгового кровообращения. Умные наносенсоры обнаруживают специфические белки, указывающие на микроповреждения сосудов головного мозга.",
            treatment: "Персонализированная терапия, подобранная на основе генетического профиля, включает препараты для улучшения мозгового кровообращения. Стволовые клетки используются для регенерации поврежденных нейронов и восстановления сосудистой стенки."
        },
        joints: {
            diagnosis: "3D-визуализация и молекулярный анализ выявляют истончение хрящевой ткани и воспалительные процессы на клеточном уровне. Биомаркеры воспаления определяются с помощью высокочувствительных нанодиагностических систем.",
            treatment: "Выращивание нового хряща с помощью тканевой инженерии из собственных стволовых клеток пациента. Генная терапия используется для подавления воспалительных процессов и стимуляции регенерации хрящевой ткани."
        },
        skin: {
            diagnosis: "Генетический анализ выявляет предрасположенность к аутоиммунным реакциям, а специализированные биомаркеры подтверждают их наличие. Молекулярная диагностика определяет конкретные медиаторы воспаления.",
            treatment: "Персонализированная иммунотерапия, основанная на генетическом профиле пациента. Регенерация кожи осуществляется с помощью биоинженерных материалов и собственных стволовых клеток, выращенных в лабораторных условиях."
        }
    };
    
    symptoms.forEach(symptom => {
        symptom.addEventListener('click', function() {
            // Remove active class from all symptoms
            symptoms.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked symptom
            this.classList.add('active');
            
            // Get symptom data
            const symptomType = this.dataset.symptom;
            const data = caseData[symptomType];
            
            if (data && diagnosisResult && treatmentResult) {
                // Update diagnosis result with animation
                diagnosisResult.style.opacity = '0';
                treatmentResult.style.opacity = '0';
                
                setTimeout(() => {
                    diagnosisResult.innerHTML = `<p><strong>Диагностика будущего:</strong> ${data.diagnosis}</p>`;
                    treatmentResult.innerHTML = `<p><strong>Персонализированное лечение:</strong> ${data.treatment}</p>`;
                    
                    diagnosisResult.style.opacity = '1';
                    treatmentResult.style.opacity = '1';
                }, 300);
            }
        });
    });
}

// Ethics section interactive functionality
function initEthicsSection() {
    const ethicsOptions = document.querySelectorAll('.ethics-option');
    
    ethicsOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Toggle active state for ethics options
            const parentOptions = this.parentElement.querySelectorAll('.ethics-option');
            const isActive = this.classList.contains('active');
            
            // Remove active from siblings
            parentOptions.forEach(opt => opt.classList.remove('active'));
            
            // Toggle active state
            if (!isActive) {
                this.classList.add('active');
                
                // Add a subtle feedback animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                // Show a brief thank you message
                showEthicsFeeback(this);
            }
        });
    });
}

function showEthicsFeeback(button) {
    const existingFeedback = button.parentElement.querySelector('.ethics-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    const feedback = document.createElement('p');
    feedback.className = 'ethics-feedback';
    feedback.textContent = 'Спасибо за ваше мнение! Этические вопросы требуют общественного обсуждения.';
    feedback.style.cssText = `
        margin-top: 8px;
        font-size: 12px;
        color: var(--color-medical-green);
        font-style: italic;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    button.parentElement.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        feedback.style.opacity = '0';
        setTimeout(() => {
            if (feedback.parentElement) {
                feedback.remove();
            }
        }, 300);
    }, 3000);
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll('section, .card, .interactive-element');
    elementsToAnimate.forEach(element => {
        element.classList.add('section-animate');
        observer.observe(element);
    });
}

// Card animations and interactions
function initCardAnimations() {
    const infoCards = document.querySelectorAll('.info-card');
    const ethicsCards = document.querySelectorAll('.ethics-card');
    
    // Add hover effects and click interactions for info cards
    infoCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle expanded state
            this.classList.toggle('expanded');
            
            // Animate card details
            const details = this.querySelector('.card-details');
            if (details) {
                if (this.classList.contains('expanded')) {
                    details.style.maxHeight = details.scrollHeight + 'px';
                    details.style.opacity = '1';
                } else {
                    details.style.maxHeight = '0';
                    details.style.opacity = '0.7';
                }
            }
        });
        
        // Add subtle parallax effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    
    // Initialize card details as collapsed
    infoCards.forEach(card => {
        const details = card.querySelector('.card-details');
        if (details) {
            details.style.maxHeight = '0';
            details.style.opacity = '0.7';
            details.style.overflow = 'hidden';
            details.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
        }
    });
}

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Add smooth reveal animations for elements
function addRevealAnimation() {
    const revealElements = document.querySelectorAll('.card, .interactive-element, .zone-image');
    
    revealElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.transitionDelay = `${index * 0.1}s`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    });
}

// Initialize reveal animations after page load
window.addEventListener('load', function() {
    setTimeout(addRevealAnimation, 500);
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Arrow key navigation for interactive elements
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeSection = document.querySelector('section:hover, section.active');
        if (activeSection) {
            const interactiveElements = activeSection.querySelectorAll('.stage, .factor, .process-stage, .symptom');
            const activeElement = activeSection.querySelector('.stage.active, .factor.active, .process-stage.active, .symptom.active');
            
            if (interactiveElements.length > 0) {
                let currentIndex = Array.from(interactiveElements).indexOf(activeElement) || 0;
                
                if (e.key === 'ArrowRight') {
                    currentIndex = (currentIndex + 1) % interactiveElements.length;
                } else {
                    currentIndex = currentIndex > 0 ? currentIndex - 1 : interactiveElements.length - 1;
                }
                
                interactiveElements[currentIndex].click();
                e.preventDefault();
            }
        }
    }
    
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navList = document.querySelector('.nav-list');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (navList && navList.classList.contains('active')) {
            navList.classList.remove('active');
            if (mobileMenuBtn) {
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'rotate(0deg)';
                });
            }
        }
    }
});

// Add accessibility improvements
function initAccessibility() {
    // Add ARIA labels to interactive elements
    const interactiveElements = document.querySelectorAll('.stage, .factor, .process-stage, .symptom, .ethics-option');
    interactiveElements.forEach(element => {
        element.setAttribute('role', 'button');
        element.setAttribute('tabindex', '0');
        
        // Add keyboard support
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('button, [role="button"], .nav-link, .info-card');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--color-medical-blue)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Initialize accessibility after DOM load
document.addEventListener('DOMContentLoaded', function() {
    initAccessibility();
});

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Add error handling for failed image loads
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
});

// Add smooth transitions between sections
function initSectionTransitions() {
    let isScrolling = false;
    
    window.addEventListener('scroll', debounce(function() {
        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(() => {
                // Update section visibility and animations
                const sections = document.querySelectorAll('section');
                const scrollTop = window.pageYOffset;
                const windowHeight = window.innerHeight;
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    const sectionVisible = (scrollTop + windowHeight > sectionTop) && 
                                          (scrollTop < sectionTop + sectionHeight);
                    
                    if (sectionVisible) {
                        section.classList.add('in-view');
                    }
                });
                
                isScrolling = false;
            });
        }
    }, 10));
}

// Initialize section transitions
document.addEventListener('DOMContentLoaded', function() {
    initSectionTransitions();
});