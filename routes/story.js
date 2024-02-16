const express = require("express");
var cors = require('cors')
const router = express.Router();

const apiKey =  process.env.STORY_API_KEY

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST", 
    mode: "cors", 
    cache: "no-cache", 
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    redirect: "follow", 
    referrerPolicy: "no-referrer", 
    body: JSON.stringify(data), 
  });
  return response.json()
}

/* get /story api. */
router.get("/", cors(), async function (req, res, next) {
  const prompt = req.query.prompt;
  const fullUrl = `https://api.openai.com/v1/chat/completions`;
  const storyData = {
    model: "gpt-4-0125-preview",
    messages: [{ role: "user", content: prompt }],
  };
  let results;
  try {
    const response = await postData(fullUrl, storyData);
    results = { story: response.choices[0].message.content }
  } catch (error) {
    console.info("error", error);
    results = { error: error };
  }

  res.send(results);
});

module.exports = router;
