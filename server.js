const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Live matches with real streaming platform links
const liveMatches = [
  {
    id: 1,
    homeTeam: 'Manchester United',
    awayTeam: 'Manchester City',
    date: new Date().toISOString(),
    status: 'LIVE',
    league: { id: 39, name: 'Premier League', country: 'England' },
    venue: 'Old Trafford',
    homeScore: 2,
    awayScore: 1,
    streamingLinks: [
      { name: 'YouTube', url: 'https://www.youtube.com/results?search_query=Manchester+United+vs+Manchester+City+live' },
      { name: 'ESPN+', url: 'https://www.espnplus.com' },
      { name: 'Sky Sports', url: 'https://www.skysports.com/watch/live' }
    ]
  },
  {
    id: 2,
    homeTeam: 'Liverpool',
    awayTeam: 'Arsenal',
    date: new Date(Date.now() + 3600000).toISOString(),
    status: 'SCHEDULED',
    league: { id: 39, name: 'Premier League', country: 'England' },
    venue: 'Anfield',
    homeScore: null,
    awayScore: null,
    streamingLinks: [
      { name: 'YouTube', url: 'https://www.youtube.com/results?search_query=Liverpool+vs+Arsenal+live' },
      { name: 'ESPN+', url: 'https://www.espnplus.com' },
      { name: 'BT Sport', url: 'https://www.btsport.com' }
    ]
  }
];

app.get('/api/status', (req, res) => {
  res.json({ status: 'Backend running!', version: '2.0' });
});

app.get('/api/matches', (req, res) => {
  res.json(liveMatches);
});

app.listen(PORT, () => {
  console.log(`WSS Backend running on port ${PORT}`);
});
