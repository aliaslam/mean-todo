var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var TodoSchema = new Schema({
    user_id: {type:String, required: true},
    title: {type:String,required: true },
    updated_at: {type:Date, default: Date.now},
    display_order: {type: Number},
    tasks: [{
        title: {type: String, required: true},
        display_order: {type: Number},
        updated_at: {type:Date, default: Date.now},
        completed_at: {type:Date, default: Date.now},
        completed: {type:Boolean}
    }]
});


module.exports = mongoose.model('todo', TodoSchema);

