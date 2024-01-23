const express = require('express');
const axios = require('axios')
const router = express.Router();
const convert = require('xml-js');

const apiKey = process.env.WOLF_MATH_API_KEY

/* GET query math api. */
router.get('/', async function(req, res, next) {
  const fallbackQuery = encodeURIComponent("2 + 2") 
  const query = encodeURIComponent(`solve ${req.query.expression}`) || fallbackQuery 
  const fullUrl = `https://api.wolframalpha.com/v2/query?appid=${apiKey}&input=${query}&podstate=Result__Step-by-step+solution&format=image`
  let results;
  try {
    const response = await axios.get(fullUrl) 
    const jsonResults = JSON.parse(convert.xml2json(response.data, {compact: true, spaces: 4}))
    results = jsonResults.queryresult.pod[1].subpod[1].img._attributes
  } catch (error) {
    console.error("Error", error)
    results = error 
  }
  
  res.send(results);
});

module.exports = router;
