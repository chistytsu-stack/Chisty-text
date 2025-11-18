app.get("/link/:id", (req, res) => {
    const id = req.params.id;

    // আপনার ডাটাবেস/স্টোরেজ থেকে ডাটা নিন
    if (!global.linkStore || !global.linkStore[id]) {
        return res.status(404).send("Invalid or expired link");
    }

    const data = global.linkStore[id];

    res.send(`
        <h1>Your Data</h1>
        <p>${data}</p>
    `);
});
