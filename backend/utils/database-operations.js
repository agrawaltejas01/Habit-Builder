const ObjectId = require('mongodb').ObjectID;
const chalk = require('chalk');
const habit = require('../schema/habit-schema');

var addHabit = async (req, res) => {

    try {
        await habit.create(
            {
                _id: new ObjectId(),
                user: req.body.user,
                title: req.body.title,
                description: req.body.description,
                journal: [],
                goal: [
                    {
                        _id: new ObjectId(),
                        date: new Date(),
                        frequency: req.body.frequency,
                        time: req.body.time
                    }
                ]
            }
        );

        console.log(chalk.green("Successful request to POST /habit"));
        console.log(req.body);
        res.send(true);
    }
    catch (error) {
        console.log(chalk.red("Error in adding habit(POST /habit) for Error : " + error));
        res.status(400).send(false);
    }
};

var getHabits = async (req, res) => {

    try {
        const habits = await habit.find(
            {
                user: req.params.user
            }
        )

        return habits;
    }
    catch (error) {
        console.log(chalk.red("Error in adding habit(GET /habit/:user) for Error : " + error));
        res.status(400).send([]);
    }
};

var getGoal = async (req, res) => {

    try {
        const goal = await habit.aggregate(
            [
                {
                    $match: {
                        _id: ObjectId(req.params.habitId)
                    }
                },

                {
                    $project: {
                        goal: {
                            $arrayElemAt: [
                                "$goal", -1
                            ]
                        }
                    }
                }
            ]
        );

        // console.log(goal)
        return goal[0];
    }
    catch (error) {
        console.log(chalk.red("Error in adding habit(GET /goal/:habitId) for Error : " + error));
        res.status(400).send([]);
    }
};

var addGoal = async (req, res) => {

    try {

        await habit.updateOne(
            {
                _id: ObjectId(req.body.habitId)
            },

            {
                $push: {
                    goal: {
                        _id: new ObjectId(),
                        date: new Date(),
                        frequency: req.body.frequency,
                        time: req.body.time
                    }
                }
            }
        );

        console.log(chalk.green("Successful request to POST /goal"));
        console.log(req.body);
        res.send(true);
    }
    catch (error) {
        console.log(chalk.red("Error in adding goal(POST /habit) for Error : " + error));
        res.status(400).send(false);
    }

};

var addJournal = async (req, res) => {

    try {

        await habit.updateOne(
            {
                _id: ObjectId(req.body.habitId)
            },

            {
                $push: {
                    journal: {
                        _id: new ObjectId(),
                        date: new Date(),
                        frequency: req.body.frequency,
                        time: req.body.time
                    }
                }
            }
        );

        console.log(chalk.green("Successful request to POST /journal"));
        console.log(req.body);
        res.send(true);
    }
    catch (error) {
        console.log(chalk.red("Error in adding journal(POST /journal) for Error : " + error));
        res.status(400).send(false);
    }

};


// Idea, get last 7 days element
// Get last n elements based on today's day
var getJournal = async (req, res, firstDayOfWeek) => {

    try {

        const journal = await habit.aggregate(
            [
                {
                    $match: {
                        _id: ObjectId(req.params.habitId)
                    }
                },

                {
                    $project: {
                        journal: {
                            $filter: {
                                input: "$journal",
                                as: "journal",
                                cond: {

                                    $gte: ["$$journal.date", firstDayOfWeek]

                                }
                            }
                        },
                        _id: 1
                    }
                }
            ]
        );

        // console.log(journal);
        return journal[0];

    }
    catch (error) {
        console.log(chalk.red("Error in adding habit(GET /journal/:habitId) for Error : " + error));
        res.status(400).send([]);
    }
}

module.exports = {
    addHabit: addHabit,
    getHabits: getHabits,
    getGoal: getGoal,
    addGoal: addGoal,
    addJournal: addJournal,
    getJournal: getJournal
}