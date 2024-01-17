const express = require('express');
const axios = require('axios')
const router = express.Router();

const apiKey = ""

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const query = "2 + 2"
  const fullUrl = `https://api.wolframalpha.com/v1/simple?appid=${apiKey}&i=${query}`
  const results = await axios.get(fullUrl) 
  console.info(results)
  res.send(results.data);
});

module.exports = router;
