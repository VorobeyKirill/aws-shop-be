'use strict';

const { getAllStocks } = require('./stocksDBController');
const { getAllProducts } = require('./productsDBController');

const getProductsList = async () => {
  console.log("getProductsList lambda was triggered\n" + JSON.stringify(event, null, 2));

  try {
    const products = await getAllProducts();
    const stocks = await getAllStocks();

    const result = products.map(product => {
      const relatedStock = stocks.find(stock => stock.product_id === product.id)

      product.count = relatedStock
        ? relatedStock.count
        : null

      return product
    });

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
};

exports.getProductsList = getProductsList;
