//GET
const express = require("express");
const app = express();

const PORT = process.env.PORT || 4001;

const battlefields = {
  fortSumter: {
    state: "SC"
  },
  manassas: {
    state: "VA"
  },
  gettysburg: {
    state: "PA"
  },
  antietam: {
    state: "MD"
  }
};

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.get("/battlefields/:name", (req, res, next) => {
  const battlefieldName = req.params.name;
  const battlefield = battlefields[battlefieldName];
  if (battlefield) {
    res.send(battlefield);
  } else {
    res.status(404).send();
  }
});

//////////////
//PUT
const express = require("express");
const app = express();

const PORT = process.env.PORT || 4001;

const currencies = {
  diram: {
    countries: ["UAE", "Morocco"]
  },
  real: {
    countries: ["Brazil"]
  },
  dinar: {
    countries: ["Algeria", "Bahrain", "Jordan", "Kuwait"]
  },
  vatu: {
    countries: ["Vanuatu"]
  },
  shilling: {
    countries: ["Tanzania", "Uganda", "Somalia", "Kenya"]
  }
};

app.put("/currencies/:name/countries", (req, res, next) => {
  const currencyName = req.params.name;
  const countries = req.query;
  currencies[currencyName] = countries;
  res.send(currencies[currencyName]);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

///
//POST
const express = require("express");
const app = express();

const PORT = process.env.PORT || 4001;

const soups = ["gazpacho", "borscht", "primordial", "avgolemono", "laksa"];

app.post("/soups", (req, res, next) => {
  const name = req.query.name;
  soups.push(name);
  res.status(201).send(name);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

///
//DELETE
const express = require("express");
const app = express();

const PORT = process.env.PORT || 4001;

const puddingFlavors = ["chocolate", "banana", "butterscotch", "pistachio"];

const findPuddingIndex = name => {
  return puddingFlavors.indexOf(name);
};

const deletePuddingAtIndex = index => {
  puddingFlavors.splice(index, 1);
};

app.delete("/puddings/:flavor", (req, res, next) => {
  const index = findPuddingIndex(req.params.flavor);
  if (index !== -1) {
    deletePuddingAtIndex(index);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

//
//Use express.Router()
//Mount the sauceRouter with app.use so that a GET /sauces request sends back the sauces array.
const express = require("express");
const app = express();

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const pastas = ["agnolotti", "cavatelli", "gemelli", "tortellini"];

app.get("/pastas", (req, res, next) => {
  res.send(pastas);
});

const sauceRouter = express.Router();
// Add your code here:
app.use("/sauces", sauceRouter);

const sauces = [
  "carbonara",
  "primavera",
  "bolognese",
  "puttanesca",
  "fra diavolo"
];

sauceRouter.get("/", (req, res, next) => {
  res.send(sauces);
});

///MOUNT 2 routers
///
const express = require("express");
const app = express();

const PORT = process.env.PORT || 4001;

const mountains = ["denali", "olympus", "kilimanjaro", "matterhorn"];
const mountainRanges = ["alps", "andes", "himalayas", "rockies"];

// Your code here
const mountainsRouter = express.Router();
const mountainRangesRouter = express.Router();

mountainsRouter.get("/", (req, res, next) => {
  res.send(mountains);
});

mountainRangesRouter.get("/", (req, res, next) => {
  res.send(mountainRanges);
});

app.use("/mountains", mountainsRouter);
app.use("/mountain-ranges", mountainRangesRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
