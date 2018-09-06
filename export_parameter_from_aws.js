'use strict';
const fs = require('fs');
const util = require('util');
const AWS = require('aws-sdk');
const _ = require('lodash');
const path = require('path');
const param_args = require('yargs').array('PARAMETER_NAMES').argv;

var parameter_names = param_args.PARAMETER_NAMES;
var ssm = new AWS.SSM();
var params = {
  Names: parameter_names, /* required */
  WithDecryption: true
};
var outputs_dir = './outputs';
if (!fs.existsSync(outputs_dir)){
    fs.mkdirSync(outputs_dir);
}

ssm.getParameters(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {                                // successful response
    if (!_.isEmpty(data.InvalidParameters))
      console.log("Invalid Parmeters:", data.InvalidParameters)
    else {
      _.forEach(data.Parameters, function(param) {
        // AWS parmaters are usually organized into hierarchies, so I am replacing '/' with '-' so I can have clean filenames
        // @see https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-su-organize.html
        const file_name = _.replace(_.trim(param.Name, '/'), new RegExp("/", "g"), '-')
        const output_file_path = path.format({ dir: outputs_dir, name: file_name, ext: '.json'})
        const output_json_body = param.Value
        fs.writeFileSync(output_file_path, output_json_body, function (err) {
          if (err) {
            return console.log(err);
          }
        });
        console.log("Exported paramater value for AWS parameter", param.Name, "to", output_file_path );
      });
    }
  }
});
