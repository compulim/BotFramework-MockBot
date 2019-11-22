// This is the entry point for Azure Web App via IIS and Kudu

require('@babel/register')({
  ...require('./.babelrc'),
  extensions: [".js", ".ts"]
});
require('./src/index');
