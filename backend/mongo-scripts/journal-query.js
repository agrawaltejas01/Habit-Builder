const { db } = require("../schema/habit-schema")

db.habit.aggregate(
    [
        {
            $match: {
                _id: ObjectId("5f47b431cd1a251abcc41ab5")
            }
        },

        {
            $project: {
                journal: {
                    $filter: {
                        input: "$journal",
                        as: "journal",
                        cond: {

                            $gte: ["$journal.date", today]

                        }
                    }
                }
            }
        }
    ]
).pretty()

db.habit.aggregate(
    [
        {
            $match: {
                _id: ObjectId("5f47b431cd1a251abcc41ab5")
            }
        },

        {
            $unwind: "$journal"
        },

        {
            $match: {
                "journal.date": {
                    $gte: today
                }
            }
        }
    ]
)
