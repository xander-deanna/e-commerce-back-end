const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// establishing relationships between tables

// Product belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// Category have many Product
Category.hasMany(Product, {
  foreignKey: 'category_id'
});

// Products belongToMany Tag (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'tags_on_product'
});

// Tag belongToMany Product (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'products_with_tag'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};