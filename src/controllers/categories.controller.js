const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { categoriesService } = require('../services');

const createCategories = catchAsync(async (req, res) => {
  const categories = await categoriesService.createCategories(req.body);
  res.status(httpStatus.CREATED).send(categories);
});

const getCategoriess = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await categoriesService.queryCategoriess(filter, options);
  res.send(result);
});

const getCategories = catchAsync(async (req, res) => {
  const categories = await categoriesService.getCategoriesById(req.params.categoriesId);
  if (!categories) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Categories not found');
  }
  res.send(categories);
});

const updateCategories = catchAsync(async (req, res) => {
  const categories = await categoriesService.updateCategoriesById(req.params.categoriesId, req.body);
  res.send(categories);
});

const deleteCategories = catchAsync(async (req, res) => {
  await categoriesService.deleteCategoriesById(req.params.categoriesId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCategories,
  getCategoriess,
  getCategories,
  updateCategories,
  deleteCategories,
};
