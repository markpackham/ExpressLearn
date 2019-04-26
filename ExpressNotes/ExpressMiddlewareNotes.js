/*
Middleware is code that executes between a server receiving a request and sending a response. It operates on the boundary, so to speak, between those two HTTP actions.

In Express, middleware is a function. Middleware can perform logic on the request and response objects, such as: inspecting a request, 
performing some logic based on the request, attaching information to the response, attaching a status to the response, sending the response back to the user, 
or simply passing the request and response to another middleware. Middleware can do any combination of those things or anything else a Javascript function can do.

An Express application is essentially a series of middleware function calls.


An Express middleware is a function with three parameters: (req, res, next). The sequence is expressed by a set of callback functions invoked progressively after each middleware performs its purpose. 
The third argument to a middleware function, next, should get explicitly called as the last part of the middleware’s body. This will hand off the processing 
of the request and the construction of the response to the next middleware in the stack.

Express routes are middleware. Every route created in Express is also a middleware function handling the request and response objects at that part of the stack. 
Express routes also have the option of sending a response body and status code and closing the connection. These two features are a byproduct of Express routes being middleware, 
because all Express middleware functions have access to the request, the response, and the next middleware in the stack.
next is called at the end of the middleware callback function.



path
description: The path for which the middleware function is invoked; can be any of:
A string representing a path.
A path pattern.
A regular expression pattern to match paths.
An array of combinations of any of the above.

*/

//Middleware Example
const express = require("express");
const app = express();

app.use(express.static("public"));

const PORT = process.env.PORT || 4001;

const jellybeanBag = {
  mystery: {
    number: 4
  },
  lemon: {
    number: 5
  },
  rootBeer: {
    number: 25
  },
  cherry: {
    number: 3
  },
  licorice: {
    number: 1
  }
};

const bodyParser = (req, res, next) => {
  let queryData = "";
  req.on("data", data => {
    data = data.toString();
    queryData += data;
  });
  req.on("end", () => {
    if (queryData) {
      req.body = JSON.parse(queryData);
    }
    next();
  });
};

// Logging Middleware
app.use((req, res, next) => {
  console.log(`${req.method} Request Received`);
  next();
});

app.use("/beans/:beanName", (req, res, next) => {
  const beanName = req.params.beanName;
  if (!jellybeanBag[beanName]) {
    console.log("Response Sent");
    return res.status(404).send("Bean with that name does not exist");
  }
  req.bean = jellybeanBag[beanName];
  req.beanName = beanName;
  next();
});

app.get("/beans/", (req, res, next) => {
  res.send(jellybeanBag);
  console.log("Response Sent");
});

//use bodyParser
app.post("/beans/", bodyParser, (req, res, next) => {
  const body = req.body;
  const beanName = body.name;
  if (jellybeanBag[beanName] || jellybeanBag[beanName] === 0) {
    return res.status(400).send("Bean with that name already exists!");
  }
  const numberOfBeans = Number(body.number) || 0;
  jellybeanBag[beanName] = {
    number: numberOfBeans
  };
  res.send(jellybeanBag[beanName]);
  console.log("Response Sent");
});

app.get("/beans/:beanName", (req, res, next) => {
  res.send(req.bean);
  console.log("Response Sent");
});

app.post("/beans/:beanName/add", bodyParser, (req, res, next) => {
  const numberOfBeans = Number(req.body.number) || 0;
  req.bean.number += numberOfBeans;
  res.send(req.bean);
  console.log("Response Sent");
});

app.post("/beans/:beanName/remove", bodyParser, (req, res, next) => {
  const numberOfBeans = Number(req.body.number) || 0;
  if (req.bean.number < numberOfBeans) {
    return res.status(400).send("Not enough beans in the jar to remove!");
  }
  req.bean.number -= numberOfBeans;
  res.send(req.bean);
  console.log("Response Sent");
});

