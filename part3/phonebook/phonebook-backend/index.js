require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
//lets us fetch frontend
app.use(express.static('dist'))
app.use(cors())

morgan.token("object", (request) => {
    return JSON.stringify(request.body);
  });
  app.use(
    morgan(
      ":method :url :status :res[content-length] - :response-time ms :object"
    )
  );

//fetch all persons
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

//fetch info page
app.get('/info', (request, response) => {
    response.send(
        (`
            <div>Phonebook has info for ${persons.length} people</div>
            <br>
            <div>${Date().toLocaleString()}</div>
        `
        )
    )
})

//fetch one person
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

//delete one person
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

//add one person
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'content missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})