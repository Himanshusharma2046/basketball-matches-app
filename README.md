# 🏀 Basketball Upcoming Matches App

A modern, responsive web application displaying upcoming basketball matches with an attractive glassmorphism UI design.

![Basketball App Preview]([https://lambent-lokum-a8a3fb.netlify.app/]) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![Responsive](https://img.shields.io/badge/Responsive-Mobile%20Friendly-blue)

## 🌟 Features

- **Modern Glassmorphism Design** - Stunning frosted glass effects with backdrop blur
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations** - Hardware-accelerated CSS animations and transitions
- **Live API Support** - Easy integration with basketball APIs
- **Mock Data Fallback** - Demonstrates functionality with realistic NBA data
- **Error Handling** - Graceful error handling with retry functionality
- **Cross-browser Compatible** - Works on all modern browsers
- **Zero Dependencies** - Pure HTML, CSS, and JavaScript

## 🎥 Demo

**[🔗 Live Demo]([https://lambent-lokum-a8a3fb.netlify.app/])** 

### Screenshots

![Screenshot (395)](https://github.com/user-attachments/assets/c83413f3-a72b-4add-880b-dd2624e353d3)
![Screenshot (396)](https://github.com/user-attachments/assets/58598263-97e2-4654-a37c-fc40717acc97)


## 📁 Project Structure

```
basketball-matches-app/
│
├── index.html                 # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css        # All CSS styles and animations
│   └── js/
│       └── app.js           # Main JavaScript application logic
└── README.md                # This file
```

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)
1. **Fork** this repository
2. **Enable GitHub Pages** in repository settings
3. **Visit** your deployed app at `https://your-username.github.io/basketball-matches-app`

### Option 2: Local Setup
1. **Clone** the repository:
   ```bash
   git clone https://github.com/your-username/basketball-matches-app.git
   cd basketball-matches-app
   ```

2. **Open** `index.html` in any modern web browser


#### Using Live Server (VS Code):
1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"

## 🔧 Configuration

### Switching to Live API

1. **Open** `assets/js/app.js`
2. **Find** the `APP_CONFIG` object
3. **Change** `USE_LIVE_API: false` to `USE_LIVE_API: true`
4. **Add** your API key to the `HEADERS` section

```javascript
const APP_CONFIG = {
    USE_LIVE_API: true, // Change this to true
    API: {
        HEADERS: {
            'X-RapidAPI-Key': 'YOUR_ACTUAL_API_KEY_HERE'
        }
    }
};
```

### Environment Variables (Optional)
For production deployments, consider using environment variables:
```javascript
const API_KEY = process.env.RAPIDAPI_KEY || 'fallback-key';
```

## 🔌 Supported APIs

### Primary Options:

#### 1. **API-Sports Basketball** 🏆
- **URL**: [https://api-sports.io/documentation/basketball](https://api-sports.io/documentation/basketball)
- **Features**: Comprehensive NBA data, real-time scores, team statistics
- **Cost**: Free tier available (100 requests/day)
- **Rate Limit**: 10 requests/minute (free tier)

#### 2. **RapidAPI NBA** ⚡
- **URL**: [https://rapidapi.com/api-sports/api/api-nba](https://rapidapi.com/api-sports/api/api-nba)
- **Features**: Official NBA statistics and schedules
- **Cost**: Freemium model starting at $0/month
- **Rate Limit**: 500 requests/month (free tier)

#### 3. **API-Basketball** 🌐
- **URL**: [https://www.api-basketball.com](https://www.api-basketball.com)
- **Features**: Global basketball leagues and tournaments
- **Cost**: Free tier with limitations
- **Rate Limit**: 100 requests/day (free tier)

### CORS Solutions:
If you encounter CORS errors:
1. **CORS Proxy Services**: 
   - `https://cors-anywhere.herokuapp.com/`
   - `https://api.allorigins.win/get?url=`
2. **Backend Proxy**: Set up your own proxy server
3. **Browser Extensions**: For development only (not recommended for production)


## 📱 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 60+     | ✅ Full Support |
| Firefox | 55+     | ✅ Full Support |
| Safari  | 12+     | ✅ Full Support |
| Edge    | 79+     | ✅ Full Support |
| Opera   | 47+     | ✅ Full Support |

