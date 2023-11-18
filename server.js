const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

let dynamicQRCode = null;
let qrCodeStartTime = null;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/teacher.html', (req, res) => {
  res.sendFile(__dirname + '/teacher.html');
});

app.post('/teacher-login', (req, res) => {
  // Mock authentication
  const validTeacherUsername = 'teacher';
  const validTeacherPassword = 'password';

  const { username, password } = req.body;

  if (username === validTeacherUsername && password === validTeacherPassword) {
    dynamicQRCode = generateQRCode();
    qrCodeStartTime = new Date();
    res.redirect('/teacher.html');
  } else {
    res.send('Invalid login credentials');
  }
});

app.get('/get-qrcode', (req, res) => {
  res.json({ qrCode: dynamicQRCode, startTime: qrCodeStartTime });
});

function generateQRCode() {
  return 'mocked-qrcode';
}

app.post('/submit-roll-number', (req, res) => {
  const { rollNumber, timestamp } = req.body;
  const submissionTime = new Date();

  if (qrCodeStartTime && (submissionTime - qrCodeStartTime) / 1000 <= 180) {
    // Process the roll number and timestamp (replace with your logic)
    console.log(`Roll number ${rollNumber} submitted within 180 seconds.`);
    res.json({ success: true, message: 'Roll number submitted successfully.' });
  } else {
    res.status(400).json({ success: false, message: 'Submission time expired or QR code not generated.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
