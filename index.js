const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(express.json());

// Storage config (جیسے آپ نے لکھا ہے)
const storage = multer.diskStorage({
    destination: "iiii/",
    filename: function (res, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// File filter (صرف images allow ہوں)
function fileFilter(req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;

    if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
}

// Multer config with limits
const upload = multer({ 
    storage,
    limits: { fileSize: 1024 * 1024 }, // 1MB limit
    fileFilter
});

app.post("/", (req, res) => {
    upload.single("image")(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // Multer-specific error (e.g. file too large)
            return res.status(400).json({ error: err.message });
        } else if (err) {
            // Custom error (e.g. wrong file type)
            return res.status(400).json({ error: err.message });
        }

        console.log(req.body);
        console.log(req.file);
        res.send("hello");
    });
});

app.listen(3000, () => {
    console.log("server is running");
});
