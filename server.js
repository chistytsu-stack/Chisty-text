const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// Ensure texts folder exists
const textFolder = path.join(__dirname, "texts");
if (!fs.existsSync(textFolder)) fs.mkdirSync(textFolder);


// -----------------------------------------------
//  API: Save text → return rawId
// -----------------------------------------------
app.post("/api/text", (req, res) => {
    const text = req.body.text;
    if (!text) return res.status(400).json({ error: "No text provided" });

    const id = Math.random().toString(36).substring(2, 8);
    const filePath = path.join(textFolder, `${id}.txt`);

    fs.writeFileSync(filePath, text, "utf8");

    return res.json({ rawId: id });
});


// -----------------------------------------------
//  RAW TEXT LINK
// -----------------------------------------------
app.get("/raw/:id", (req, res) => {
    const filePath = path.join(textFolder, `${req.params.id}.txt`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send("❌ Text not found");
    }

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.sendFile(filePath);
});


// -----------------------------------------------
//  UI PAGE (viewer.html load)
// -----------------------------------------------
app.get("/link/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "viewer.html"));
});


// -----------------------------------------------
// SERVER START
// -----------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("🚀 Server running on port " + PORT);
});
