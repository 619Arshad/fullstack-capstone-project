const express = require('express');
const natural = require('natural');
const router = express.Router();

// Sentiment analysis endpoint using the natural package
router.get('/:text', (req, res) => {
    try {
        const text = req.params.text;
        const tokenizer = new natural.WordTokenizer();
        const tokens = tokenizer.tokenize(text);
        
        // Simple sentiment evaluation logic
        const Analyzer = natural.SentimentAnalyzer;
        const stemmer = natural.PorterStemmer;
        const analyzer = new Analyzer("English", stemmer, "afinn");
        const sentimentScore = analyzer.getSentiment(tokens);

        let sentiment = "neutral";
        if (sentimentScore > 0) {
            sentiment = "positive";
        } else if (sentimentScore < 0) {
            sentiment = "negative";
        }

        res.json({ sentiment, score: sentimentScore });
    } catch (error) {
        console.error('Error analyzing sentiment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
