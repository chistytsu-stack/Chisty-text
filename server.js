const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Chisty Text API Running...");
});

app.post("/api/text", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "No text provided" });

  const rawId = Date.now().toString(36);

  res.json({
    success: true,
    rawId,
    input: text
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port " + port));
