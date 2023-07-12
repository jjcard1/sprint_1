const {Schema, model} = require("mongoose");

const taskSchema  = new Schema(
    {
        name: {type: "string"},
        description: {type: "string"},
        manager: {type: "string"}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = model('Task', taskSchema)
