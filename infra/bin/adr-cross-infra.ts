#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AdrCrossStack } from '../lib/adr-cross-stack.js';

const app = new cdk.App();

new AdrCrossStack(app, 'AdrCrossStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT ?? '000000000000',
    region: process.env.CDK_DEFAULT_REGION ?? 'us-east-1',
  },
  description: 'Baseline serverless económico de ADR Cross (NP-001.2)',
});
