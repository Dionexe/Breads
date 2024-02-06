const express = require('express');
const router = express.Router();
const Bread = require('../models/bread');
const render = require('../render');

// Breads Routes
router.get('/', (req, res) => {
    res.send(render('Index', { breads: Bread }));
});

router.get('/:arrayIndex', (req, res) => {
  res.send(render('Show', { bread: Bread[req.params.arrayIndex]}))
  // res.send(render)
});

// SHOW
router.get('/:arrayIndex', (req, res) => {
  if (Bread[req.params.arrayIndex]) {
    res.send(render('Show', {
      bread:Bread[req.params.arrayIndex]
    }))
  } else {
    res.send('404')
  }
})


module.exports = router;
