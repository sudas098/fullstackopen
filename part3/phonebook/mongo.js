const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://sd544597_db_user:${password}@cluster0.qaoi38l.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

// 1. Connect to the database first
mongoose.connect(url)
  .then(() => {
    // 2. Logic starts only AFTER connection is successful
    if (process.argv.length === 3) {
      // MODE: LIST ALL
      console.log('phonebook:');
      return Person.find({}).then(result => {
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
      });
    } else {
      // MODE: ADD NEW ENTRY
      const name = process.argv[3];
      const number = process.argv[4];

      const person = new Person({
        name: name,
        number: number,
      });

      return person.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
      });
    }
  })
  .catch((err) => console.log(err));