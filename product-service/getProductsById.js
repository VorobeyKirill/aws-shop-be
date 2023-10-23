'use strict';

const { products } = require('./products');

const getProductsById = async (event) => {
  const product = products.find(
    ({ id }) => id === event.pathParameters.productId
  );

  try {
    if (!product) {
      throw new Error('Product not found!')
    }

    return {
      statusCode: 200,
      body: JSON.stringify(product),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    }
  }
}

exports.getProductsById = getProductsById;