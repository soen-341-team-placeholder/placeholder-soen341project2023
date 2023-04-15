const express = require('express')
const router = express.Router()
const User = require('../models/User')
const authenticateToken = require('../auth/token_validator')
const nodemailer = require('nodemailer')

router.post('/', (req,res) => { //sending the email
    const email = req.body.email
    subscribe(email)
    .then(response => res.send(response.message))
    .catch(error => res.status(500).send(error.message))
})

router.patch('/:id', authenticateToken, async (req, res) => {

    const userId = req.params.id;
    const newEmployer = req.body.subscribedTo;

    try {
        const user = await User.findById(userId);

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    const existingNames = user.subscribedTo;
    const uniqueNames = [];

    newEmployer.forEach(name => {
      if (!existingNames.includes(name)) {
        uniqueNames.push(name);
      }
    });

    if (uniqueNames.length === 0) {
      res.status(400).send('Name(s) already exist');
      return;
    }

    user.subscribedTo = [...existingNames, ...uniqueNames];

    await user.save();

    res.status(200).send('Employer Name(s) added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding name(s)');
  }
  });
  

function subscribe(email){
    // User has provided an email, thus search for a specific user with that email
    return new Promise ((resolve , reject) => {
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD // generate a password from app passwords in google 
            }
        });
        const mail_configs ={
            from:'placeholder3412023@gmail.com',
            to: email, //subscriber email
            subject: 'Great News! Your Favorite Employer Has Posted a New Job Opening',
            text:
            "Dear User, \n\n" + 
            "I hope this email finds you in good health and high spirits. We are writing to share some exciting news with you. Your favorite employer has recently posted a new job opening, and we think you would be interested in applying for it.\n\n" +
            "The job opening is for the position you are looking for, and it seems like an excellent fit for someone with your skills and experience. The role requires skills you possess and it offers a competitive salary and benefits package.\n\n" +
            "We know how passionate you are about this industry, and we believe that this opportunity could be a great stepping stone for your career. The application process is straightforward, and you can apply directly through the job portal where it was posted.\n\n" +
            "We wish you all the best in your job search and hope that this opportunity brings you one step closer to achieving your career goals.\n" +
            "Sincerely,\n\n" + 
            "PlaceHolder Team"
        }
        transporter.sendMail(mail_configs , function(error, info){
            if(error){
                console.log(error)
                return reject({message:`An error has occured`})
            }
            return resolve({message:`Email sent succesfuly`})
        })
    })
}

module.exports = router;