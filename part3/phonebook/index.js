const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const morgan = require("morgan");
const cors = require("cors");
const Phonebook = require("./models/phonebook");
require("dotenv").config();

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

const generateId = () => {
  return Math.floor(Math.random() * (1000 - 0 + 1) + 0);
};

morgan.token("body", function(req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/info", (req, res) => {
  let time = Date(Date.now()).toString();
  res.write("<p>Phonebook has info for " + Phonebook.length + " people</p>");
  res.write("<p>" + time + "</p>");
});

app.get("/api/persons", (req, res) => {
  Phonebook.find({}).then((persons) => {
    res.json(persons);
  });
});

app.post("/api/persons", (req, res, next) => {
  const person = new Phonebook({
    name: req.body.name,
    number: req.body.number,
    id: generateId()
  });
  if (person.name == "" || person.number == "") {
    res.json({
      error: "The name or number is missing"
    });
  }

  // const findSameName = persons.map((pp) => {
  //   let compare = pp.name === person.name;
  //   if (compare == true)
  //     res.json({
  //       error: 'name must be unique'
  //     });
  // });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((err) => next(err));
});

app.get("/api/persons/:id", (req, res) => {
  console.log("try");
  Phonebook.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const data = {
    name: req.body.name,
    number: req.body.number
  };

  Phonebook.findByIdAndUpdate(req.params.id, data, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((err) => {
      next(err);
    });
});

app.delete("/api/persons/:id", (req, res, next) => {
  Phonebook.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