app.delete("/beans/:beanName", (req, res, next) => {
  const beanName = req.beanName;
  jellybeanBag[beanName] = null;
  res.status(204).send();
  console.log("Response Sent");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

/////
/////
//// use morgan to replace console.log("Response Sent");
const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.static("public"));

const PORT = process.env.PORT || 4001;

const jellybeanBag = {
  mystery: {
    number: 4
  },
  lemon: {
    number: 5
  },
  rootBeer: {
    number: 25
  },
  cherry: {
    number: 3
  },
  licorice: {
    number: 1
  }
};

const bodyParser = (req, res, next) => {
  let queryData = "";
  req.on("data", data => {
    data = data.toString();
    queryData += data;
  });
  req.on("end", () => {
    if (queryData) {
      req.body = JSON.parse(queryData);
    }
    next();
  });
};

// Logging Middleware
app.use((req, res, next) => {
  morgan("tiny");
  next();
});

app.use("/beans/:beanName", (req, res, next) => {
  const beanName = req.params.beanName;
  if (!jellybeanBag[beanName]) {
    morgan("tiny");
    return res.status(404).send("Bean with that name does not exist");
  }
  req.bean = jellybeanBag[beanName];
  req.beanName = beanName;
  next();
});

app.get("/beans/", (req, res, next) => {
  res.send(jellybeanBag);
  morgan("tiny");
});

app.post("/beans/", bodyParser, (req, res, next) => {
  const body = req.body;
  const beanName = body.name;
  if (jellybeanBag[beanName] || jellybeanBag[beanName] === 0) {
    return res.status(400).send("Bean with that name already exists!");
  }
  const numberOfBeans = Number(body.number) || 0;
  jellybeanBag[beanName] = {
    number: numberOfBeans
  };
  res.send(jellybeanBag[beanName]);
  morgan("tiny");
});

app.get("/beans/:beanName", (req, res, next) => {
  res.send(req.bean);
  morgan("tiny");
});

app.post("/beans/:beanName/add", bodyParser, (req, res, next) => {
  const numberOfBeans = Number(req.body.number) || 0;
  req.bean.number += numberOfBeans;
  res.send(req.bean);
  morgan("tiny");
});

app.post("/beans/:beanName/remove", bodyParser, (req, res, next) => {
  const numberOfBeans = Number(req.body.number) || 0;
  if (req.bean.number < numberOfBeans) {
    return res.status(400).send("Not enough beans in the jar to remove!");
  }
  req.bean.number -= numberOfBeans;
  res.send(req.bean);
  morgan("tiny");
});

app.delete("/beans/:beanName", (req, res, next) => {
  const beanName = req.beanName;
  jellybeanBag[beanName] = null;
  res.status(204).send();
  morgan("tiny");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

///
///
///use morgan "dev" to log stuff
/*
Concise output colored by response status for development use. The :status token will be colored red for server error codes, 
yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.

:method :url :status :response-time ms - :res[content-length]
*/
const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(express.static("public"));

const PORT = process.env.PORT || 4001;

const jellybeanBag = {
  mystery: {
    number: 4
  },
  lemon: {
    number: 5
  },
  rootBeer: {
    number: 25
  },
  cherry: {
    number: 3
  },
  licorice: {
    number: 1
  }
};

const bodyParser = (req, res, next) => {
  let queryData = "";
  req.on("data", data => {
    queryData += data;
  });
  req.on("end", () => {
    if (queryData) {
      req.body = JSON.parse(queryData);
    }
    next();
  });
};

// Logging Middleware
app.use(morgan("dev"));

app.use("/beans/:beanName", (req, res, next) => {
  const beanName = req.params.beanName;
  if (!jellybeanBag[beanName]) {
    return res.status(404).send("Bean with that name does not exist");
  }
  req.bean = jellybeanBag[beanName];
  req.beanName = beanName;
  next();
});

app.get("/beans/", (req, res, next) => {
  res.send(jellybeanBag);
});

app.post("/beans/", bodyParser, (req, res, next) => {
  const body = req.body;
  const beanName = body.name;
  if (jellybeanBag[beanName] || jellybeanBag[beanName] === 0) {
    return res.status(400).send("Bean with that name already exists!");
  }
  const numberOfBeans = Number(body.number) || 0;
  jellybeanBag[beanName] = {
    number: numberOfBeans
  };
  res.send(jellybeanBag[beanName]);
});

app.get("/beans/:beanName", (req, res, next) => {
  res.send(req.bean);
});

app.post("/beans/:beanName/add", bodyParser, (req, res, next) => {
  const numberOfBeans = Number(req.body.number) || 0;
  req.bean.number += numberOfBeans;
  res.send(req.bean);
});

app.post("/beans/:beanName/remove", bodyParser, (req, res, next) => {
  const numberOfBeans = Number(req.body.number) || 0;
  if (req.bean.number < numberOfBeans) {
    return res.status(400).send("Not enough beans in the jar to remove!");
  }
  req.bean.number -= numberOfBeans;
  res.send(req.bean);
});

app.delete("/beans/:beanName", (req, res, next) => {
  const beanName = req.beanName;
  jellybeanBag[beanName] = null;
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

///
///
///
///use body-paraser (like a Drupal contrib module) instead of doing our own body parsing
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

app.use(express.static("public"));

const PORT = process.env.PORT || 4001;

const jellybeanBag = {
  mystery: {
    number: 4
  },
  lemon: {
    number: 5
  },
  rootBeer: {
    number: 25
  },
  cherry: {
    number: 3
  },
  licorice: {
    number: 1
  }
};

// Logging Middleware
app.use(morgan("dev"));

// Body parsing middleware
app.use(bodyParser.json());

app.use("/:beanName", (req, res, next) => {
  const beanName = req.params.beanName;
  if (!jellybeanBag[beanName]) {
    return res.status(404).send("Bean with that name does not exist");
  }
  req.bean = jellybeanBag[beanName];
  req.beanName = beanName;
  next();
});

app.get("/beans/", (req, res, next) => {
  res.send(jellybeanBag);
});

app.post("/beans/", (req, res, next) => {
  const body = req.body;
  const beanName = body.name;
  if (jellybeanBag[beanName] || jellybeanBag[beanName] === 0) {
    return res.status(400).send("Bag with that name already exists!");
  }
  const numberOfBeans = Number(body.number) || 0;
  jellybeanBag[beanName] = {
    number: numberOfBeans
  };
  res.send(jellybeanBag[beanName]);
});

app.get("/beans/:beanName", (req, res, next) => {
  res.send(req.bean);
});

app.post("/beans/:beanName/add", (req, res, next) => {
  const numberOfBeans = Number(req.body.number) || 0;
  req.bean.number += numberOfBeans;
  res.send(req.bean);
});

app.post("/beans/:beanName/remove", (req, res, next) => {
  const numberOfBeans = Number(req.body.number) || 0;
  if (req.bean.number < numberOfBeans) {
    return res.status(400).send("Not enough beans in the jar to remove!");
  }
  req.bean.number -= numberOfBeans;
  res.send(req.bean);
});

app.delete("/beans/:beanName", (req, res, next) => {
  const beanName = req.beanName;
  jellybeanBag[beanName] = null;
  res.status(204).send();
});

app.put("/beans/:beanName/name", (req, res, next) => {
  const beanName = req.beanName;
  const newName = req.body.name;
  jellybeanBag[newName] = req.bean;
  jellybeanBag[beanName] = null;
  res.send(jellybeanBag[newName]);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

////
////
///
///add error handling
/*
err represents the error object, and we can use it to investigate the error and perform different tasks depending on what kind of error was thrown.
Express has its own error-handler, which catches errors that we haven’t handled. But if we anticipate an operation might fail, we can invoke our error-handling middleware. 
We do this by passing an error object as an argument to next(). 
*/
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

app.use(express.static("public"));

const PORT = process.env.PORT || 4001;

const jellybeanBag = {
  mystery: {
    number: 4
  },
  lemon: {
    number: 5
  },
  rootBeer: {
    number: 25
  },
  cherry: {
    number: 3
  },
  licorice: {
    number: 1
  }
};

// Body-parsing Middleware
app.use(bodyParser.json());

// Logging Middleware
if (!process.env.IS_TEST_ENV) {
  app.use(morgan("dev"));
}

app.use("/beans/:beanName", (req, res, next) => {
  const beanName = req.params.beanName;
  if (!jellybeanBag[beanName]) {
    const error = new Error("Bean with that name does not exist");
    error.status = 404;
    return next(error);
  }
  req.bean = jellybeanBag[beanName];
  req.beanName = beanName;
  next();
});

app.get("/beans/", (req, res, next) => {
  res.send(jellybeanBag);
});

app.post("/beans/", (req, res, next) => {
  const body = req.body;
  const beanName = body.name;
  if (jellybeanBag[beanName] || jellybeanBag[beanName] === 0) {
    const error = new Error("Bean with that name already exists!");
    error.status = 400;
    return next(error);
  }
  const numberOfBeans = Number(body.number) || 0;
  jellybeanBag[beanName] = {
    number: numberOfBeans
  };
  res.send(jellybeanBag[beanName]);
});

app.get("/beans/:beanName", (req, res, next) => {
  res.send(req.bean);
});

app.post("/beans/:beanName/add", (req, res, next) => {
  const numberOfBeans = Number(req.body.number) || 0;
  req.bean.number += numberOfBeans;
  res.send(req.bean);
});

app.post("/beans/:beanName/remove", (req, res, next) => {
  const numberOfBeans = Number(req.body.number) || 0;
  if (req.bean.number < numberOfBeans) {
    const error = new Error("Not enough beans in the jar to remove!");
    error.status = 400;
    return next(error);
  }
  req.bean.number -= numberOfBeans;
  res.send(req.bean);
});

app.delete("/beans/:beanName", (req, res, next) => {
  const beanName = req.beanName;
  jellybeanBag[beanName] = null;
  res.status(204).send();
});

// Add your error handler here:
app.use((err, req, res, next) => {
  if (!err.status) {
    err.status = 500;
  }
  res.status(err.status).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

///
///
///
///use "errorhandler" package to handle errors (like using a Drupal contrib module)
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const errorHandler = require("errorhandler");
app.use(errorHandler());

app.use(express.static("public"));

const PORT = process.env.PORT || 4001;

const jellybeanBag = {
  mystery: {
    number: 4
  },
  lemon: {
    number: 5
  },
  rootBeer: {
    number: 25
  },
  cherry: {
    number: 3
  },
  licorice: {
    number: 1
  }
};

// Body-parsing Middleware
app.use(bodyParser.json());

// Logging Middleware
app.use(morgan("dev"));

app.use("/beans/:beanName", (req, res, next) => {
  const beanName = req.params.beanName;
  if (!jellybeanBag[beanName]) {
    return res.status(404).send("Bean with that name does not exist");
  }
  req.bean = jellybeanBag[beanName];
  req.beanName = beanName;
  next();
});

app.get("/beans/", (req, res, next) => {
  res.send(jellybeanBag);
});

app.post("/beans/", (req, res, next) => {
  const body = req.body;
  const beanName = body.name;
  if (jellybeanBag[beanName] || jellybeanBag[beanName] === 0) {
    return res.status(400).send("Bean with that name already exists!");
  }
  const numberOfBeans = Number(body.number) || 0;
  jellybeanBag[beanName] = {
    number: numberOfBeans
  };
  res.send(jellybeanBag[beanName]);
});

app.get("/beans/:beanName", (req, res, next) => {
  res.send(req.bean);
});

app.post("/beans/:beanName/add", (req, res, next) => {
  const numberOfBeans = Number(req.body.number) || 0;
  req.bean.number += numberOfBeans;
  res.send(req.bean);
});

app.post("/beans/:beanName/remove", (req, res, next) => {
  const numberOfBeans = Number(req.body.number) || 0;
  if (req.bean.number < numberOfBeans) {
    return res.status(400).send("Not enough beans in the jar to remove!");
  }
  req.bean.number -= numberOfBeans;
  res.send(req.bean);
});

app.delete("/beans/:beanName", (req, res, next) => {
  const beanName = req.beanName;
  jellybeanBag[beanName] = null;
  res.status(204).send();
});

app.put("/beans/:beanName/name", (req, res, next) => {
  const beanName = req.beanName;
  const newName = req.body.name;
  jellybeanBag[newName] = req.bean;
  jellybeanBag[beanName] = null;
  res.send(jellybeanBag[newName]);
});

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

////
////
////
///Well refactored/DRY(do not repeat yourself) express example using external libraries/modules
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

app.use(express.static("public"));

const PORT = process.env.PORT || 4001;

const cards = [
  {
    id: 1,
    suit: "Clubs",
    rank: "2"
  },
  {
    id: 2,
    suit: "Diamonds",
    rank: "Jack"
  },
  {
    id: 3,
    suit: "Hearts",
    rank: "10"
  }
];
let nextId = 4;

// Logging
if (!process.env.IS_TEST_ENV) {
  app.use(morgan("short"));
}

// Parsing
app.use(bodyParser.json());

// Find card
app.use("/cards/:cardId", (req, res, next) => {
  const cardId = Number(req.params.cardId);
  const cardIndex = cards.findIndex(card => card.id === cardId);
  if (cardIndex === -1) {
    return res.status(404).send("Card not found");
  }
  req.cardIndex = cardIndex;
  next();
});

const validateCard = (req, res, next) => {
  const newCard = req.body;
  const validSuits = ["Clubs", "Diamonds", "Hearts", "Spades"];
  const validRanks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
    "Ace"
  ];
  if (
    validSuits.indexOf(newCard.suit) === -1 ||
    validRanks.indexOf(newCard.rank) === -1
  ) {
    return res.status(400).send("Invalid card!");
  }
  next();
};

// Get all Cards
app.get("/cards/", (req, res, next) => {
  res.send(cards);
});

// Create a new Card
app.post("/cards/", validateCard, (req, res, next) => {
  const newCard = req.body;
  newCard.id = nextId++;
  cards.push(newCard);
  res.status(201).send(newCard);
});

// Get a single Card
app.get("/cards/:cardId", (req, res, next) => {
  res.send(cards[req.cardIndex]);
});

// Update a Card
app.put("/cards/:cardId", validateCard, (req, res, next) => {
  const newCard = req.body;
  const cardId = Number(req.params.cardId);
  if (!newCard.id || newCard.id !== cardId) {
    newCard.id = cardId;
  }
  cards[req.cardIndex] = newCard;
  res.send(newCard);
});

// Delete a Card
app.delete("/cards/:cardId", (req, res, next) => {
  cards.splice(req.cardIndex, 1);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
