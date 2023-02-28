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
    applicantIds: [
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
    ]
});

module.exports = mongoose.model('Posting', postingSchema);