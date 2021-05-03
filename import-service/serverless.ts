import type { AWS } from '@serverless/typescript';

import importProductsFile from '@functions/import-products-file';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  package: {
    individually: true,
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 's3:ListBucket',
        Resource: [
            'arn:aws:s3:::import-products-csv-rs-school'
        ]
      },
      {
        Effect: 'Allow',
        Action: 's3:*',
        Resource: [
            'arn:aws:s3:::import-products-csv-rs-school/*'
        ]
      },
    ]
  },
  // import the function via paths
  functions: { importProductsFile },
};

module.exports = serverlessConfiguration;
