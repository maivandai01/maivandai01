const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const categoriesSchema = mongoose.Schema(
  {

  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
categoriesSchema.plugin(toJSON);
categoriesSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The categories's email
 * @param {ObjectId} [excludeCategoriesId] - The id of the categories to be excluded
 * @returns {Promise<boolean>}
 */
categoriesSchema.statics.isEmailTaken = async function (email, excludeCategoriesId) {
  const categories = await this.findOne({ email, _id: { $ne: excludeCategoriesId } });
  return !!categories;
};

/**
 * Check if password matches the categories's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
categoriesSchema.methods.isPasswordMatch = async function (password) {
  const categories = this;
  return bcrypt.compare(password, categories.password);
};

categoriesSchema.pre('save', async function (next) {
  const categories = this;
  if (categories.isModified('password')) {
    categories.password = await bcrypt.hash(categories.password, 8);
  }
  next();
});

/**
 * @typedef Categories
 */
const Categories = mongoose.model('Categories', categoriesSchema);

module.exports = Categories;
