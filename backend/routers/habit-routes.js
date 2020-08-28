const router = require('express').Router();
const chalk = require('chalk');

const database = require('../utils/database-operations');
const requestBodyValidator = require("../utils/request-body-validations");
const errorBody = require('../utils/constants').errorBody

router.route("/").post(async (req, res) => {

    try {
        // Validate Request Body
        if (!requestBodyValidator.addHabitReqBody(req.body)) {
            throw new errorBody("Invalid Body Recieved", 400);
        }

        // Check if user is valid

        // Add in dataBase
        database.addHabit(req, res);
    }
    catch (error) {
        console.log(chalk.red("Error in calling POST /habit : " + error.message));
        res.status(error.status).send(false);
    }
});


router.route("/:user").get(async (req, res) => {

    try {
        // Validate Request Body
        if (!requestBodyValidator.getHabitReqBody(req)) {
            throw new errorBody("Invalid Body Recieved", 400);
        }

        // Check if user is valid

        // Get from dataBase
        const habits = await database.getHabits(req, res);

        var response = []
        habits.forEach((habit) => {

            var currentHabit = {
                id: habit._id,
                title: habit.title,
                description: habit.description,
            }

            response.push(currentHabit);
        });

        console.log(chalk.green("Successful request to GET /habit/:user"));
        res.status(200).send(response);
    }

    catch (error) {
        console.log(chalk.red("Error in calling GET /habit/:user : " + error.message));
        res.status(error.status).send([]);
    }
})

module.exports = router;