const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const ANSWERS = {
    q1: "david",
    q2: "melvina",
    q3: "silence",
    q4: "c"
};

app.post("/validate", (req, res) => {
    const { q1, q2, q3, q4, q5 } = req.body;

    if (!q1 || !q2 || !q3 || !q4 || !q5) {
        return res.json({ success: false });
    }

    const a1 = q1.trim().toLowerCase();
    const a2 = q2.trim().toLowerCase();
    const a3 = q3.trim().toLowerCase();
    const a4 = q4.trim().toLowerCase();

    // Enforce no spaces for Q1–Q4
    if ([a1, a2, a3, a4].some(v => v.includes(" "))) {
        return res.json({ success: false });
    }

    const valid =
        a1 === ANSWERS.q1 &&
        a2 === ANSWERS.q2 &&
        a3 === ANSWERS.q3 &&
        a4 === ANSWERS.q4 &&
        q5.trim().length>5;

    if (valid) {
        return res.json({
            success: true,
            link: "https://revelation-of-shadows.vercel.app/"
        });
    }

    res.json({ success: false });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
