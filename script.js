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
    }

    // Match Schedule (Example data, can be fetched or managed elsewhere)
    const matches = [
        { team1: "Team RCB", team2: "Team CSK", date: "June 17, 2025", time: "7:00 PM", venue: "Melbourne Stadium" },
        { team1: "Team MI", team2: "Team RCB", date: "June 18, 2025", time: "7:00 PM", venue: "London Stadium" },
        { team1: "Team CSK", team2: "Team MI", date: "June 19, 2025", time: "7:00 PM", venue: "Mumbai Stadium" },
        { team1: "Team RCB", team2: "Team CSK", date: "June 20, 2025", time: "7:00 PM", venue: "Melbourne Stadium" },
        { team1: "Team MI", team2: "Team RCB", date: "June 21, 2025", time: "7:00 PM", venue: "Mumbai Stadium" },
        { team1: "Team CSK", team2: "Team MI", date: "June 22, 2025", time: "7:00 PM", venue: "London StadiumS" },
    ];

    const scheduleContainer = document.getElementById('match-schedule-container');
    if (scheduleContainer) {
        if (matches.length > 0) {
            matches.forEach((match, index) => { // Added index to the forEach
                const matchCard = document.createElement('div');
                matchCard.classList.add('match-card');
                matchCard.innerHTML = `
                    <h3>${match.team1} vs ${match.team2}</h3>
                    <p class="match-date">Date: ${match.date}</p>
                    <p>Time: ${match.time}</p>
                    <p>Venue: ${match.venue}</p>
                `;
                // Add results: first match is done, others are to be played
                if (index === 0 && match.team1 === "Team RCB" && match.team2 === "Team CSK") { // Check if it's the first match
                    matchCard.innerHTML += `<p class="match-result-info match-result-won"><strong>Result:</strong> RCB won by 14 runs.</p>`;
                } else {
                    // For all other matches
                    matchCard.innerHTML += `<p class="match-result-info match-result-status"><strong>Status:</strong> To be played.</p>`;
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
});