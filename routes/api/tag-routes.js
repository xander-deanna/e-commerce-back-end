const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// tag routes use `http://localhost:PORT/api/tags` endpoint

// display all tags
router.get('/', async (req, res) => {
  try {
    const tagGetAll = await Tag.findAll({
      include: [
        {model: Product, as: 'product_with_tag'}
      ]
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
      include: [
        {model: Product, as: 'product_with_tag'}
      ]
    });
    if (!tagGetID) {
      res.status(404).json({ message: `There's no tag with that ID! :( ` });
      return;
    }
    res.status(200).json(tagGetID);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

// delete a tag by ID
router.delete('/:id', async (req, res) => {
  try {
    const tagDelete = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagDelete) {
      res.status(404).json({ message: `There's no tag with that ID! :( ` });
      return;
    }
    res.status(200).json(tagDelete);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

// update a tag by ID
router.put('/:id', async (req, res) => {
  try {
    const tagUpdate = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    if (!tagUpdate) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(tagUpdate);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const tagMake = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(tagMake);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
