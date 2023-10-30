'use strict';

const { getProductsList } = require('./getProductsList');
const { getProductsById } = require('./getProductsById');
const { createProduct } = require('./createProduct');
const { catalogBatchProcess } = require('./catalogBatchProcess');

exports.getProductsById = getProductsById;
exports.getProductsList = getProductsList;
exports.createProduct = createProduct;
exports.catalogBatchProcess = catalogBatchProcess;