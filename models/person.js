const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const phoneValidator = (value) => {
    // Regex for valid phone numbers (2-3 digits)-(6 or more digits)
    const regex = /^\d{2,3}-\d{6,}$/;
    return regex.test(value);
  };

  const personSchema = new mongoose.Schema({
    name: { type: String, required: true ,minlength: 3},
    number: {
    type: String,
    required: true,
    minlength: 8, // Minimum length of 8 for phone numbers
    validate: phoneValidator, // Custom validator for phone format
  },
  });
  

  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  const Person = mongoose.model('Person', personSchema);
  module.exports = mongoose.model('Person', personSchema)
