const mongoose = require('mongoose');

const modelSchema = mongoose.Schema(
    {
        name: {
            type: String
        },
        svg: {
            type: String
        }
    },
    {
        collection: "dev"
    }
)

const Model = mongoose.model("models", modelSchema)

module.exports = Model