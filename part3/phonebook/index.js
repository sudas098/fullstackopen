const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

morgan.token('type', function (req, res) {

    const data = JSON.stringify(req.body);
    return data;
});

app.use(
  morgan(':method :url :status :response-time ms - :res[content-length] :type')
)



let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get('/api/persons', (req, res) => {

    res.json(persons);
});

app.get('/info', (req, res) => {

    const now = new Date();
    console.log(now);
    
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
              <p>${now}</p>`);
    
});

app.get('/api/persons/:id', (req, res) => {

    const id = req.params.id;
    const person = persons.find((person) => person.id === id);
   
    if (person) {
    res.json(person);
    } else {

        res.status(404).end();
    }
});

const generateId = () => {

   let id;

   do {

       id = String(Math.floor(Math.random() * 1000000));
   } while ( persons.find(person => person.id === id));

   return id;
}

app.post('/api/persons', (req,res) => {

    const body = req.body;
    const sameName = persons.find((p) => p.name === body.name);

    if (!body.name || !body.number) {

       return res.status(400).json({
            error: 'Enter Both Field'
        })
    } else if (sameName) {
       
        return res.status(400).json({
            error: 'Name must be unique' 


        })

    } else {

    const person = {

        "id": generateId(),
        "name": body.name,
        "number": body.number,
        
    }

    persons = persons.concat(person);
    res.json(persons);

  }
})

app.delete('/api/persons/:id', (req, res) => {

    const id = req.params.id;
    persons = persons.filter(person => person.id !== id);

    res.status(204).end();
});




const PORT = 5001;
app.listen(PORT, () => {

    console.log(`server is running on port ${PORT}`);
})
