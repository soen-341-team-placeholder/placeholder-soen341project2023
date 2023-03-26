const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        lowercase: true
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true
    },
    age: {
        type: Number,
        required: true,
        min: 14,
        max: 100
    },
    userType: {
        type: String,
        required: true,
        enum: ['student', 'employer', 'admin'],
        default: 'student'
    },
    biography: {
        type: String,
        required: false
    },
    companyName: {
        type: String,
        required: false
    },
    education: [
        {
            schoolName: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            startDate: {
                type: Date,
                required: true
            },
            endDate: {
                type: Date,
                required: true
            }
        }
    ],
    workExperience: [
        {
            companyName: {
                type: String,
                required: true
            },
            startDate: {
                type: Date,
                required: true
            },
            endDate: {
                type: Date,
                required: false
            }
        }
    ],
    jobOffers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        }
    ],
    creationDate: {
        type: Date,
        default: Date.now(),
        immutable: true
    },
    subscribedTo: [
        {
            type: String,
            required: true
        }
    ]
    ,
    savedPostings: [
        {
            type: String,
            required: true
        }
    ]
    
});

module.exports = mongoose.model('User', userSchema);