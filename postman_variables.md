## Working with variables in postman/newman
There are 3 types of variables you can set to use with [Postman](https://www.getpostman.com/) and it's command line utility [Newman](https://github.com/postmanlabs/newman).
This page explains my interpretation of using those variables and explains how to use them in JSON format for using with Newman CLI.

Let's say you are creating an API endpoint that can pull articles about different authors
```console
http://{{article-host}}:{{article-port}}/api/{{api_version}}/{{author-name}}
```

### Environment variables
[Environment variables](https://www.getpostman.com/docs/v6/postman/environments_and_globals/manage_environments) in this context means a dev/pre-production/production.
So you would have 3 different files containing the same 'set' of data keys ('article-host' and 'article-port' in this case) but with different values ('host1' and '8808')

Let's say for staging environment you can have a file named `/path/to/article_api.staging.json`
```JSON
{
  "name": "article_api.staging",
  "values": [
    {
      "key": "article-host",
      "value": "host1",
      "description": "This is the hostname to my staging environment",
      "type": "text",
      "enabled": true
    },
    {
      "key": "article-port",
      "value": "8808",
      "description": "This is the port number to my staging environment",
      "type": "text",
      "enabled": true
    }
  ],
  "_postman_variable_scope": "environment",
  "_postman_exported_at": "2018-08-29T20:49:10.416Z",
  "_postman_exported_using": "Postman/6.2.5"
}
```
And for production environment you can have a file named `/path/to/article_api.production.json`:
```JSON
{
  "name": "article_api.production",
  "values": [
    {
      "key": "article-host",
      "value": "host2",
      "description": "This is the hostname to my production environment",
      "type": "text",
      "enabled": true
    },
    {
      "key": "article-port",
      "value": "8809",
      "description": "This is the port number to my production environment",
      "type": "text",
      "enabled": true
    }
  ],
  "_postman_variable_scope": "environment",
  "_postman_exported_at": "2018-08-29T20:49:10.416Z",
  "_postman_exported_using": "Postman/6.2.5"
}
```

You will pass the path to one of these JSON files as `<source>` to the `-e` or  `--environment` option
For example to run a collection of tests against staging environment:
```console
newman run /path/to/postman_collection.json -e /path/to/article_api.staging.json
```
And similarly to run a collection of tests against production environment:
```console
newman run /path/to/postman_collection.json -e /path/to/article_api.production.json
```

### Global variables
[Global variables](https://www.getpostman.com/docs/v6/postman/environments_and_globals/manage_globals) are those that you want available for a larger scope and don't change
across environments. You can keep multiple values in the same JSON file.
Let's say you have a file named `/path/to/my-workspace-globals.json`
```JSON
{
  "id": "a9b-9e6b-43d-8c58-174",
  "values": [
    {
      "key": "release_version",
      "value": "v1.0.2",
      "enabled": true
    },
    {
      "key": "auth_token",
      "value": "a123.b456.c789",
      "enabled": true
    },
    {
      "key": "api_version",
      "value": "v1",
      "enabled": true
    }
  ],
  "name": "My-Workspace-Globals",
  "_postman_variable_scope": "globals",
  "_postman_exported_at": "2018-08-29T20:43:18.312Z",
  "_postman_exported_using": "Postman/6.2.5"
}
```
You will pass the path to this JSON file as `<source>` to the `-g` or  `--globals` option
For example to run a collection of tests against staging environment:
```console
newman run /path/to/postman_collection.json -g /path/to/my-workspace-globals.json
```
Or like this:
```console
newman run /path/to/postman_collection.json --globals /path/to/my-workspace-globals.json
```

### Data variables
[Data variables](https://www.getpostman.com/docs/v6/postman/collection_runs/working_with_data_files) are a set of values for the same parameter. In this example, if you want to test with different
path parameter values for `author-name`,
Let's say you have a file named `/path/to/author-name-data.json`
```JSON
[
  {
    "author-name": "joe"
  },
  {
    "author-name": "chris"
  }
]
```
You will pass the path to this JSON file as `<source>` to the `-d` or  `--iteration-data` option
For example to run a collection of tests against staging environment:
```console
newman run /path/to/postman_collection.json -d /path/to/author-name-data.json
```
Or like this:
```console
newman run /path/to/postman_collection.json --iteration-data /path/to/author-name-data.json
```

## Using all 3 together
Let's say you want to run `/path/to/postman_collection.json` against staging environment for all authors, then this command will send 2 requests, one each for "joe" and "chris"
```console
newman run /path/to/postman_collection.json -e /path/to/article_api.staging.json -g /path/to/my-workspace-globals.json -d /path/to/author-name-data.json
```
