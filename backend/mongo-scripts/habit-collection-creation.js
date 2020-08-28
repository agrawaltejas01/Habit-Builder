// use habit-builder

db.habit.insertOne(
    {
        user: "Tejas",
        title: "Cycling",
        Description: "Go on cycling twice a day for 30 min minimum",
        journal: [
            {
                _id: ObjectId(),
                date: new Date(),
                time: 20,
                frequency: 2
            }
        ],

        goal: [
            {
                _id: ObjectId(),
                date: new Date(),
                time: 420,
                frequency: 14
            }
        ]
    }
)