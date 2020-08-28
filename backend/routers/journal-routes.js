const router = require('express').Router();
const chalk = require('chalk');

const database = require('../utils/database-operations');
const requestBodyValidator = require("../utils/request-body-validations");
const errorBody = require('../utils/constants').errorBody

router.route("/").post(async (req, res) => {

    try {
        // Validate Request Body
        if (!requestBodyValidator.addGoalReqBody(req.body)) {
            throw new errorBody("Invalid Body Recieved", 400);
        }

        // Add in dataBase

        await database.addJournal(req, res);

    }

    catch (error) {
        console.log(chalk.red("Error in calling POST /journal/ : " + error.message));
        res.status(error.status).send(false);
    }
});


router.route("/:habitId").get(async (req, res) => {

    try {
        // Validate Request Body
        if (!requestBodyValidator.getGoalReqBody(req)) {
            throw new errorBody("Invalid Body Recieved", 400);
        }

        // Get firstDate of week
        var firstDayOfWeek = new Date();
        var day = firstDayOfWeek.getDay() || 7;
        if (day != 1)
            firstDayOfWeek.setHours(-24 * (day - 1));

        // Get from dataBase
        var journal = await database.getJournal(req, res, firstDayOfWeek);

        // No Habit was found
        if (!journal) {
            console.log(chalk.yellow("No Goal was found with given habitId"));
            res.status(200).send([]);
        }

        var response = []
        journal.journal.forEach((entry) => {
            currentEntry = {
                date: entry.date,
                time: entry.time,
                frequency: entry.frequency
            }

            response.push(currentEntry);
        })

        console.log(chalk.green("Successful request to GET /journal/:habitId"));
        res.status(200).send(response);
    }

    catch (error) {
        console.log(chalk.red("Error in calling GET /journal/:habitId : " + error.message));
        res.status(error.status).send([]);
    }
})


module.exports = router;