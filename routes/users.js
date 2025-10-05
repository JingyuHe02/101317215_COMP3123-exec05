
// routes/users.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataPath = path.join(__dirname, '..', 'user.json');

// Function to read user.json file
function readRaw() {
  try {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch (e) {
    console.error('[users.js] Failed to read user.json:', e.message);
    return {};
  }
}

// ========== Routes ==========

// POST /api/v1/user/login
// Validate user credentials from user.json
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = readRaw();

  // If user.json is an array
  if (Array.isArray(users)) {
    const match = users.find(
      (u) => u.username === username && u.password === password
    );
    if (match) {
      return res.json({ status: true, message: 'User Is valid' });
    }
    return res.json({ status: false, message: 'User Is invalid' });
  }

  // If user.json is a single object
  if (users.username === username && users.password === password) {
    return res.json({ status: true, message: 'User Is valid' });
  }
  return res.json({ status: false, message: 'User Is invalid' });
});

// GET /api/v1/user/profile
// Return user information from user.json
router.get('/profile', (req, res) => {
  const users = readRaw();
  res.json(users);
});

// POST /api/v1/user/logout
// Simple logout endpoint
router.post('/logout', (req, res) => {
  res.json({ status: true, message: 'User logged out successfully' });
});

module.exports = router;
