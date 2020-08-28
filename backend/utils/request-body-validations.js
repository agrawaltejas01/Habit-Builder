const chalk = require('chalk')
const errorBody = require('./constants').errorBody

var bodyLength = (data, len) => {
    if (Object.keys(data).length != len) {
        console.log(chalk.red("Invalid number of parameter recieved"));
        console.log(chalk.red("Expected number of parameters : " + len + " recieved : " + Object.keys(data).length));
        throw new errorBody("Expected number of parameters : " + len + " recieved : " + Object.keys(data).length, 400);
    }

    return true;
}

var validateHabitId = (data) => {
    if (!data.hasOwnProperty('habitId')) {
        console.log(chalk.red("No habitId provided in request"));
        throw new errorBody("No habitId provided in request", 400);
    }

    if (!Boolean(data.habitId.match(/^[0-9a-f]{24}$/i))) {
        console.log(chalk.red("habitId must be a 24 character long hex(0-9a-f) string"));
        throw new errorBody("habitId must be a 24 character long hex(0-9a-f) string", 400);
    }

    return true;
}

var validateUser = (data) => {
    if (!data.hasOwnProperty("user")) {
        console.log(chalk.red("No user provided in request"));
        throw new errorBody("No user provided in request", 400);
    }

    if (typeof data.user != "string") {
        console.log(chalk.red("user must be a string"));
        throw new errorBody("user must be a string", 400);
    }

    return true;
}


var validateTitle = (data) => {
    if (!data.hasOwnProperty("title")) {
        console.log(chalk.red("No title provided in request"));
        throw new errorBody("No title provided in request", 400);
    }

    if (typeof data.title != "string") {
        console.log(chalk.red("title must be a string"));
        throw new errorBody("title must be a string", 400);
    }

    return true;
}

var validateDescription = (data) => {
    if (!data.hasOwnProperty("description")) {
        console.log(chalk.red("No description provided in request"));
        throw new errorBody("No description provided in request", 400);
    }

    if (typeof data.description != "string") {
        console.log(chalk.red("description must be a string"));
        throw new errorBody("description must be a string", 400);
    }

    return true;
}

var validateFrequency = (data) => {
    if (!data.hasOwnProperty("frequency")) {
        console.log(chalk.red("No frequency provided in request"));
        throw new errorBody("No frequency provided in request", 400);
    }

    if (!Number.isInteger(data.frequency)) {
        console.log(chalk.red("frequency must be a integer number"));
        throw new errorBody("frequency must be a integer number", 400);
    }

    if (data.frequency <= 0) {
        console.log(chalk.red("frequency must be greater than 0 "));
        throw new errorBody("frequency must be greater than 0 ", 400);
    }
    return true;
}

var validateTime = (data) => {
    if (!data.hasOwnProperty("time")) {
        console.log(chalk.red("No time provided in request"));
        throw new errorBody("No time provided in request", 400);
    }

    if (!Number.isInteger(data.time)) {
        console.log(chalk.red("time must be a integer number"));
        throw new errorBody("time must be a integer number", 400);
    }

    if (data.time < 0) {
        console.log(chalk.red("time must be greater than or equal to 0 "));
        throw new errorBody("time must be greater than or equal to 0 ", 400);
    }
    return true;
}

var addHabitReqBody = (data) => {

    return bodyLength(data, 5) && validateUser(data) && validateTitle(data)
        && validateDescription(data) && validateFrequency(data) && validateTime(data)
}

var getHabitReqBody = (req) => {
    return bodyLength(req.body, 0) && validateUser(req.params);
}

var getGoalReqBody = (req) => {
    return bodyLength(req.body, 0) && validateHabitId(req.params);
}

var addGoalReqBody = (data) => {
    return bodyLength(data, 3) && validateHabitId(data)
        && validateFrequency(data) && validateTime(data);
}

module.exports = {
    addHabitReqBody: addHabitReqBody,
    getHabitReqBody: getHabitReqBody,
    getGoalReqBody: getGoalReqBody,
    addGoalReqBody: addGoalReqBody,
}