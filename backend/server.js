const express = require('express')
const bodyParser = require('body-parser');
const mongo = require("mongoose");
const cors = require('cors');
const chalk = require('chalk');

const constants = require('./utils/constants').constants

const habitRouter = require('./routers/habit-routes');
const goalRouter = require('./routers/goal-routes');
const journalRouter = require('./routers/journal-routes');

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());

var db = mongo.connect(constants.dataBaseUrl,
    {
        useNewUrlParser: true,
        useCreateIndex: true,

    },
    function (error, response) {
        if (error) {
            console.log(chalk.red("Error in connecting to database"));
            console.log(error);
        }

        else
            console.log(chalk.green("Successfully connected to database habit-builder"));
    }
)

app.use(cors());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/habit', habitRouter);
app.use('/journal', journalRouter);
app.use('/goal', goalRouter);

app.listen(port, () => console.log(chalk.green("API is running on port " + port)));