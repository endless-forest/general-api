const express = require("express");
const axios = require("axios");
const router = express.Router();

const apiKey = "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" // process.env.STORY_API_KEY;

/* get /story api. */
router.get("/", async function (req, res, next) {
  const prompt = req.query.prompt;
  console.info("prompt")
  const fullUrl = `https://api.openai.com/v1/chat/completions`;
  const storyData = {
    model: "gpt-4-0125-preview",
    messages: [{ role: "user", content: prompt }],
  };
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
  };
  let results;
  try {
    const response = await axios.post(fullUrl, storyData, headers);
    results = response;
  } catch (error) {
    console.error("Error", error);
    results = error;
  }

  res.send(results);
});

module.exports = router;
