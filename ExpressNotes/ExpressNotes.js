//Starting A Server
// Import the express library here
const express = require("express");
// Instantiate the app here
const app = express();

const PORT = process.env.PORT || 4001;

// Invoke the app's `.listen()` method below:
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

///////
///Routes
const express = require("express");
const app = express();

const PORT = process.env.PORT || 4001;
// Use static server to serve the Express Yourself Website
app.use(express.static("public"));

// Open a call to `app.get()` below:
app.get("/expressions", (req, res, next) => {});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

///
//Sending A Response
const express = require("express");
const app = express();

// Serves Express Yourself website
app.use(express.static("public"));

const { getElementById, seedElements } = require("./utils");

const expressions = [];
seedElements(expressions, "expressions");

const PORT = process.env.PORT || 4001;
// Use static server to serve the Express Yourself Website
app.use(express.static("public"));

app.get("/expressions", (req, res, next) => {
  res.send(expressions); //Send Expressions Array
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

/*
Matching Route Paths
Express tries to match requests by route, meaning that if we send a request to

Express searches through routes in the order that they are registered in your code. 
The first one that is matched will be used, and its callback will be called.

If there are no matching routes registered, or the Express server has not sent a response at the end of all matched routes, 
it will automatically send back a 404 Not Found response
*/

/*
route parameters. 
Parameters are route path segments that begin with : in their Express route definitions. They act as wildcards, 
matching any text at that path segment. For example /monsters/:id will match both/monsters/1 and /monsters/45
*/

///
///Getting A Single Expression
const express = require("express");
const app = express();

// Serves Express Yourself website
app.use(express.static("public"));

const { getElementById, seedElements } = require("./utils");

const expressions = [];
seedElements(expressions, "expressions");

const PORT = process.env.PORT || 4001;
// Use static server to serve the Express Yourself Website
app.use(express.static("public"));

app.get("/expressions", (req, res, next) => {
  res.send(expressions);
});

app.get("/expressions/:id", (req, res, next) => {
  //Get element by id
  const foundExpression = getElementById(req.params.id, expressions);
  res.send(foundExpression);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

///
///Setting Status Codes

const express = require("express");
const app = express();

// Serves Express Yourself website
app.use(express.static("public"));

const { getElementById, seedElements } = require("./utils");

const expressions = [];
seedElements(expressions, "expressions");

const PORT = process.env.PORT || 4001;
// Use static server to serve the Express Yourself Website
app.use(express.static("public"));

app.get("/expressions", (req, res, next) => {
  res.send(expressions);
});

app.get("/expressions/:id", (req, res, next) => {
  const foundExpression = getElementById(req.params.id, expressions);
  if (foundExpression) {
    res.send(foundExpression);
  } else {
    res.status(404).send(); //If we can't find what we're looking for send this status code
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

/*
Matching Longer Paths
Parameters are extremely helpful in making server routes dynamic and able to respond to different inputs. Route parameters will match anything in their specific part of the path, so a route matching /monsters/:name would match all the following request paths:

/monsters/hydra
/monsters/jörmungandr
/monsters/manticore
/monsters/123
*/

///
///PUT
/*
PUT, POST, and DELETE. Express provides methods for each one: app.put(), app.post(), and app.delete().

PUT requests are used for updating existing resources. In our Express Yourself machine, a 
PUT request will be used to update the name or emoji of an expression already saved in our database. 
For this reason, we will need to include a unique identifier as a route parameter to determine which specific resource to update.
*/
const express = require("express");
const app = express();

// Serves Express Yourself website
app.use(express.static("public"));

const { getElementById, seedElements } = require("./utils");

const expressions = [];
seedElements(expressions, "expressions");

const PORT = process.env.PORT || 4001;
// Use static server to serve the Express Yourself Website
app.use(express.static("public"));

app.get("/expressions", (req, res, next) => {
  res.send(expressions);
});

app.get("/expressions/:id", (req, res, next) => {
  const foundExpression = getElementById(req.params.id, expressions);
  if (foundExpression) {
    res.send(foundExpression);
  } else {
    res.status(404).send();
  }
});

// Add your PUT route handler below:
app.put("/expressions/:id", (req, res, next) => {});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

///
//Queries
/*
 Query strings appear at the end of the path in URLs, and they are indicated with a ? character. For instance, 
 in /monsters/1?name=chimera&age=1, the query string is name=chimera&age=1 and the path is /monsters/1/
*/
const express = require("express");
const app = express();

// Serves Express Yourself website
app.use(express.static("public"));

const {
  getElementById,
  getIndexById,
  updateElement,
  seedElements,
  createElement
} = require("./utils");

const expressions = [];
seedElements(expressions, "expressions");

const PORT = process.env.PORT || 4001;
// Use static server to serve the Express Yourself Website
app.use(express.static("public"));

app.get("/expressions", (req, res, next) => {
  res.send(expressions);
});

app.get("/expressions/:id", (req, res, next) => {
  const foundExpression = getElementById(req.params.id, expressions);
  if (foundExpression) {
    res.send(foundExpression);
  } else {
    res.status(404).send();
  }
});

app.put("/expressions/:id", (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions);
  //check id exists
  if (expressionIndex !== -1) {
    updateElement(req.params.id, req.query, expressions);
    res.send(expressions[expressionIndex]);
  } else {
    res.status(404).send();
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

/*
Matching By HTTP Verb
Express matches routes using both path and HTTP method verb. If the path for the first route matches, 
but the method verb is wrong, the Express server 
will continue to the next registered route. This route matches both method and path, 
and so its callback is called, the necessary updating logic is executed, and the response is sent.
*/

////
//Post (Create part of CRUD)
/*
POST is the HTTP method verb used for creating new resources. Because POST routes create new data, 
their paths do not end with a route parameter, but instead end with the type of resource to be created.
For example, to create a new monster, a client would make a POST request to /monsters. 
The client does not know the id of the monster until it is created and sent back by the server, 
therefore POST /monsters/:id doesn’t make sense because a client couldn’t know the unique id of a 
monster before it exists.
Express uses .post()

The HTTP status code for a newly-created resource is 201 Created.
*/

const express = require("express");
const app = express();

// Serves Express Yourself website
app.use(express.static("public"));

const {
  getElementById,
  getIndexById,
  updateElement,
  seedElements,
  createElement
} = require("./utils");

const expressions = [];
seedElements(expressions, "expressions");

const PORT = process.env.PORT || 4001;
// Use static server to serve the Express Yourself Website
app.use(express.static("public"));

app.get("/expressions", (req, res, next) => {
  res.send(expressions);
});

app.get("/expressions/:id", (req, res, next) => {
  const foundExpression = getElementById(req.params.id, expressions);
  if (foundExpression) {
    res.send(foundExpression);
  } else {
    res.status(404).send();
  }
});

app.put("/expressions/:id", (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    updateElement(req.params.id, req.query, expressions);
    res.send(expressions[expressionIndex]);
  } else {
    res.status(404).send();
  }
});

//POST in other words "Create this"
app.post("/expressions", (req, res, next) => {
  const receivedExpression = createElement("expressions", req.query);
  if (receivedExpression) {
    expressions.push(receivedExpression);
    //The HTTP status code for a newly-created resource is 201 Created.
    res.status(201).send(receivedExpression);
  } else {
    res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//////
//DELETE

/*
DELETE is the HTTP method verb used to delete resources. Because DELETE routes delete currently existing data, 
their paths should usually end with a route parameter to indicate which resource to delete.

Express uses .delete() as its method for DELETE requests.

Servers often send a 204 No Content status code if deletion occurs without error.
*/
const express = require("express");
const app = express();

// Serves Express Yourself website
app.use(express.static("public"));

const {
  getElementById,
  getIndexById,
  updateElement,
  seedElements,
  createElement
} = require("./utils");

const expressions = [];
seedElements(expressions, "expressions");
const animals = [];
seedElements(animals, "animals");

const PORT = process.env.PORT || 4001;
// Use static server to serve the Express Yourself Website
app.use(express.static("public"));

app.get("/expressions", (req, res, next) => {
  res.send(expressions);
});

app.get("/expressions/:id", (req, res, next) => {
  const foundExpression = getElementById(req.params.id, expressions);
  if (foundExpression) {
    res.send(foundExpression);
  } else {
    res.status(404).send();
  }
});

app.put("/expressions/:id", (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    updateElement(req.params.id, req.query, expressions);
    res.send(expressions[expressionIndex]);
  } else {
    res.status(404).send();
  }
});

app.post("/expressions", (req, res, next) => {
  const receivedExpression = createElement("expressions", req.query);
  if (receivedExpression) {
    expressions.push(receivedExpression);
    res.status(201).send(receivedExpression);
  } else {
    res.status(400).send();
  }
});

//Delete
app.delete("/expressions/:id", (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    expressions.splice(expressionIndex, 1);
    //Servers often send a 204 No Content status code if deletion occurs without error
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

///CRUD in Express example
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

// Get all expressions
app.get("/expressions", (req, res, next) => {
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
