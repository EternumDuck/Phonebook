const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

app.get('/api/person', (request, response) => {
    response.json(persons)
  })

app.delete('/api/person/:id', (request, response) => {
    let id = Number(request.params.id)
    person = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/person', (request, response) => {
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

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    if(persons.find(person => person.name === body.name)){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    persons = persons.concat(person)
    response.json(person)
})

app.get('/api/person/:id', (request, response) => {
    let id = Number(request.params.id)
    let person = persons.find(person => person.id === id)
    if(person){
        response.json(person)
    } else {
        response.status(404).end()
    }
})


app.get('/info',(request,response) =>{
    response.send('The phonebook has info for ' + person.length + ' people <br>' + new Date())
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    })