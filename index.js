const express = require("express");
const multer = require("multer");
const upload = multer({dest:"uploads/"})

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/", upload.single("image"),(req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.send("hello");
});

app.listen(3000, () => {
    console.log("server is running");
});
