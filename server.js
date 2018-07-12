const express = require('express');
const nodemailer = require('nodemailer');

let app = express();

const port = process.env.PORT || 3000;

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Expose-Headers', 'x-auth');
//   res.header('Access-Control-Allow-Headers', 'Origin, x-auth, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS');
//   next();
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + 'index.html'));
})

app.post('/', (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Mailgun',
      auth: {
        user: 'postmaster@sandboxbd1c82fa486a411d8252e00086824911.mailgun.org',
        pass: '530d24384be84b0a8767d21f995f3b72-e44cc7c1-edf7bba2'
      }
    });
    const mailOptions = {
      from: 'markleedev1933@gmail.com',
      to: user.email,
      subject: 'PwKeychain Password Reset',
      text: `Please click the following link to reset your password: \n
        https://${req.headers.host}/reset/${token} \n
        If you did not request this, please ignore this email and your password will remain unchanged.`
    };
    
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        throw new Error('There was an error sending the email.');
      } 
      res.status(200).send();
    });

  } catch (e) {
    res.status(400).send({'message': e.message});
  }
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};