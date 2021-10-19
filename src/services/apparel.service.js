const httpStatus = require('http-status');
const { Apparel } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a apparel
 * @param {Object} apparelBody
 * @returns {Promise<Apparel>}
 */
const createApparel = async (apparelBody) => {
  return Apparel.create(apparelBody);
};

/**
 * Query for apparels
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryApparels = async (filter, options) => {
  const apparels = await Apparel.paginate(filter, options);
  return apparels;
};

/**
 * Get apparel by id
 * @param {ObjectId} id
 * @returns {Promise<Apparel>}
 */
const getApparelById = async (id) => {
  return Apparel.findById(id);
};

/**
 * Get apparel by email
 * @param {string} email
 * @returns {Promise<Apparel>}
 */
const getApparelByEmail = async (email) => {
  return Apparel.findOne({ email });
};

/**
 * Update apparel by id
 * @param {ObjectId} apparelId
 * @param {Object} updateBody
 * @returns {Promise<Apparel>}
 */
const updateApparelById = async (apparelId, updateBody) => {
  const apparel = await getApparelById(apparelId);
  if (!apparel) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Apparel not found');
  }
  if (updateBody.email && (await Apparel.isEmailTaken(updateBody.email, apparelId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(apparel, updateBody);
  await apparel.save();
  return apparel;
};

/**
 * Delete apparel by id
 * @param {ObjectId} apparelId
 * @returns {Promise<Apparel>}
 */
const deleteApparelById = async (apparelId) => {
  const apparel = await getApparelById(apparelId);
  if (!apparel) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Apparel not found');
  }
  await apparel.remove();
  return apparel;
};

module.exports = {
  createApparel,
  queryApparels,
  getApparelById,
  getApparelByEmail,
  updateApparelById,
  deleteApparelById,
};
