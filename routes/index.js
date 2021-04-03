const router = require('express').Router();
const apiRoutes = require('./api');

// establishing main route
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Oops, wrong route! :(</h1>")
});

module.exports = router;