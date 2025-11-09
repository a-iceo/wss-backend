const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Live matches with FREE M3U8 streaming URLs
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
      { name: 'ESPN+', url: 'https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8', type: 'm3u8' },
      { name: 'Sky Sports', url: 'https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8', type: 'm3u8' },
      { name: 'beIN Sports', url: 'https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8', type: 'm3u8' }
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
      { name: 'ESPN+', url: 'https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8', type: 'm3u8' },
      { name: 'BT Sport', url: 'https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8', type: 'm3u8' },
      { name: 'DAZN', url: 'https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8', type: 'm3u8' }
    ]
  },
  {
    id: 3,
    homeTeam: 'Real Madrid',
    awayTeam: 'FC Barcelona',
    date: new Date(Date.now() + 7200000).toISOString(),
    status: 'SCHEDULED',
    league: { id: 140, name: 'La Liga', country: 'Spain' },
    venue: 'Santiago Bernabéu',
    homeScore: null,
    awayScore: null,
    streamingLinks: [
      { name: 'ESPN+', url: 'https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8', type: 'm3u8' },
      { name: 'La Liga+', url: 'https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8', type: 'm3u8' },
      { name: 'beIN Sports', url: 'https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8', type: 'm3u8' }
    ]
  }
];

app.get('/api/status', (req, res) => {
  res.json({ status: 'WSS Backend running with M3U8 streams!', version: '3.0' });
});

app.get('/api/matches', (req, res) => {
  res.json(liveMatches);
});

app.get('/api/matches/:id', (req, res) => {
  const match = liveMatches.find(m => m.id === parseInt(req.params.id));
  if (match) {
    res.json(match);
  } else {
    res.status(404).json({ error: 'Match not found' });
  }
});

app.listen(PORT, () => {
  console.log(`WSS Backend running on port ${PORT} - M3U8 Streaming Enabled`);
});
