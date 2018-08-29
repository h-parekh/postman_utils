'use strict';
const fs = require('fs');
const util = require('util');
var AWS = require('aws-sdk');

const param_args = require('yargs').array('PARAMETER_NAMES').argv;
var parameter_names = param_args.PARAMETER_NAMES;

var ssm = new AWS.SSM();
var params = {
  Names: parameter_names, /* required */
  WithDecryption: true
};
ssm.getParameters(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {                                 // successful response
    console.log("Successful response from APIGateway"); // successful response
    console.log(data);
    //ToDo: write each parameter in `data` as a separate JSON file
    // for each data.parameter
    // * create a file called parameter_name.json
  }
});
