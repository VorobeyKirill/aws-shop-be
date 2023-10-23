'use strict';

const { getAllStocks } = require('./stocksDBController');
const { getProductById } = require('./productsDBController');

const getProductsById = async (event) => {
  try {
    const id = event.pathParameters.productId;

    const product = await getProductById(id);
    const stocks = await getAllStocks();

    const result = product.map(product => {
      const relatedStock = stocks.find(stock => stock.product_id === product.id)

      product.count = relatedStock
        ? relatedStock.count
        : null

      return product;
    })[0];

    if (!result) {
      throw new Error("Product not found");
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result),
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