require("dotenv").config();
const express = require('express');

const sendEmail = require("./utils/emailsender")
const upload = require("./utils/multer")
const PORT = 3000;

const app = express();

app.use(express.urlencoded({extended: true}))


app.post("/send-email", async (req, res) => {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const result = await sendEmail(to, subject, text);
    res.status(result.success ? 200 : 500).json(result);
});

// Single file upload
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'File uploaded successfully', file: req.file });
  });
  
  // Multiple file upload
  app.post('/uploads', upload.array('files', 5), (req, res) => {
    res.json({ message: 'Files uploaded successfully', files: req.files });
  });


app.listen(PORT, ()=>{
    console.log("Server is running")
})