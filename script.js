document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-checkbox');
    const body = document.body;
    const themeLabel = document.querySelector('.theme-switch-wrapper .theme-label');

    // Function to apply theme and update label
    function applyTheme(isLight) {
        if (isLight) {
            body.classList.add('light-theme');
            if (themeToggle) themeToggle.checked = true;
            if (themeLabel) themeLabel.textContent = 'Dark Mode'; // Label indicates what clicking will switch TO
        } else {

            body.classList.remove('light-theme');
            if (themeToggle) themeToggle.checked = false;
            if (themeLabel) themeLabel.textContent = 'Light Mode'; // Label indicates what clicking will switch TO
        }
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        applyTheme(true);
    } else {
        applyTheme(false); // Default to dark if no preference or 'dark'
    }

    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) { // If checked, it means user wants light theme
                applyTheme(true);
                localStorage.setItem('theme', 'light');
            } else { // If unchecked, user wants dark theme
                applyTheme(false);
                localStorage.setItem('theme', 'dark');
            }
        });
    }    // Match Schedule (Updated to match scorecard summaries)
    const matches = [
        { team1: "RCB", team2: "CSK", date: "June 17, 2025", time: "7:00 PM", venue: "Melbourne Stadium", result: "RCB won by 14 runs" },
        { team1: "CSK", team2: "MI", date: "June 18, 2025", time: "7:00 PM", venue: "London Stadium", result: "CSK won by 8 wickets" },
        { team1: "MI", team2: "RCB", date: "June 19, 2025", time: "7:00 PM", venue: "Mumbai Stadium", result: "RCB won by 48 runs" },
        { team1: "CSK", team2: "RCB", date: "June 20, 2025", time: "7:00 PM", venue: "Melbourne Stadium", result: "RCB won by 7 wickets" },
        { team1: "RCB", team2: "MI", date: "June 21, 2025", time: "7:00 PM", venue: "London Stadium", result: "Match tied" },
        { team1: "MI", team2: "CSK", date: "June 22, 2025", time: "7:00 PM", venue: "Mumbai Stadium", result: "CSK won by 18 runs" },
    ];    const scheduleContainer = document.getElementById('match-schedule-container');
    
    if (scheduleContainer) {
        if (matches.length > 0) {
            // Clear any existing content
            scheduleContainer.innerHTML = '';
            
            matches.forEach((match, index) => {
                const matchCard = document.createElement('div');
                matchCard.classList.add('match-card');
                matchCard.innerHTML = `
                    <h3>${match.team1} vs ${match.team2}</h3>
                    <p class="match-date">Date: ${match.date}</p>
                    <p>Time: ${match.time}</p>
                    <p>Venue: ${match.venue}</p>
                `;
                
                // Add results based on match status
                if (match.result !== "To be played") {
                    if (match.result === "Match tied") {
                        matchCard.innerHTML += `<p class="match-result-info match-result-tied"><strong>Result:</strong> ${match.result}</p>`;
                    } else {
                        matchCard.innerHTML += `<p class="match-result-info match-result-won"><strong>Result:</strong> ${match.result}</p>`;
                    }
                } else {
                    matchCard.innerHTML += `<p class="match-result-info match-result-status"><strong>Status:</strong> To be played</p>`;
                }

                scheduleContainer.appendChild(matchCard);
            });
        } else {
            scheduleContainer.innerHTML = '<p>Match schedule will be updated soon.</p>';
        }
    }

    // Scorecard Accordion Functionality
    const matchEntries = document.querySelectorAll('.match-entry');

    matchEntries.forEach(entry => {
        entry.addEventListener('click', () => {
            const summaryId = entry.getAttribute('aria-controls');
            const summary = document.getElementById(summaryId);
            const isExpanded = entry.getAttribute('aria-expanded') === 'true';

            if (summary) {
                entry.setAttribute('aria-expanded', String(!isExpanded)); // Ensure string value
                summary.classList.toggle('is-expanded');
            } else {
                console.warn(`Match summary panel with ID "${summaryId}" not found.`);
            }
        });

        // Keyboard support for Enter/Space
        entry.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); // Prevent default space scroll or page jump
                entry.click(); // Trigger the click handler
            }
        });
    });

    // Create floating cricket-themed decorations for header
    function createCricketDecorations() {
        const header = document.querySelector('.main-header');
        
        if (!header) return; // Exit if header not found
        
        // Cricket-themed decorations data
        const decorations = [
            { emoji: '🏏', top: '15%', left: '5%', delay: '0s' },
            { emoji: '🏆', top: '20%', right: '8%', delay: '2s' },
            { emoji: '⚡', bottom: '25%', left: '8%', delay: '4s' },
            { emoji: '🎯', top: '70%', right: '5%', delay: '6s' },
            { emoji: '🌟', bottom: '15%', right: '25%', delay: '8s' }
        ];
        
        decorations.forEach((decoration, index) => {
            const decorationElement = document.createElement('div');
            decorationElement.className = 'cricket-decoration';
            decorationElement.textContent = decoration.emoji;
            
            // Apply positioning styles
            decorationElement.style.cssText = `
                position: absolute;
                font-size: 2rem;
                color: rgba(255, 193, 7, 0.3);
                animation: cricketFloat 6s ease-in-out infinite;
                z-index: 2;
                animation-delay: ${decoration.delay};
                user-select: none;
                pointer-events: none;
            `;
            
            // Set position properties
            if (decoration.top) decorationElement.style.top = decoration.top;
            if (decoration.bottom) decorationElement.style.bottom = decoration.bottom;
            if (decoration.left) decorationElement.style.left = decoration.left;
            if (decoration.right) decorationElement.style.right = decoration.right;
            
            header.appendChild(decorationElement);
        });
    }

    // Create floating orbs for additional visual effect
    function createFloatingOrbs() {
        const header = document.querySelector('.main-header');
        
        if (!header) return; // Exit if header not found
        
        // Orb configurations
        const orbConfigs = [
            { size: '120px', top: '10%', left: '10%', delay: '0s' },
            { size: '80px', top: '60%', right: '15%', delay: '2s' },
            { size: '60px', bottom: '20%', left: '20%', delay: '4s' },
            { size: '100px', top: '30%', right: '30%', delay: '6s' }
        ];
        
        orbConfigs.forEach((config, index) => {
            const orb = document.createElement('div');
            orb.className = 'floating-orb';
            
            orb.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(255, 193, 7, 0.2), rgba(233, 69, 96, 0.1));
                animation: floatingOrb 8s ease-in-out infinite;
                z-index: 1;
                width: ${config.size};
                height: ${config.size};
                animation-delay: ${config.delay};
                pointer-events: none;
            `;
            
            // Set position properties
            if (config.top) orb.style.top = config.top;
            if (config.bottom) orb.style.bottom = config.bottom;
            if (config.left) orb.style.left = config.left;
            if (config.right) orb.style.right = config.right;
            
            header.appendChild(orb);
        });
    }

    // Enhanced cricket decoration with more dynamic movement
    function createAdvancedCricketEffects() {
        const header = document.querySelector('.main-header');
        
        if (!header) return;
        
        // Create cricket ball trail effect
        for (let i = 0; i < 3; i++) {
            const ball = document.createElement('div');
            ball.className = 'cricket-ball-trail';
            ball.innerHTML = '🏀'; // Using basketball as cricket ball substitute
            
            ball.style.cssText = `
                position: absolute;
                font-size: 1.5rem;
                color: rgba(139, 69, 19, 0.4);
                animation: ballTrail ${8 + i * 2}s linear infinite;
                z-index: 1;
                animation-delay: ${i * 2}s;
                pointer-events: none;
            `;
            
            header.appendChild(ball);
        }
        
        // Create stadium lights effect
        for (let i = 0; i < 4; i++) {
            const light = document.createElement('div');
            light.className = 'stadium-light';
            light.innerHTML = '💡';
            
            light.style.cssText = `
                position: absolute;
                font-size: 1.2rem;
                color: rgba(255, 255, 0, 0.6);
                animation: stadiumLights ${3 + i}s ease-in-out infinite alternate;
                z-index: 2;
                animation-delay: ${i * 0.5}s;
                pointer-events: none;
            `;
            
            // Random positioning
            light.style.top = Math.random() * 80 + '%';
            light.style.left = Math.random() * 90 + '%';
            
            header.appendChild(light);
        }
    }

    // Initialize all header decorations
    function initializeHeaderDecorations() {
        // Remove existing decorations to prevent duplicates
        const existingDecorations = document.querySelectorAll('.cricket-decoration, .floating-orb, .cricket-ball-trail, .stadium-light');
        existingDecorations.forEach(element => element.remove());
        
        // Create new decorations
        createCricketDecorations();
        createFloatingOrbs();
        createAdvancedCricketEffects();
    }

    // Initialize header decorations when page loads
    initializeHeaderDecorations();

    // Re-initialize on window resize to ensure proper positioning
    window.addEventListener('resize', function() {
        // Debounce the resize event
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(function() {
            initializeHeaderDecorations();
        }, 250);
    });
});