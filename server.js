const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔥 Public folder serve
app.use(express.static(path.join(__dirname, "public")));


// API Example: link system
app.post("/link", async (req, res) => {
    const text = req.body.text;

    const randomId = Math.random().toString(36).substr(2, 8);

    // This will just return a dummy link (You will replace later)
    res.json({
        link: `${req.protocol}://${req.get("host")}/link/${randomId}`
    });
});


// Run Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
