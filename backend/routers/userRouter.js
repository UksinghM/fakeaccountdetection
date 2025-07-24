const express = require('express');
const Model = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

const axios = require('axios');
const cheerio = require('cheerio');

router.post('/add', (req, res) => {
    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            if (err.code === 11000) {
                res.status(400).json({ message: 'User Email Already Exists' });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
});

router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({ message: 'Internal Server Error' });
            console.log(err);
        });
});

router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({ message: 'Internal Server Error' });
            console.log(err);
        });
});

router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({ message: 'Internal Server Error' });
            console.log(err);
        });
});

router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({ message: 'Internal Server Error' });
            console.log(err);
        });
});

router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
        .then((result) => {
            if (result) {
                const { _id, email, password } = result;
                const payload = { _id, email, password };

                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json(err);
                    } else {
                        res.status(200).json({ token });
                    }
                });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

// Fake account probability prediction endpoint
router.post('/predict-fake', (req, res) => {
    const {
        account_age_days = 0,
        has_profile_picture = false,
        followers_count = 0,
        following_count = 0,
        bio_length = 0
    } = req.body;

    // Simple rule-based scoring
    let score = 0;
    if (account_age_days < 7) score += 0.3; // new accounts are more likely fake
    if (!has_profile_picture) score += 0.2;
    if (followers_count < 10) score += 0.2;
    if (following_count > 500) score += 0.1;
    if (bio_length < 10) score += 0.2;
    if (score > 1) score = 1;

    res.json({
        is_fake_probability: score,
        features: {
            account_age_days,
            has_profile_picture,
            followers_count,
            following_count,
            bio_length
        }
    });
});

// Fetch Instagram profile data endpoint
router.post('/fetch-instagram-profile', async (req, res) => {
    const { url } = req.body;
    if (!url || !url.startsWith('http')) {
        return res.status(400).json({ error: 'Invalid URL' });
    }
    try {
        // Fetch the profile page
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });
        const html = response.data;
        const $ = cheerio.load(html);
        // Extract sharedData JSON from the page
        const script = $('script[type="application/ld+json"]').html();
        let followers_count = '', following_count = '', bio_length = '', has_profile_picture = false, account_age_days = '';
        if (script) {
            const data = JSON.parse(script);
            followers_count = data.mainEntityofPage.interactionStatistic.userInteractionCount || '';
            // Instagram does not provide following count or account age in ld+json, so we use fallback
            bio_length = data.description ? data.description.length : 0;
            has_profile_picture = !!data.image;
        }
        // Try to extract more info from window._sharedData if available
        const sharedDataScript = $('script').filter((i, el) => $(el).html().includes('window._sharedData')).html();
        if (sharedDataScript) {
            const jsonText = sharedDataScript.match(/window\._sharedData\s*=\s*(\{.*\});/);
            if (jsonText && jsonText[1]) {
                const sharedData = JSON.parse(jsonText[1]);
                const user = sharedData.entry_data.ProfilePage[0].graphql.user;
                followers_count = user.edge_followed_by.count;
                following_count = user.edge_follow.count;
                bio_length = user.biography.length;
                has_profile_picture = !user.is_default_profile_pic;
                // Account age is not public, so leave blank or estimate
            }
        }
        res.json({
            account_age_days,
            has_profile_picture,
            followers_count,
            following_count,
            bio_length
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch Instagram profile data.' });
    }
});

module.exports = router;