const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for matches
const mockMatches = [
  {
    id: 1,
    date: '2025-11-09T20:00:00Z',
    status: 'SCHEDULED',
    league: { id: 39, name: 'Premier League', country: 'England' },
    home_team: { id: 33, name: 'Manchester United' },
    away_team: { id: 50, name: 'Manchester City' },
    goals: { home: null, away: null },
    venue: 'Old Trafford'
  },
  {
    id: 2,
    date: '2025-11-09T19:30:00Z',
    status: 'SCHEDULED',
    league: { id: 39, name: 'Premier League', country: 'England' },
    home_team: { id: 6, name: 'Liverpool' },
    away_team: { id: 35, name: 'Arsenal' },
    goals: { home: null, away: null },
    venue: 'Anfield'
  },
  {
    id: 3,
    date: '2025-11-09T18:00:00Z',
    status: 'SCHEDULED',
    league: { id: 71, name: 'La Liga', country: 'Spain' },
    home_team: { id: 541, name: 'Real Madrid' },
    away_team: { id: 542, name: 'FC Barcelona' },
    goals: { home: null, away: null },
    venue: 'Santiago Bernabéu'
  }
];

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
app.get('/api/matches', (req, res) => {
  res.json({
    status: 'success',
    count: mockMatches.length,
    data: mockMatches
  });
});

// GET /api/matches/:matchId/streams
app.get('/api/matches/:matchId/streams', (req, res) => {
  const { matchId } = req.params;
  res.json({
    status: 'success',
    matchId: parseInt(matchId),
    streams: [
      { name: 'Stream 1', url: 'https://example.com/stream1', quality: '1080p' },
      { name: 'Stream 2', url: 'https://example.com/stream2', quality: '720p' }
    ]
  });
});

// 404 error handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`⚽ World Stream Soccer API running on port ${PORT}`);
  console.log(`✅ GET /api/status - Health check`);
  console.log(`✅ GET /api/matches - Football matches`);
  console.log(`✅ GET /api/matches/:matchId/streams - Streaming links`);
});
