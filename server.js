// This is the entry point for Azure Web App via IIS and Kudu

require('@babel/register')(require('./.babelrc'));
require('./lib/index');
