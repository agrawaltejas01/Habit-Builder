const mongo = require('mongoose');
const Schema = mongo.Schema;
const ObjectId = require('mongodb').ObjectID;

const habitSchema = new Schema(
    {
        _id: {
            type: ObjectId,
            required: true
        },

        user: {
            type: String,
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

        journal: [
            {
                _id: {
                    type: ObjectId,
                },

                date: {
                    type: Date,
                },

                time: {
                    type: Number,
                    validate(value) {
                        if (value < 0)
                            throw new Error("Time of trade cannot be less than or equal to 0");
                    }
                },

                frequency: {
                    type: Number,
                    validate(value) {
                        if (value <= 0)
                            throw new Error("frequency of trade cannot be less than or equal to 0");
                    }
                }
            }
        ],

        goal: [
            {
                _id: {
                    type: ObjectId,
                    required: true
                },

                date: {
                    type: Date,
                    default: new Date(),
                },

                time: {
                    type: Number,
                    required: true,
                    validate(value) {
                        if (value < 0)
                            throw new Error("Time of trade cannot be less than or equal to 0");
                    }
                },

                frequency: {
                    type: Number,
                    required: true,
                    validate(value) {
                        if (value <= 0)
                            throw new Error("frequency of trade cannot be less than or equal to 0");
                    }
                }
            }
        ]

    },

    {
        versionKey: false
    }
);

const habit = mongo.model("habit", habitSchema, "habit");
module.exports = habit;