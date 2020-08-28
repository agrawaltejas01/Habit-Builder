var constants = {
    dataBaseUrl: 'mongodb://127.0.0.1:27017/habit-builder',
}

var errorBody = function (message, status) {
    this.message = message;
    this.status = status;
}

module.exports = {
    constants: constants,
    errorBody: errorBody
}
