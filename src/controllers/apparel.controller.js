const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { apparelService } = require('../services');

const createApparel = catchAsync(async (req, res) => {
  const apparel = await apparelService.createApparel(req.body);
  res.status(httpStatus.CREATED).send(apparel);
});

const getApparels = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await apparelService.queryApparels(filter, options);
  res.send(result);
});

const getApparel = catchAsync(async (req, res) => {
  const apparel = await apparelService.getApparelById(req.params.apparelId);
  if (!apparel) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Apparel not found');
  }
  res.send(apparel);
});

const updateApparel = catchAsync(async (req, res) => {
  const apparel = await apparelService.updateApparelById(req.params.apparelId, req.body);
  res.send(apparel);
});

const deleteApparel = catchAsync(async (req, res) => {
  await apparelService.deleteApparelById(req.params.apparelId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createApparel,
  getApparels,
  getApparel,
  updateApparel,
  deleteApparel,
};
