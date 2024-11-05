const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());

// Custom token for morgan to log the request body
morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});

// Middleware for logging requests
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// Hardcoded list of phonebook entries
let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" },
];

// Route for Exercise 3.1: Return JSON list of persons
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

// Route for Exercise 3.2: Display info page with count and current time
app.get("/info", (req, res) => {
  const currentTime = new Date();
  const totalEntries = persons.length;
  res.send(
    `<p>Phonebook has info for ${totalEntries} people</p>
     <p>${currentTime}</p>`
  );
});

// Route for Exercise 3.3: Display the information for a single phonebook entry
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).send({ error: "Person not found" });
  }
});

// Route for Exercise 3.4: Delete a single phonebook
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

// Route for Exercise 3.5 & 3.6: Add a new phonebook entry and include error handling
app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name or number missing" });
  }

  if (persons.find((person) => person.name === name)) {
    return res.status(400).json({ error: "Name must be unique" });
  }

  const newPerson = {
    id: Math.floor(Math.random() * 1000).toString(),
    name,
    number,
  };
  persons = persons.concat(newPerson);
  res.status(201).json(newPerson);
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
