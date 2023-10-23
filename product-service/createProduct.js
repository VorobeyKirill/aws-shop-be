'use strict';

const { v4: uuidv4 } = require('uuid');

const { addStock } = require('./stocksDBController');
const { addProduct } = require('./productsDBController');

const createProduct = async (event) => {
  console.log("createProduct lambda was triggered\n" + JSON.stringify(event, null, 2));

  try {
    const body = JSON.parse(event.body);
    const productId = uuidv4();

    const product = {
        id: productId,
        title: body.title,
        description: body.description,
        price: body.price
    };

    const stock = {
        id: uuidv4(),
        product_id: productId,
        count: body.count
    }

    await Promise.all([
        addProduct(product),
        addStock(stock)
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Product was added',
        product
      }, null, 2),
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

exports.createProduct = createProduct;
