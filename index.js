const mongoose = require('mongoose');

// MongoDB Atlas connection
mongoose.connect("mongodb+srv://admin:password12302@cluster0.v5adgmh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(" Connected to MongoDB Atlas"))
.catch(err => console.error(" MongoDB connection error:", err));

// Import dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Middleware for JSON body parsing
app.use(bodyParser.json());

// Import user routes
const userRouter = require('./routes/users');

// Mount user routes
app.use('/api/v1/user', userRouter);

// Home route - serve a simple HTML page
app.get('/home', (req, res) => {
  res.send('<h1>Welcome to ExpressJs Tutorial</h1>');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get('/', (req, res) => {
  res.send("Welcome to Exercise05 API ");
});
