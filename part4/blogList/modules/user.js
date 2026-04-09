const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
         type: String,
         required: true,
         unique: true
    },
    name: {
         type: String,
         required: true,
         
    },
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Blog'
        }
    ]
});

userSchema.set('toJSON', {
    transform: (document, return_Object) => {
        return_Object.id = return_Object._id.toString();
        delete return_Object._id;
        delete return_Object.__v;
        delete return_Object.passwordHash;
    }
});

module.exports = mongoose.model('User', userSchema);