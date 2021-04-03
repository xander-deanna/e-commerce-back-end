const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// tag routes use `http://localhost:PORT/api/tags` endpoint

// display all tags
router.get('/', async (req, res) => {
  try {
    const tagGetAll = await Tag.findAll({
      include: [{
        model: Product,
        as: 'product_with_tag',
      }]
    });
    res.status(200).json(tagGetAll);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

// display tag by ID
router.get('/:id', async (req, res) => {
  try {
    const tagGetID = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        as: 'product_with_tag',
      }]
    });
    res.status(200).json(tagGetID);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

// delete a tag by ID
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

// update a tag by ID
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

// create a new tag
router.post('/', (req, res) => {
  // create a new tag
});

module.exports = router;
