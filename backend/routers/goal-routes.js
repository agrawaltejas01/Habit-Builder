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

        await database.addGoal(req, res);

    }

    catch (error) {
        console.log(chalk.red("Error in calling POST /goal/ : " + error.message));
        res.status(error.status).send(false);
    }
})

router.route("/:habitId").get(async (req, res) => {

    try {
        // Validate Request Body
        if (!requestBodyValidator.getGoalReqBody(req)) {
            throw new errorBody("Invalid Body Recieved", 400);
        }

        // Get from dataBase
        var goal = await database.getGoal(req, res);

        // No Habit was found
        if (!goal) {
            console.log(chalk.yellow("No Goal was found with given habitId"));
            res.status(200).send([]);
        }

        var response = {
            date: goal.goal.date,
            time: goal.goal.time,
            frequency: goal.goal.frequency
        }

        console.log(chalk.green("Successful request to GET /goal/:habitId"));
        res.status(200).send(response);
    }

    catch (error) {
        console.log(chalk.red("Error in calling GET /goal/:habitId : " + error.message));
        res.status(error.status).send([]);
    }
})

module.exports = router;