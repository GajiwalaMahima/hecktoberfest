const express = require('express');
const { nanoid } = require('nanoid');
const Url = require('../models/url');

const router = express.Router();

router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;


    if (!longUrl || !/^https?:\/\//.test(longUrl)) {
        return res.status(400).json({ message: 'Invalid URL' });
    }

    try {

        let url = await Url.findOne({ longUrl });

        if (url) {
            return res.status(200).json({ shortUrl: url.shortUrl });
        }


        const shortUrl = nanoid(8);


        url = new Url({
            longUrl,
            shortUrl,
        });

        await url.save();


        res.status(201).json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortUrl}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const url = await Url.findOne({ shortUrl });

        if (!url) {
            return res.status(404).json({ message: 'Short URL not found' });
        }

        res.redirect(url.longUrl);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;