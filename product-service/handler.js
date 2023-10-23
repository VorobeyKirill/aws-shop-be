'use strict';

const { getProductsList } = require('./getProductsList');
const { getProductsById } = require('./getProductsById');
const { createProduct } = require('./createProduct');

exports.getProductsById = getProductsById;
exports.getProductsList = getProductsList;
exports.createProduct = createProduct;