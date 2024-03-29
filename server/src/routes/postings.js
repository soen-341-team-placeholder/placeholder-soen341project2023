const express = require('express');
const authenticateToken = require('../auth/token_validator');
const subscribe = require('../routes/subscribe')
const router = express.Router();
const Posting = require('../models/Posting');
const User = require('../models/User');

router.get('/', authenticateToken, async (req, res) => {
    const employerId = req.query.employerId;
    const studentId = req.query.userId;

    if (employerId != null) {
        Posting.find({employerId: employerId}).then((postings) => {
            res.status(200).json(postings);
        }).catch((err) => {
            res.status(400).send('message:' + err);
            console.log(err);
        });
        return;
    }

    Posting.find({}).then((postings) => {
        if (studentId) {
            let userInPostings = []

            postings.map((posting) => {
                if (posting.pendingApplicantsIds
                    && posting.pendingApplicantsIds.includes(studentId)) {
                    userInPostings.push(posting);

                } else if (posting.interviewApplicantIds
                    && posting.interviewApplicantIds.includes(studentId)) {
                    userInPostings.push(posting);

                } else if (posting.acceptedApplicantIds
                    && posting.acceptedApplicantIds.includes(studentId)) {
                    userInPostings.push(posting);

                } else if (posting.rejectedApplicantIds
                    && posting.rejectedApplicantIds.includes(studentId)) {
                    userInPostings.push(posting);
                }
            })
            res.status(200).json(userInPostings)
        } else
            res.status(200).json(postings);
    }).catch((err) => {
        res.status(400).send('message:' + err);
        console.log(err);
    });
});

router.post('/', authenticateToken, async (req, res) => {
    const userType = req.requester.userType;

    if (userType === 'student') {
        res.status(403).send('message: Forbidden (You are a student, you cannot perform this action)');
        return;
    }

    new Posting(req.body).save(async (err, posting) => {
        if (err) {
            res.status(400).send('message:' + err);
            console.log(err);
        } else {
            res.status(200).json(posting);

            //Notify subscribers
            if (req.requester.subscribers) {
                req.requester.subscribers.forEach((studentId) => {
                    User.findById(studentId).then((student) => {
                        subscribe.sendNewPostingEmail(student.email)
                    })
                })
            }
        }
    });
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

    // // Allow only the owner or the admin to edit the posting
    // if (posting.employerId.toString() !== userId.toString() && userType !== 'admin') {
    //     res.status(403).send('message: Forbidden');
    //     return;
    // }

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