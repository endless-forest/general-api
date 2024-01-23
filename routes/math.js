const express = require('express');
const axios = require('axios')
const router = express.Router();

const apiKey = process.env.WOLF_MATH_API_KEY

/* GET query math api. */
router.get('/', async function(req, res, next) {
  const fallbackQuery = "2 + 2" 
  const query = req.query.expression || fallbackQuery 
  const fullUrl = `https://api.wolframalpha.com/v2/query?appid=${apiKey}&input=${query}&podstate=Result__Step-by-step+solution&format=image`
  let results;
  try {
    //const response = await axios.get(fullUrl)
    const response = await axios.get(fullUrl) 
    results = response.data
  } catch (error) {
    results = error 
  }
  
  res.send(results);
});

module.exports = router;
