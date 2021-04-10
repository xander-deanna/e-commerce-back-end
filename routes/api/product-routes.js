const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// product routes use `http://localhost:PORT/api/products` endpoint

// display all products
router.get('/', async (req, res) => {
  try {
    const productGetAll = await Product.findAll({
      include: [
        { model: Category },
        { model: Tag, through: ProductTag, as: 'tags_on_product' }
      ]
    });
    res.status(200).json(productGetAll);
  } catch (err) {
    res.status(500).json(err);
  }
});

// display product by ID
router.get('/:id', async (req, res) => {
  try {
    const productGetID = await Product.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Tag, through: ProductTag, as: 'tags_on_product' }
      ]
    });
    res.status(200).json(productGetID);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const productDelete = await Product.destroy({
        where: {
          id: req.params.id,
        }
    });
    res.status(200).json(productDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // update product by ID
router.put('/:id', async (req, res) => {
  try {
    const productUpdate = await Product.update(req.body, {
        where: {
          id: req.params.id,
        }
    });
    res.status(200).json(productUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds.length) {
        const productMake = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productMake);
      }
      res.status(200).json(product);
    })
    .then((productMakeID) => res.status(200).json(productMakeID))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
