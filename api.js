const express = require("express");
const { goguardian } = require("./goguardian.js"); // adjust path

const app = express();
app.use(express.json());

app.post("/api/check-url", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.json({ error: "No URL provided" });
    }

    const result = await goguardian(url);

    if (result === "Error") {
        return res.json({ error: "Failed to check URL" });
    }

    const [categories, blocked] = result;

    res.json({
        categories,
        blocked,
        error: null,
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));
