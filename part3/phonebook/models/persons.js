const mongoose = require('mongoose');

const url = process.env.MONGODB_URL;

mongoose.connect(url).then(() => {

    console.log('connection establised');
    
}).catch ((err) => console.error(err.message)
);

const personSchema = mongoose.Schema({

    "name": {
        type: String,
        minLength: 3,
        required: true,
    },
    "number":{
        type: String,
        minLength: 8,
        validate:{
            validator: function(v) {
               return /^\d{2,3}-\d+$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },
});

personSchema.set('toJSON', {

    transform: (document, resultObject) => {

        resultObject.id = resultObject._id.toString();
        delete resultObject._id;
        delete resultObject.__v;
    }
});

module.exports = mongoose.model('Person', personSchema);