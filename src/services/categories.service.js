const httpStatus = require('http-status');
const { Categories } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a categories
 * @param {Object} categoriesBody
 * @returns {Promise<Categories>}
 */
const createCategories = async (categoriesBody) => {
  return Categories.create(categoriesBody);
};

/**
 * Query for categoriess
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCategoriess = async (filter, options) => {
  const categoriess = await Categories.paginate(filter, options);
  return categoriess;
};

/**
 * Get categories by id
 * @param {ObjectId} id
 * @returns {Promise<Categories>}
 */
const getCategoriesById = async (id) => {
  return Categories.findById(id);
};

/**
 * Get categories by email
 * @param {string} email
 * @returns {Promise<Categories>}
 */
const getCategoriesByEmail = async (email) => {
  return Categories.findOne({ email });
};

/**
 * Update categories by id
 * @param {ObjectId} categoriesId
 * @param {Object} updateBody
 * @returns {Promise<Categories>}
 */
const updateCategoriesById = async (categoriesId, updateBody) => {
  const categories = await getCategoriesById(categoriesId);
  if (!categories) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Categories not found');
  }
  if (updateBody.email && (await Categories.isEmailTaken(updateBody.email, categoriesId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(categories, updateBody);
  await categories.save();
  return categories;
};

/**
 * Delete categories by id
 * @param {ObjectId} categoriesId
 * @returns {Promise<Categories>}
 */
const deleteCategoriesById = async (categoriesId) => {
  const categories = await getCategoriesById(categoriesId);
  if (!categories) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Categories not found');
  }
  await categories.remove();
  return categories;
};

module.exports = {
  createCategories,
  queryCategoriess,
  getCategoriesById,
  getCategoriesByEmail,
  updateCategoriesById,
  deleteCategoriesById,
};
