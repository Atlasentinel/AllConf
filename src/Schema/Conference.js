import mongoose from 'mongoose';

const conferenceSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        text: true,
    },
    date: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        text: true,
    },
    img: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        text: true,
    },
    duration: {
        type: String,
    },
    osMap: {
        addressl1: { type: String },
        addressl2: { type: String },
        postalCode: { type: String },
        city: { type: String },
        coordinates: { type: Array },
    },
    speakers: [
        {
            firstname: {
                type: String,
                required: true,
            },
            lastname: {
                type: String,
                required: true,
            },
        },
    ],
    stakeholders: [
        {
            firstname: {
                type: String,
                required: true,
            },
            lastname: {
                type: String,
                required: true,
            },
            job: {
                type: String,
            },
            img: {
                type: String,
            },
        },
    ],
    design: {
        mainColor: {
            type: String,
            required: true,
        },
        secondColor: {
            type: String,
            required: true,
        },
    },
});

const Conference = mongoose.model('Conference', conferenceSchema);

export default Conference;
