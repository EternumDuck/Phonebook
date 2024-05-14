const mongoose = require('mongoose');

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://omerhanyigitbaba:${password}@openstack.e4fkepf.mongodb.net/People?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);  // Allow deprecated queries (optional)

mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

// Check for add or list command
if (process.argv.length < 5) {
  Person.find({})
    .then(result => {
      if (result.length === 0) {
        console.log('No persons found in the database.');
      } else {
        console.log('List of persons:');
        result.forEach(person => console.log(person.name, person.number)); // Access properties directly
      }
    })
    .catch(error => console.error('Error fetching persons:', error))
    .finally(() => mongoose.connection.close()); // Close connection even on error
} else {
  const person = new Person({ name, number });

  person.save()
    .then(result => {
      console.log('Person saved!');
      console.log('Name:', result.name);
      console.log('Number:', result.number);
    })
    .catch(error => console.error('Error saving person:', error))
    .finally(() => mongoose.connection.close()); // Close connection even on error
}
