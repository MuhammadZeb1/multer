const express = require("express");
const multer = require("multer");
// const upload = multer({dest:"uploads/"})

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// 1 step 

const storage = multer.diskStorage({
        destination:"iiii/",
        //  function (req, file, cb) {
        // cb(null, "uploa/"); // 'uploads/' فولڈر کا نام ہے جہاں فائلز سیو ہوں گی
    // },
    filename:function(res,file,cb){
        cb(null,file.originalname)
    }
})

const upload = multer({ storage,});
app.post("/", upload.single("image"),(req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.send("hello");
});


app.listen(3000, () => {
    console.log("server is running");
});
