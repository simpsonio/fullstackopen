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

//fetch info page
app.get('/info', (request, response) => {
    Person.find({})
        .then(persons => {
            response.send(
                (`
                    <div>Phonebook has info for ${persons.length} people</div>
                    <br>
                    <div>${Date().toLocaleString()}</div>
                `
                )
            )
        })
        .catch(error => next(error))
})

//fetch all persons
app.get('/api/persons', (request, response) => {
    Person.find({})
        .then(persons => {
            response.json(persons)
        })
        .catch(error => next(error))
})

//fetch one person
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then(person => {
            response.json(person)
        })
        .catch(error => next(error))
})

//delete one person
app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
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

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

//update person
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const person = {
      name: body.name,
      number: body.number
    }
  
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })

const errorHandler = ( error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id'})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})