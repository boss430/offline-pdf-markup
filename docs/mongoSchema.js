const mongoose = require('mongoose');

const modelSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        svg: {
            type: String,
            require: true
        }
    },
    {
        collection: "dev"
    }
)

const Model = mongoose.model("models", modelSchema)

module.exports = Model