const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import mongoose connection
require('./connection');

// Importing user router
const UserRouter = require('./routers/userRouter.js');

// Creating new Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: '*' // Allow all origins for development; restrict in production
}));
app.use(express.json()); // Parse JSON data from request body

// Routes
app.use('/user', UserRouter);

// Mock profile analysis endpoint for the AccountChecker frontend
app.post('/api/analyze-profile', (req, res) => {
    const { url } = req.body;

    // Basic validation
    if (!url || !url.startsWith('http')) {
        return res.status(400).json({ error: 'Invalid or missing profile URL' });
    }

    // Mock analysis logic (replace with real analysis service if needed)
    const riskScore = Math.floor(Math.random() * 100); // Random score for demo
    const isSuspicious = riskScore > 70;
    const isModerate = riskScore > 40 && riskScore <= 70;

    const analysisResult = {
        risk_score: riskScore,
        account_age: {
            value: `${Math.floor(Math.random() * 24)} months`,
            verdict: isSuspicious ? 'SUSPICIOUS' : 'NORMAL',
            explanation: isSuspicious
                ? 'Account is too new, which is common for fake profiles.'
                : 'Account age seems reasonable for a legitimate profile.'
        },
        follower_ratio: {
            followers: Math.floor(Math.random() * 1000),
            following: Math.floor(Math.random() * 1000) + 500,
            verdict: isSuspicious ? 'HIGH RISK' : 'NORMAL',
            explanation: isSuspicious
                ? 'Unusual follower-to-following ratio, suggesting potential bot activity.'
                : 'Follower ratio appears balanced.'
        },
        profile_photo: {
            url: 'https://via.placeholder.com/150', // Mock image URL
            verdict: isSuspicious ? 'FAKE' : 'GENUINE',
            evidence: isSuspicious
                ? ['Stock photo detected', 'No face recognized']
                : ['Appears to be a genuine user photo']
        },
        activity_patterns: {
            verdict: isSuspicious ? 'BOT-LIKE' : 'NORMAL',
            evidence: isSuspicious
                ? 'High posting frequency at unusual hours.'
                : 'Activity patterns consistent with human behavior.'
        },
        recommendations: [
            isSuspicious ? 'Avoid engaging with this account.' : 'Monitor account for further activity.',
            'Verify identity through secondary channels if possible.',
            'Report suspicious behavior to the platform.'
        ]
    };

    res.json(analysisResult);
});

// Default routes
app.get('/', (req, res) => {
    res.send('Response From Express');
});

app.get('/add', (req, res) => {
    res.send('Response From Add Route');
});

app.get('/getall', (req, res) => {
    res.send('Response From Get All Route');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on Port - ${port}`);
});