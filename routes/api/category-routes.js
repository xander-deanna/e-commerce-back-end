const router = require('express').Router();
const { Category, Product } = require('../../models');

// category routes uses `http://localhost:PORT/api/categories` endpoint

// display all categories
router.get('/', async (req, res) => {
  try {
    const categoryGetAll= await Category.findAll({
      include: [
        {model: Product}
      ]
    });
    res.status(200).json(categoryGetAll);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// display category by ID
router.get('/:id', async (req, res) => {
  try {
    const categoryGetID = await Category.findByPk(req.params.id, {
      include: [
        {model: Product}
      ]
    });
    if (!categoryGetID) {
      res.status(404).json({ message: `There's no category with that ID! :( ` });
      return;
    }
    res.status(200).json(categoryGetID);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by ID
router.delete('/:id', async (req, res) => {
  try {
    const categoryDelete = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!categoryDelete) {
      res.status(404).json({ message: `There's no category with that ID! :( ` });
      return;
    }
    res.status(200).json(categoryDelete);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

// update a category by ID
router.put('/:id', async (req, res) => {
  try {
    const categoryUpdate = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    if (!categoryUpdate) {
      res.status(404).json({ message: `There's no category with that ID! :( ` });
      return;
    }
    res.status(200).json(categoryUpdate);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryMake = await Category.create(req.body);
    res.status(200).json(categoryMake);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
