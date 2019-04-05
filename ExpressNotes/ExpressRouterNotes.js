/*
An Express router provides a subset of Express methods. 
To create an instance of one, we invoke the .Router() method on the top-level Express import.
To use a router, we mount it at a certain path using app.use() and pass in the router as the second argument. 

KEEP your Router in a seperate file to avoid code bloat!!!!
*/

const express = require("express");
const app = express();

const {
  getElementById,
  getIndexById,
  updateElement,
  seedElements,
  createElement
} = require("./utils");

const PORT = process.env.PORT || 4001;
// Use static server to serve the Express Yourself Website
app.use(express.static("public"));

const expressions = [];
seedElements(expressions, "expressions");
const animals = [];
seedElements(animals, "animals");

//Creating your Router
const expressionsRouter = express.Router();
app.use("/expressions", expressionsRouter);

// Get all expressions using our Express Router
expressionsRouter.get("/", (req, res, next) => {
  res.send(expressions);
});

// Get a single expression
app.get("/expressions/:id", (req, res, next) => {
  const foundExpression = getElementById(req.params.id, expressions);
  if (foundExpression) {
    res.send(foundExpression);
  } else {
    res.status(404).send();
  }
});

// Update an expression
app.put("/expressions/:id", (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    updateElement(req.params.id, req.query, expressions);
    res.send(expressions[expressionIndex]);
  } else {
    res.status(404).send();
  }
});

// Create an expression
app.post("/expressions", (req, res, next) => {
  const receivedExpression = createElement("expressions", req.query);
  if (receivedExpression) {
    expressions.push(receivedExpression);
    res.status(201).send(receivedExpression);
  } else {
    res.status(400).send();
  }
});

// Delete an expression
app.delete("/expressions/:id", (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    expressions.splice(expressionIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

// Get all animals
app.get("/animals", (req, res, next) => {
  res.send(animals);
});

// Get a single animal
app.get("/animals/:id", (req, res, next) => {
  const animal = getElementById(req.params.id, animals);
  if (animal) {
    res.send(animal);
  } else {
    res.status(404).send();
  }
});

// Create an animal
app.post("/animals", (req, res, next) => {
  const receivedAnimal = createElement("animals", req.query);
  if (receivedAnimal) {
    animals.push(receivedAnimal);
    res.status(201).send(receivedAnimal);
  } else {
    res.status(400).send();
  }
});

// Update an animal
app.put("/animals/:id", (req, res, next) => {
  const animalIndex = getIndexById(req.params.id, animals);
  if (animalIndex !== -1) {
    updateElement(req.params.id, req.query, animals);
    res.send(animals[animalIndex]);
  } else {
    res.status(404).send();
  }
});

// Delete a single animal
app.delete("/animals/:id", (req, res, next) => {
  const animalIndex = getIndexById(req.params.id, animals);
  if (animalIndex !== -1) {
    animals.splice(animalIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

///Refactored to a seperate file called expressions.js

const express = require("express");
const {
  seedElements,
  getElementById,
  createElement,
  updateElement,
  getIndexById
} = require("./utils");

let expressions = [];
seedElements(expressions, "expressions");

const expressionsRouter = express.Router();

module.exports = expressionsRouter;

// Get all expressions
expressionsRouter.get("/", (req, res, next) => {
  res.send(expressions);
});

///////
/*
Matching In Nested Routers
The main app.js file can then call it

const expressionsRouter = require('./expressions.js');
app.use('/expressions', expressionsRouter);
*/

/*
NESTED ROUTER MATCHING
The full path of a request can be segmented.

If the path does not match the first .get() method at /. 
The Express server moves on to the next route, which has a route parameter of /:id, so it matches! 
This route handles the necessary logic and sends the response.

Routers can be nested as many times as necessary for an application, so understanding 
nested route matching is important for created complicated APIs.
*/

///
//Full CRUD refactor for Router file expressions.js
const express = require("express");

const {
  getElementById,
  getIndexById,
  updateElement,
  seedElements,
  createElement
} = require("./utils");

let expressions = [];
seedElements(expressions, "expressions");

expressionsRouter = express.Router();

// Get all expressions
expressionsRouter.get("/", (req, res, next) => {
  res.send(expressions);
});

// Get a single expression
expressionsRouter.get("/:id", (req, res, next) => {
  const foundExpression = getElementById(req.params.id, expressions);
  if (foundExpression) {
    res.send(foundExpression);
  } else {
    res.status(404).send();
  }
});

// Update an expression
expressionsRouter.put("/:id", (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    updateElement(req.params.id, req.query, expressions);
    res.send(expressions[expressionIndex]);
  } else {
    res.status(404).send();
  }
});

// Create an expression
expressionsRouter.post("/", (req, res, next) => {
  const receivedExpression = createElement("expressions", req.query);
  if (receivedExpression) {
    expressions.push(receivedExpression);
    res.status(201).send(receivedExpression);
  } else {
    res.status(400).send();
  }
});

// Delete an expression
expressionsRouter.delete("/:id", (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    expressions.splice(expressionIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = expressionsRouter;
