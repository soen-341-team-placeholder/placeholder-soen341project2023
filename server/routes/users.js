const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const authenticateToken = require('../auth/token_validator')
const router = express.Router()

router.get('/', authenticateToken, async (req, res) => {
    const email = req.query.email;

    // Get requester user type and email
    const userEmail = req.requester.email;
    const userType = req.requester.userType;
    
    // User has provided an email, thus search for a specific user with that email
    if (email != null) {

        if (userType === 'admin' || userEmail === email) {
            User.findOne({ email: email }, (err, user) => {
                if (err) {
                    res.status(400).send('message:' + err);
                    console.log(err);
                } else if (user) {
                    user.password = undefined;
                    res.status(200).json(user);
                } else {
                    res.status(404).send('message: User not found');
                }
            });
        }
        else {
            res.status(403).send('message: Forbidden');
        }
        return;
    }

    // User has not provided an email, thus return all users
    if (userType != 'admin') {
        res.status(403).send('message: Forbidden');
        return;
    }

    User.find({}).then((users) => { // Find all users
        // Remove password from each user
        users.forEach((user) => {
            user.password = undefined;
        });
        res.status(200).json(users);

    }).catch((err) => {
        res.status(400).send('message:' + err);
        console.log(err);
    });
});

// Create a new user
router.post('/', async (req, res) => {
    const newUser = new User(req.body);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    newUser.save((err, user) => {
        if (err) {
            res.status(400).send('message:' + err);
            console.log(err);
        } else {
            user.password = undefined;
            res.status(201).json(user);
        }
    });
});

// get user by id
router.get('/:id', getUser, authenticateToken, async (req, res) => {
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (error) {
        res.status(400).send("message" + err.message)
    }
})

router.patch('/', async (req, res) => {
    res.sendStatus(200)
})

//update user by id
router.patch('/:id', authenticateToken, getUser, async (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, age, userType } = req.body;

    try{
    const id = req.params.id;
    const { firstName, lastName, age, userType } = req.body;
  
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { firstName, lastName,age, userType },
      { new: true } // return the updated document
    )
  
    if (!updatedUser) {
      return res.status(404).send(`User with ID ${id} not found`);
    }
  
    res.send(`User with ID ${id} has been updated`);
    } catch (error) {
    console.error(error);
    res.status(500).send('Server error')
    }
})

router.delete('/:id', authenticateToken, getUser, async (req, res) => {

    const id = req.params.id;
    try {
        // Find and delete the user with the specified ID from the database
        const deletedUser = await User.findOneAndDelete({ _id: id });

        if (!deletedUser) {
            return res.status(404).send(`User with ID ${id} not found`);
        }

        res.send(`User with ID ${id} has been deleted`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }

})

//find user by id
async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'cannot find user' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.user = user
    next()
}

module.exports = router