const express = require("express");
const router = express.Router();
const Bread = require("../models/bread");
const render = require("../render");

// Breads Routes
router.get("/", (req, res) => {
  res.send(render("Index", { breads: Bread }));
});

// NEW
router.get("/new", (req, res) => {
  res.send(render("new"));
});

router.get("/:arrayIndex", (req, res) => {
  res.send(render("Show", { bread: Bread[req.params.arrayIndex] }));
  // res.send(render)
});

// SHOW
router.get('/:arrayIndex', (req, res) => {
  if (Bread[req.params.arrayIndex]) {
    res.send(render('Show', {
      bread:Bread[req.params.arrayIndex],
      index: req.params.arrayIndex,
    }))
  } else {
    res.render('404')
  }
})

/// CREATE
router.post("/", (req, res) => {
  if (!req.body.image) {
    req.body.image =
      "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";
  }
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  Bread.push(req.body);
  res.redirect("/breads");
});

// DELETE
router.delete("/:indexArray", (req, res) => {
  Bread.splice(req.params.indexArray, 1);
  res.status(303).redirect("/breads");
});

module.exports = router;
