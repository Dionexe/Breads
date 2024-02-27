const express = require("express");
const router = express.Router();
const Bread = require("../models/bread");
const render = require("../render");
const Baker = require('../models/baker.js');

// Breads Routes
router.get('/', async (req, res) => {
  const foundBakers = await Baker.find().lean() 
  const foundBreads = await Bread.find().limit(6).lean() 
  res.send(render('Index', {
    breads: foundBreads,
    bakers: foundBakers,
    title: 'Index Page'
  }))
})


// NEW
router.get('/new', (req, res) => {
  Baker.find()
      .then(foundBakers => {
          res.send(render('New', {
              bakers: foundBakers
          }))
    })
})


// DETAIL ROUTE
router.get("/:id", (req, res) => {
  Bread.findById(req.params.id)
    .populate('baker')
    .then((foundBread) => {
      const bakedBy = foundBread.getBakedBy()
      console.log(bakedBy)
      res.send(
        render("Show", {
          bread: foundBread,
        })
      );
    })
    .catch((err) => {
      res.send("404");
    });
});

/// CREATE
router.post("/", (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined;
  }
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  Bread.create(req.body);
  res.redirect("/breads");
});

// UPDATE
router.put("/:id", (req, res) => {
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (updatedBread) => {
      console.log(updatedBread);
      res.redirect(`/breads/${req.params.id}`);
    }
  );
});

// EDIT
router.get("/:id/edit", (req, res) => {
  Baker.find()
    .then(foundBakers => {
        Bread.findById(req.params.id)
          .then(foundBread => {
            res.send(render('Edit', {
                bread: foundBread, 
                bakers: foundBakers 
        })
      );
    })
  })
    .catch((err) => {
      res.send("404");
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  Bread.findByIdAndDelete(req.params.id).then((deletedBread) => {
    res.status(303).redirect("/breads");
  });
});

module.exports = router;
