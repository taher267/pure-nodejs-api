const express = require("express");
const app = express();
app.get("/:id/id", (req, res) => {
    res.json({ id: req.params });
});
app.get("*", (req, res) => {
    res.status(404).json({ message: `Not found!` });
});

app.listen(5005, () => console.log(`Alhamdu lillah server on port 5005`));
