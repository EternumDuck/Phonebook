const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')


app.use(cors())
app.use(express.json())
app.use(express.static('dist'))


const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

app.get('/api/person', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
    })

app.delete('/api/person/:id', (request, response,next) => {
    const id = request.params.id;
    console.log(id)
    Person.findByIdAndDelete(id)
    .then(result => {
        response.status(204).end()
    }
    )
    .catch(error => next(error))
})

app.post('/api/person', (request, response,next) => {
    const body = request.body

    if(!body){
        return response.status(400).json({
            error: 'content missing'
        })
    }
    if(!body.name){
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if(!body.number){
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedNote => {
        response.json(savedNote)
      }).catch(error => next(error))
})

app.get('/api/person/:id', (request, response,next) => {
    Person.findById(request.params.id)
    .then(person => {
        if(person){
            response.json(person)
        }else{
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.get('/info',(request,response) =>{
    response.send('The phonebook has info for ' + Person.length + ' people <br>' + new Date())
})
app.put('/api/person/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number}
    Person
    .findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
        response.json(updatedPerson)
    })
    .catch(error => next(error))
}
)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    })
    