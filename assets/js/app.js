// Basketball Matches App Configuration
const APP_CONFIG = {
    // Set to true to use live API, false for mock data
    USE_LIVE_API: false,
    
    // API Configuration
    API: {
        // Primary API (requires API key)
        SPORTS_API: 'https://api-sports.io/basketball',
        
        // Alternative APIs
        API_BASKETBALL: 'https://www.api-basketball.com',
        RAPID_API: 'https://rapidapi.com/api-sports/api/api-nba',
        
        // Headers for API requests (add your API key here)
        HEADERS: {
            'X-RapidAPI-Key': 'YOUR_API_KEY_HERE',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    }
};

// Mock NBA Data for demonstration
const MOCK_MATCHES = [
    {
        id: 1,
        home_team: { name: 'Lakers', full_name: 'Los Angeles Lakers', city: 'Los Angeles' },
        visitor_team: { name: 'Warriors', full_name: 'Golden State Warriors', city: 'Golden State' },
        date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Scheduled'
    },
    {
        id: 2,
        home_team: { name: 'Heat', full_name: 'Miami Heat', city: 'Miami' },
        visitor_team: { name: 'Celtics', full_name: 'Boston Celtics', city: 'Boston' },
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Scheduled'
    },
    {
        id: 3,
        home_team: { name: 'Bulls', full_name: 'Chicago Bulls', city: 'Chicago' },
        visitor_team: { name: 'Nets', full_name: 'Brooklyn Nets', city: 'Brooklyn' },
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Scheduled'
    },
    {
        id: 4,
        home_team: { name: 'Knicks', full_name: 'New York Knicks', city: 'New York' },
        visitor_team: { name: 'Sixers', full_name: 'Philadelphia 76ers', city: 'Philadelphia' },
        date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Scheduled'
    },
    {
        id: 5,
        home_team: { name: 'Nuggets', full_name: 'Denver Nuggets', city: 'Denver' },
        visitor_team: { name: 'Suns', full_name: 'Phoenix Suns', city: 'Phoenix' },
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Scheduled'
    },
    {
        id: 6,
        home_team: { name: 'Bucks', full_name: 'Milwaukee Bucks', city: 'Milwaukee' },
        visitor_team: { name: 'Mavericks', full_name: 'Dallas Mavericks', city: 'Dallas' },
        date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Scheduled'
    },
    {
        id: 7,
        home_team: { name: 'Clippers', full_name: 'LA Clippers', city: 'Los Angeles' },
        visitor_team: { name: 'Kings', full_name: 'Sacramento Kings', city: 'Sacramento' },
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Scheduled'
    },
    {
        id: 8,
        home_team: { name: 'Rockets', full_name: 'Houston Rockets', city: 'Houston' },
        visitor_team: { name: 'Spurs', full_name: 'San Antonio Spurs', city: 'San Antonio' },
        date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Scheduled'
    }
];

// Application Class
class BasketballApp {
    constructor() {
        this.matches = [];
        this.loading = document.getElementById('loading');
        this.matchesContainer = document.getElementById('matches-container');
        this.errorContainer = document.getElementById('error-container');
        
        this.init();
    }

    async init() {
        try {
            if (APP_CONFIG.USE_LIVE_API) {
                await this.fetchLiveMatches();
            } else {
                await this.loadMockData();
            }
        } catch (error) {
            console.error('App initialization error:', error);
            this.showError('Failed to initialize the application.');
        }
    }

    async loadMockData() {
        try {
            // Simulate API loading time
            await this.sleep(1500);
            
            this.matches = MOCK_MATCHES;
            this.displayMatches(this.matches);
            
        } catch (error) {
            console.error('Error loading mock data:', error);
            this.showError('Failed to load match data.');
        } finally {
            this.hideLoading();
        }
    }

    async fetchLiveMatches() {
        try {
            // Example implementation for live API
            // You would replace this with actual API calls
            
            const response = await fetch(APP_CONFIG.API.SPORTS_API + '/games', {
                headers: APP_CONFIG.API.HEADERS
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.matches = this.formatAPIData(data);
            this.displayMatches(this.matches);
            
        } catch (error) {
            console.error('Error fetching live matches:', error);
            
            // Fallback to mock data
            console.log('Falling back to mock data...');
            await this.loadMockData();
        } finally {
            this.hideLoading();
        }
    }

    formatAPIData(apiData) {
        // Format the API response to match our expected structure
        // This would depend on the specific API you're using
        return apiData.games || apiData.data || [];
    }

    displayMatches(matches) {
        if (!matches || matches.length === 0) {
            this.showError('No upcoming matches found.');
            return;
        }

        const upcomingMatches = matches
            .filter(match => new Date(match.date) > new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 12);

        if (upcomingMatches.length === 0) {
            this.showError('No upcoming matches scheduled.');
            return;
        }

        this.matchesContainer.innerHTML = upcomingMatches
            .map(match => this.createMatchCard(match))
            .join('');

        this.matchesContainer.style.display = 'grid';
        
        // Add entrance animations
        this.animateCards();
    }

    createMatchCard(match) {
        const matchDate = new Date(match.date);
        const homeTeam = match.home_team;
        const visitorTeam = match.visitor_team;
        
        return `
            <div class="match-card" style="opacity: 0; transform: translateY(20px);">
                <div class="match-header">
                    <div class="match-date">
                        ${matchDate.toLocaleDateString('en-US', { 
                            weekday: 'short',
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </div>
                </div>
                
                <div class="teams-container">
                    <div class="team">
                        <div class="team-name">${visitorTeam.full_name || visitorTeam.name}</div>
                        <div class="team-city">${visitorTeam.city || 'Away'}</div>
                    </div>
                    
                    <div class="vs-divider">
                        <div class="vs-text">VS</div>
                    </div>
                    
                    <div class="team">
                        <div class="team-name">${homeTeam.full_name || homeTeam.name}</div>
                        <div class="team-city">${homeTeam.city || 'Home'}</div>
                    </div>
                </div>
                
                <div class="match-details">
                    <div class="match-time">
                        ${matchDate.toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit',
                            hour12: true 
                        })}
                    </div>
                    <div class="match-status">${match.status}</div>
                </div>
            </div>
        `;
    }

    animateCards() {
        const cards = document.querySelectorAll('.match-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    showError(message) {
        this.errorContainer.innerHTML = `
            <div class="error-message">
                <h3>⚠️ Error</h3>
                <p>${message}</p>
                <button onclick="location.reload()" style="
                    background: linear-gradient(135deg, #ff6b6b, #ffa500);
                    border: none;
                    color: white;
                    padding: 0.8rem 1.5rem;
                    border-radius: 25px;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: 1rem;
                    transition: transform 0.2s;
                " onmouseover="this.style.transform='scale(1.05)'" 
                   onmouseout="this.style.transform='scale(1)'">
                    Retry
                </button>
            </div>
        `;
        this.errorContainer.style.display = 'block';
    }

    hideLoading() {
        this.loading.style.display = 'none';
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Utility Functions
const Utils = {
    formatDate: (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    formatTime: (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    },

    isUpcoming: (dateString) => {
        return new Date(dateString) > new Date();
    }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BasketballApp();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BasketballApp, Utils, APP_CONFIG };
}