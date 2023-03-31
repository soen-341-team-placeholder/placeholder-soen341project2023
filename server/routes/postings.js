const express = require('express');
// const axios = require('axios');
const authenticateToken = require('../auth/token_validator');
const router = express.Router();
const Posting = require('../models/Posting');

router.get('/', authenticateToken, async (req, res) => {
    Posting.find({}).then((postings) => {
        res.status(200).json(postings);
    }).catch((err) => {
        res.status(400).send('message:' + err);
        console.log(err);
    });
});

// let idsss;
router.post('/', authenticateToken, async (req, res) => {
    const userType = req.requester.userType;

    if (userType === 'student') {
        res.status(403).send('message: Forbidden (You are a student, you cannot perform this action)');
        return;
    }

    const newPosting = new Posting(req.body)
    await newPosting.save((err, posting) => {
        if (err) {
            res.status(400).send('message:' + err);
            console.log(err);
        } else {
            res.status(200).json(posting);
        }
    });

    // console.log(`Employer's id: ${newPosting.employerId}`);
    // idsss = newPosting.employerId;
    // const getUsersResponse = await axios.get('/users');
    // console.log('All users:', getUsersResponse.data);
});

router.get('/:id', authenticateToken, async (req, res) => {
    Posting.findById(req.params.id).then((posting) => {
        if (!posting) {
            res.status(404).send('message: Posting not found');
            return;
        }
        
        res.status(200).json(posting);
    }).catch((err) => {
        res.status(400).send('message:' + err);
        console.log(err);
    });
});

router.patch('/:id', authenticateToken, async (req, res) => {
    // Get requester user information
    const userType = req.requester.userType;
    const userId = req.requester._id;

    let posting = await Posting.findById(req.params.id).catch((err) => {
        res.status(400).send('message:' + err);
        console.log(err);
    });

    if (!posting) {
        res.status(404).send('message: Posting not found');
        return;
    }

    // Allow only the owner or the admin to edit the posting
    if (posting.employerId.toString() !== userId.toString() && userType !== 'admin') {
        res.status(403).send('message: Forbidden');
        return;
    }

    // Edit the posting with the new information
    Object.keys(req.body).forEach((key) => {
        posting[key] = req.body[key];
    });

    posting.save((err, posting) => {
        if (err) {
            res.status(400).send('message:' + err);
            console.log(err);
        } else {
            res.status(200).json(posting);
        }
    });
});

router.delete('/:id', authenticateToken, async (req, res) => {
    // Get requester information
    const userType = req.requester.userType;
    const userId = req.requester._id;

    const posting = await Posting.findById(req.params.id).catch((err) => {
        res.status(400).send('message:' + err);
        console.log(err);
    });

    if (!posting) {
        res.status(404).send('message: Posting not found');
        return;
    }

    // Allow only the owner or the admin to delete the posting
    if (posting.employerId.toString() !== userId.toString() && userType !== 'admin') {
        res.status(403).send('message: Forbidden');
        return;
    }

    posting.remove().catch((err) => { // Delete the posting
        res.status(400).send('message:' + err);
        console.log(err);
    });

    res.status(200).send('message: Posting deleted');
});

module.exports = router;