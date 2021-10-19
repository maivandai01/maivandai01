const express = require('express');
const apparelController = require('../../controllers/apparel.controller');

const router = express.Router();

router
  .route('/')
  .post(apparelController.createApparel)
  .get( apparelController.getApparels);

router
  .route('/:apparelId')
  .get (apparelController.getApparel)
  .patch( apparelController.updateApparel)
  .delete( apparelController.deleteApparel);

module.exports = router;
