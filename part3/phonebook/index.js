require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/persons')

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())


morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})


app.get('/info', (req, res) => {
  Person.countDocuments({}).then(count => {
    res.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${new Date()}</p>
    `)
  })
})


app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      next(error);
    })
})

app.put('/api/persons/:id', (req, res) => {

    const body = req.body;

     Person.findById(req.params.id).then(person => {

         if(!person) {
           res.status(400).end()
         } else {

            person.name = body.name
            person.number = body.number

            person.save().then(updatedPerson => {
              res.json(updatedPerson)
            })
         }
     }).catch((err) => next(err))
})


app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' })
  }

  
  Person.findOne({ name: body.name })
    .then(existingPerson => {
      if (existingPerson) {
        
        return res.status(400).json({ 
          error: 'name must be unique' 
        })
      }

      
      const person = new Person({
        name: body.name,
        number: body.number,
      })

      return person.save()
    })
    .then(savedPerson => {
      
      if (savedPerson) {
        res.json(savedPerson)
      }
    })
    .catch(error => {
      next(error);
    })
})

const errorHandler = ( err, req, res, next) => {

  console.log(err.message);

  if (err.name === 'CastError') {

    res.status(400).send({error: 'malformatted id'})
  } 
  
  if ( err.name === 'ValidationError') {

    const firstErrorMessage = Object.values(err.errors)[0].message;
    return res.status(400).json({ error: firstErrorMessage });
  }

  next(err);
  
}

app.use(errorHandler);

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})