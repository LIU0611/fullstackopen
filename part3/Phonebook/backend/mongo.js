const mongoose = require('mongoose');
const Person = require('./models/person');

// Retrieve the password from the command-line arguments
const password = process.argv[2];

// Construct the MongoDB connection URL
const url = `mongodb+srv://LIU0611:<19990611>@cluster0.hhxdhcz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Check if the password argument is provided
if (!password) {
  console.log('Please provide the password as an argument');
  process.exit(1);
}

// Configure mongoose to use strict query mode
mongoose.set('strictQuery', false);

// Connect to the MongoDB database
mongoose.connect(url);

// If only the password is provided, list all persons in the phonebook
if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('Phonebook:');
    result.forEach(person => {
      console.log(`${person.name.padEnd(20)} ${person.number}`);
    });
    mongoose.connection.close();
    process.exit(1);
  });
}
// If the password, name, and number are provided, add a new person to the phonebook
else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then(() => {
    console.log('Person saved!');
    mongoose.connection.close();
    process.exit(1);
  });
}
