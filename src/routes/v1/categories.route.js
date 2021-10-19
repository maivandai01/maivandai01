const express = require('express');
const categoriesController = require('../../controllers/categories.controller');

const router = express.Router();

router
  .route('/')
  .post(categoriesController.createCategories)
  .get(categoriesController.getCategoriess);

router
  .route('/:categoriesId')
  .get( categoriesController.getCategories)
  .patch(  categoriesController.updateCategories)
  .delete( categoriesController.deleteCategories);

module.exports = router;
