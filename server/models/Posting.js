const mongoose = require('mongoose');

const postingSchema = new mongoose.Schema({
    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    company: {
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        companyName: {
            type: String,
            required: true
        }
    },
    description: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    pendingApplicantsIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    ],
    interviewApplicantIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    ],
    acceptedApplicantIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    ],
    rejectedApplicantIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    ]
});

module.exports = mongoose.model('Posting', postingSchema);