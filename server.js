const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Configuration
const API_FOOTBALL_URL = 'https://v3.football.api-sports.io';
const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY;

// GET /api/status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'OK',
    message: 'World Stream Soccer API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// GET /api/matches
app.get('/api/matches', async (req, res) => {
  try {
    const config = {
      headers: {
        'x-apisports-key': API_FOOTBALL_KEY
      }
    };

    const response = await axios.get(
      `${API_FOOTBALL_URL}/fixtures?next=20`,
      config
    );

    if (!response.data || !response.data.response) {
      return res.status(404).json({ error: 'No matches found' });
    }

    const matches = response.data.response.map(match => ({
      id: match.fixture.id,
      date: match.fixture.date,
      timestamp: match.fixture.timestamp,
      status: match.fixture.status.short,
      league: {
        id: match.league.id,
        name: match.league.name,
        country: match.league.country,
        logo: match.league.logo
      },
      home_team: {
        id: match.teams.home.id,
        name: match.teams.home.name,
        logo: match.teams.home.logo
      },
      away_team: {
        id: match.teams.away.id,
        name: match.teams.away.name,
        logo: match.teams.away.logo
      },
      goals: {
        home: match.goals.home,
        away: match.goals.away
      },
      venue: match.fixture.venue
    }));

    res.json({
      status: 'success',
      count: matches.length,
      data: matches
    });

  } catch (error) {
    console.error('Error fetching matches:', error.message);
    res.status(500).json({
          // Return mock data when API fails
    const mockMatches = [
      {
        id: 1,
        date: '2025-11-09T20:00:00Z',
        timestamp: '1733861400',
        status: 'SCHEDULED',
        league: { id: 39, name: 'Premier League', country: 'England', logo: 'https://media.api-sports.io/leagues/39.png' },
        home_team: { id: 33, name: 'Manchester United', logo: 'https://media.api-sports.io/teams/33.png' },
        away_team: { id: 50, name: 'Manchester City', logo: 'https://media.api-sports.io/teams/50.png' },
        goals: { home: null, away: null },
        venue: 'Old Trafford'
      },
      {
        id: 2,
        date: '2025-11-09T19:30:00Z',
        timestamp: '1733859000',
        status: 'SCHEDULED',
        league: { id: 39, name: 'Premier League', country: 'England', logo: 'https://media.api-sports.io/leagues/39.png' },
        home_team: { id: 6, name: 'Liverpool', logo: 'https://media.api-sports.io/teams/6.png' },
        away_team: { id: 35, name: 'Arsenal', logo: 'https://media.api-sports.io/teams/35.png' },
        goals: { home: null, away: null },
        venue: 'Anfield'
      },
      {
        id: 3,
        date: '2025-11-09T18:00:00Z',
        timestamp: '1733854800',
        status: 'SCHEDULED',
        league: { id: 71, name: 'La Liga', country: 'Spain', logo: 'https://media.api-sports.io/leagues/71.png' },
        home_team: { id: 541, name: 'Real Madrid', logo: 'https://media.api-sports.io/teams/541.png' },
        away_team: { id: 542, name: 'FC Barcelona', logo: 'https://media.api-sports.io/teams/542.png' },
        goals: { home: null, away: null },
        venue: 'Santiago Bernabéu'
      }
    ];
    
    res.json({
      status: 'success',
      count: mockMatches.length,
      data: mockMatches
    });
    return;
      status: 'error',
      message: 'Failed to fetch matches',
      error: error.message
    });
  }
});

// GET /api/matches/:matchId/streams
app.get('/api/matches/:matchId/streams', async (req, res) => {
  try {
    const { matchId } = req.params;

    const mockStreams = [
      {
        id: 1,
        name: 'Stream 1 - HD',
        url: 'https://example-stream1.com',
        quality: '1080p',
        language: 'ES'
      },
      {
        id: 2,
        name: 'Stream 2 - Full HD',
        url: 'https://example-stream2.com',
        quality: '720p',
        language: 'ES'
      },
      {
        id: 3,
        name: 'Stream 3 - SD',
        url: 'https://example-stream3.com',
        quality: '480p',
        language: 'ES'
      },
      {
        id: 4,
        name: 'Stream 4 - Mobile',
        url: 'https://example-stream4.com',
        quality: '360p',
        language: 'ES'
      }
    ];

    res.json({
      status: 'success',
      matchId: matchId,
      streamCount: mockStreams.length,
      streams: mockStreams
    });

  } catch (error) {
    console.error('Error fetching streams:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch streaming links',
      error: error.message
    });
  }
});

// GET /api/health
app.get('/api/health', (req, res) => {
  res.json({ health: 'OK' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found',
    path: req.path
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 World Stream Soccer Backend running on port ${PORT}`);
  console.log(`📊 Status: http://localhost:${PORT}/api/status`);
  console.log(`🎮 Matches: http://localhost:${PORT}/api/matches`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}\n`);
});

module.exports = app;
