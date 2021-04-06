const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// product routes use `http://localhost:PORT/api/products` endpoint

// display all products
router.get('/', async (req, res) => {
  try {
    const productGetAll = await Product.findAll({
      include: [
        {model: Category}, 
        {model: Tag, through: ProductTag, as: 'tags_on_product'}
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
    const productData = await Product.findByPk(req.params.id, {
      include: [
        {model: Category}, 
        {model: Tag, through: ProductTag, as: 'tags_on_product'}
      ]
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // delete a product by ID
// router.delete('/:id', (req, res) => {

// });

// // update product by ID
// router.put('/:id', (req, res) => {

// });

// create new product
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
