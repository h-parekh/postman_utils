'use strict';
const args = require('yargs').argv;
const url = require('url');
const fs = require('fs');
const util = require('util');
const AWS = require('aws-sdk');

/**
 * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/APIGateway.html#getExport-property
 */
var parsed_url = url.parse(args.INVOKE_URL);
var restApiId = parsed_url.hostname.split(".")[0]
var stageName = parsed_url.pathname.replace(/\//g, '')

var params = {
  exportType: 'swagger', /* required */
  restApiId: restApiId, /* required */
  stageName: stageName, /* required */
  accepts: 'application/json',
  parameters: {
    'extensions': 'postman',
  }
};

var apigateway = new AWS.APIGateway();

apigateway.getExport(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    console.log("Successful response from APIGateway"); // successful response
    fs.writeFileSync("outputs/postman.json", util.inspect(JSON.parse(data.body), { depth: null }), 'utf8', function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The Postman file was saved!");
    });
  }
});
