const router = require('express').Router();
const { Category, Product } = require('../../models');

// creates a new category
router.post('/', async (req, res) => {
  try {
    const tripData = await Trip.create(req.body);
    res.status(200).json(tripData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// deletes a category by id
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!categoryData) {
      res.status(404).json({ message: `There's no category with that ID! :( ` });
      return;
    }
    res.status(200).json(categoryData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

// finds all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/:id', (req, res) => {
//   // find one category by its `id` value
//   // be sure to include its associated Products
// });

// router.put('/:id', (req, res) => {
//   // update a category by its `id` value
// });

module.exports = router;
