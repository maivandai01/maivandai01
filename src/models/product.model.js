const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    data: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The product's email
 * @param {ObjectId} [excludeProductId] - The id of the product to be excluded
 * @returns {Promise<boolean>}
 */
productSchema.statics.isEmailTaken = async function (email, excludeProductId) {
  const product = await this.findOne({ email, _id: { $ne: excludeProductId } });
  return !!product;
};

/**
 * Check if password matches the product's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
productSchema.methods.isPasswordMatch = async function (password) {
  const product = this;
  return bcrypt.compare(password, product.password);
};

productSchema.pre('save', async function (next) {
  const product = this;
  if (product.isModified('password')) {
    product.password = await bcrypt.hash(product.password, 8);
  }
  next();
});

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
