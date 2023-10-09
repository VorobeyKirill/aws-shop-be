'use strict';

const { getProductsList } = require('./getProductsList');
const { getProductsById } = require('./getProductsById');

exports.getProductsById = getProductsById;
exports.getProductsList = getProductsList;