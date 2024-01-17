const express = require('express');
const axios = require('axios')
const router = express.Router();

const apiKey = ""

/* GET query math api. */
router.get('/', async function(req, res, next) {
  const fallbackQuery = "2 + 2" 
  const query = req.query.expression || fallbackQuery 
  const fullUrl = `https://api.wolframalpha.com/v1/simple?appid=${apiKey}&i=${query}`
  const results = await axios.get(fullUrl) 
  res.send(results.data);
});

module.exports = router;
