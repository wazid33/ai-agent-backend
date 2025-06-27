const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // Or gpt-4
      messages: [{ role: "user", content: message }],
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));