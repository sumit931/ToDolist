const mongoose = require("mongoose");
const TodoSchema = new mongoose.Schema({
    id: {type: Number, required: true}, 
    task: {type: String , required: true}, 
    complete: {type: Boolean, default: false}
}, {
    collection: 'my To-do'
})
const model = mongoose.model('TodoModel', TodoSchema)

module.exports = model;