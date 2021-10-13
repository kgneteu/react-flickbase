const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate")
const Schema = require("mongoose")
const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required."],
        maxLength: 100,
    },
    content: {
        type: String,
        required: [true, "Content is required."],
    },
    excerpt: {
        type: String,
        required: [true, "Excerpt is required."],
        maLength: 500,
    },
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    director: {
        type: String,
        required: true,
    },
    actors: {
        type: [String],
        required: true,
        validate: {
            validator: (value => value.length > 1),
            message: "At least 2 actors are required."
        }
    },
    status: {
        type: String,
        required: true,
        enum: ['draft', 'public'],
        default: 'draft',
        index: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

ArticleSchema.plugin(aggregatePaginate)

const Article = new mongoose.model('Article', ArticleSchema);
module.exports = {Article}
