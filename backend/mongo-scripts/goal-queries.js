db.habit.aggregate(
    [
        {
            $match: {
                _id: ObjectId("5f47b0007a400541e4bebe0a")
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
).pretty()