//router.param is a powerful tool that we can use to keep our code from repeating core functionality through routes.
//app.param When a specific parameter is present in a route, we can write a function that will perform the necessary lookup and attach it to the req object in subsequent middleware that is run.
/*
app.param([name], callback)
Add callback triggers to route parameters, where name is the name of the parameter or an array of them, and callback is the callback function. 
The parameters of the callback function are the request object, the response object, the next middleware, the value of the parameter and the name of the parameter, in that order.
*/

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.static("public"));

const PORT = process.env.PORT || 4001;

const spiceRack = [
  {
    id: 1,
    name: "cardamom",
    grams: 45
  },
  {
    id: 2,
    name: "pimentn",
    grams: 20
  },
  {
    id: 3,
    name: "cumin",
    grams: 450
  },
  {
    id: 4,
    name: "sichuan peppercorns",
    grams: 107
  }
];

let nextSpiceId = 5;

app.use(bodyParser.json());

// Add your code here:
app.param("spiceId", (req, res, next, id) => {
  const spiceId = Number(id);
  const spiceIndex = spiceRack.findIndex(spice => spice.id === spiceId);

  if (spiceIndex !== -1) {
    req.spiceIndex = spiceIndex;
    next();
  } else {
    res.sendStatus(404);
  }
});

app.get("/spices/", (req, res, next) => {
  res.send(spiceRack);
});

app.post("/spices/", (req, res, next) => {
  const newSpice = req.body.spice;
  if (newSpice.name && newSpice.grams) {
    newSpice.id = nextSpiceId++;
    spiceRack.push(newSpice);
    res.send(newSpice);
  } else {
    res.status(400).send();
  }
});

app.get("/spices/:spiceId", (req, res, next) => {
  res.send(spiceRack[req.spiceIndex]);
});

app.put("/spices/:spiceId", (req, res, next) => {
  spiceRack[req.spiceIndex] = req.body.spice;
  res.send(spiceRack[req.spiceIndex]);
});

app.delete("/spices/:spiceId", (req, res, next) => {
  spiceRack.splice(req.spiceIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

///
///
///
///Merge Parameters
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.static("public"));

const PORT = process.env.PORT || 4001;

app.use(bodyParser.json());

const spiceRacks = [
  {
    id: 1,
    location: "Kitchen Countertop"
  },
  {
    id: 2,
    location: "Pantry"
  },
  {
    id: 3,
    location: "Outdoor Barbecue"
  }
];

let nextSpiceRackId = 4;

app.param("spiceRackId", (req, res, next, id) => {
  const idToFind = Number(id);
  const rackIndex = spiceRacks.findIndex(
    spiceRack => spiceRack.id === idToFind
  );
  if (rackIndex !== -1) {
    req.spiceRack = spiceRacks[rackIndex];
    req.spiceRackIndex = rackIndex;
    next();
  } else {
    res.status(404).send("Spice Rack Not Found.");
  }
});

app.get("/spice-racks/", (req, res, next) => {
  res.send(spiceRacks);
});

app.post("/spice-racks/", (req, res, next) => {
  const newRack = req.body.spiceRacks;
  newRack.id = nextSpiceRackId++;
  spiceRacks.push(newRack);
  res.send(newRack);
});

app.get("/spice-racks/:spiceRackId", (req, res, next) => {
  res.send(req.spiceRack);
});

app.put("/spice-racks/:spiceRackId", (req, res, next) => {
  const updatedRack = req.body.spiceRack;
  if (req.spiceRack.id !== updatedRack.id) {
    res.status(400).send("Cannot update Spice Rack Id");
  } else {
    spiceRacks[req.spiceRackIndex] = updatedRack;
    res.send(spiceRacks[req.spiceRackIndex]);
  }
});

app.delete("/spice-racks/:spiceRackId", (req, res, next) => {
  spiceRacks.splice(req.spiceRackIndex, 1);
  res.status(204).send();
});
//call the external file
const spicesRouter = require("./spicesRouter");

// Write your code below:
app.use("/spice-racks/:spiceRackId/spices", spicesRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

//
//The file required spicesRouter.js
const router = require("express").Router({ mergeParams: true });

const spices = [
  {
    id: 1,
    name: "cardamom",
    grams: 45,
    spiceRackId: 1
  },
  {
    id: 2,
    name: "pimentn",
    grams: 20,
    spiceRackId: 1
  },
  {
    id: 3,
    name: "cumin",
    grams: 450,
    spiceRackId: 3
  },
  {
    id: 4,
    name: "sichuan peppercorns",
    grams: 107,
    spiceRackId: 2
  }
];

let nextSpiceId = 5;

router.post("/", (req, res, next) => {
  const newSpice = req.body.spice;
  newSpice.spiceRackId = Number(req.params.spiceRackId);
  if (newSpice.name && newSpice.grams) {
    newSpice.id = nextSpiceId++;
    spices.push(newSpice);
    res.status(201).send(newSpice);
  } else {
    res.status(400).send();
  }
});

router.get("/:spiceId", (req, res, next) => {
  const spiceId = Number(req.params.id);
  const spiceIndex = spices.findIndex(spice => spice.id === spiceId);
  if (spiceIndex !== -1) {
    res.send(spices[spiceIndex]);
  } else {
    res.status(404).send("Spice not found.");
  }
});

router.put("/:spiceId", (req, res, next) => {
  const spiceId = Number(req.params.id);
  const spiceIndex = spices.findIndex(spice => spice.id === spiceId);
  if (spiceIndex !== -1) {
    spices[spiceIndex] = req.body.spice;
    res.send(spices[spiceIndex]);
  } else {
    res.status(404).send("Spice not found.");
  }
});

router.delete("/:spiceId", (req, res, next) => {
  const spiceId = Number(req.params.id);
  const spiceIndex = spices.findIndex(spice => spice.id === spiceId);
  if (spiceIndex !== -1) {
    spices.splice(spiceIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Spice not found.");
  }
});

module.exports = router;

///
///
///
///Example of a well refactored routed code
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.static("public"));

const PORT = process.env.PORT || 4001;

const vendingMachine = [
  {
    id: 1,
    name: "Gum",
    price: 1.25
  },
  {
    id: 7,
    name: "Bag of chips",
    price: 3.5
  },
  {
    id: 23,
    name: "cumin",
    price: 0.75
  }
];

let nextSnackId = 24;

app.use(bodyParser.json());

// Add your code here:
app.param("snackId", (req, res, next, id) => {
  const snackId = Number(id);
  const snackIndex = vendingMachine.findIndex(snack => snack.id === snackId);
  if (snackIndex === -1) {
    res.status(404).send("Snack not found!");
  } else {
    req.snackIndex = snackIndex;
    next();
  }
});

app.get("/snacks/", (req, res, next) => {
  res.send(vendingMachine);
});

app.post("/snacks/", (req, res, next) => {
  const newSnack = req.body;
  if (!newSnack.name || !newSnack.price) {
    res.status(400).send("Snack not found!");
  } else {
    newSnack.id = nextSnackId++;
    vendingMachine.push(newSnack);
    res.send(newSnack);
  }
});

app.get("/snacks/:snackId", (req, res, next) => {
  res.send(vendingMachine[req.snackIndex]);
});

app.put("/snacks/:snackId", (req, res, next) => {
  vendingMachine[req.snackIndex] = req.body;
  res.send(vendingMachine[req.snackIndex]);
});

app.delete("/snacks/:snackId", (req, res, next) => {
  vendingMachine.splice(req.snackIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
