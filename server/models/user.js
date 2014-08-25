var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    local: {
        email: {type: String, required: true},
        password: {type: String, required: true }
    },
    facebook: {
        id: {type: String, required: true},
        token: {type: String, required: true},
        name: {type: String, required: true},
        email: {type: String, required: true}
    }

});


// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('user', UserSchema);
