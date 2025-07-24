const express = require('express');
const router = express.Router();
const Story = require('../models/storyModel');

// Submit a new story (already exists)
router.post('/', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const story = new Story({ title, content, author });
    await story.save();
    res.status(201).json(story);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all stories (already exists)
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a comment to a story
router.post('/:id/comments', async (req, res) => {
  try {
    const { author, content } = req.body;
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ error: 'Story not found' });
    story.comments.push({ author, content });
    await story.save();
    res.status(201).json(story);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Like a story
router.post('/:id/like', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ error: 'Story not found' });
    story.likes += 1;
    await story.save();
    res.status(200).json({ likes: story.likes });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;