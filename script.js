document.addEventListener('DOMContentLoaded', () => {
    const matchScheduleContainer = document.getElementById('match-schedule-container');
    const today = new Date(); // Current date for starting the schedule
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    // Define the teams and their player/captain
    const teams = [
        { name: "RCB", captain: "Varun Sai" },
        { name: "CSK", captain: "Lokesh" },
        { name: "MI", captain: "Hemanth" }
    ];

    // Generate round-robin match schedule for 3 teams
    // A vs B, B vs C, C vs A (Cycle 1)
    // A vs C, B vs A, C vs B (Cycle 2 - reverse fixtures)
    const fixtures = [
        { home: teams[0], away: teams[1] }, // RCB vs CSK
        { home: teams[1], away: teams[2] }, // CSK vs MI
        { home: teams[2], away: teams[0] }, // MI vs RCB
        { home: teams[1], away: teams[0] }, // RCB vs MI (Reverse fixture)
        { home: teams[0], away: teams[2] }, // CSK vs RCB
        { home: teams[2], away: teams[1] }  // MI vs CSK
    ];

    let matchCount = 1;
    fixtures.forEach((fixture, index) => {
        const matchDate = new Date(today);
        matchDate.setDate(today.getDate() + index); // Daily match, starting from today

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = matchDate.toLocaleDateString('en-US', options);

        const matchCard = document.createElement('div');
        matchCard.classList.add('match-card');
        matchCard.innerHTML = `
            <h3>Match ${matchCount}</h3>
            <p>${fixture.home.name} vs ${fixture.away.name}</p>
            <p class="match-date">${formattedDate}</p>
            <p>Time: 7:00 PM IST</p>
            <p>Venue: Online Arena</p>
        `;
        matchScheduleContainer.appendChild(matchCard);
        matchCount++;
    });
});

// Basic navigation smooth scroll
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});