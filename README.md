FE cloudfront endpoint
https://d2ecpn6u5qj6v8.cloudfront.net/

### Add product example script

- aws dynamodb put-item --table-name Products --item '{ "id": { "S": "000" }, "title": { "S": "Tomato" }, "description": { "S": "Tomato tomato" }, "price": { "N": "100" } }'

### Add stock example script

- aws dynamodb put-item --table-name Stocks --item '{ "product_id": { "S": "000" }, "count": { "N": "65" } }'