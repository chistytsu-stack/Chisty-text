app.get("/link/:id", (req, res) => {
    const id = req.params.id;
    const fs = require("fs");
    const path = require("path");

    const filePath = path.join(__dirname, "data", `${id}.txt`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send("❌ File not found");
    }

    const data = fs.readFileSync(filePath, "utf8");
    res.setHeader("Content-Type", "text/plain");
    return res.send(data);
});
