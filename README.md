# postman_utils
A collection of scripts to work with postman

## Setup
1. Install [nodejs](https://nodejs.org/en/download/)
2. Configure AWS [environment variables](https://docs.aws.amazon.com/cli/latest/userguide/cli-environment.html) with the IAM user/role to your AWS account. See [guidance](https://github.com/ndlib/QA_tests/blob/master/managing_aws_profiles.md) for working with multiple profiles.
3. Install packages
```console
npm install
```

## Development notes

* These scripts use [yargs](https://www.npmjs.com/package/yargs) to process command line arguments.

## Usage

### export_postman_from_aws.js
Exports a swagger document of the API with postman extensions for a given [invoke url](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-call-api.html) of an API gateway.
Note: Current implementation supports export for only one URL at a time.

Example:
```console
node export_postman_from_aws.js --INVOKE_URL=https://abc123xqz.execute-api.us-east-1.amazonaws.com/dev
```

### export_parameter_from_aws.js
Exports each of the parameters from AWS parameter store and stores them as JSON files in ./outputs directory

Note: This script does not do any data transformations, you need to make sure the parameter value in parameter store is in the format supported by postman/newman.

See [this page](postman_variables.md) for examples of JSON structures for different variables in postman.

Examples:
```console
node export_parameter_from_aws.js --PARAMETER_NAMES="param1" "param2"
node export_parameter_from_aws.js --PARAMETER_NAMES="param1" --PARAMETER_NAMES ="param2"
```
