import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AdrCrossStack } from '../lib/adr-cross-stack.js';

test('el stack define el baseline serverless mínimo', () => {
  const app = new cdk.App();
  const stack = new AdrCrossStack(app, 'TestStack', {
    env: { account: '000000000000', region: 'us-east-1' },
  });
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::S3::Bucket', {
    PublicAccessBlockConfiguration: {
      BlockPublicAcls: true,
      BlockPublicPolicy: true,
      IgnorePublicAcls: true,
      RestrictPublicBuckets: true,
    },
  });
  template.hasResourceProperties('AWS::CloudFront::Distribution', {
    DistributionConfig: {
      DefaultRootObject: 'index.html',
      PriceClass: 'PriceClass_100',
    },
  });
  template.hasResourceProperties('AWS::Cognito::UserPool', {
    UsernameAttributes: ['email'],
    Policies: {
      PasswordPolicy: {
        MinimumLength: 12,
        RequireNumbers: true,
        RequireSymbols: true,
        RequireUppercase: true,
        RequireLowercase: true,
      },
    },
  });
  template.hasResourceProperties('AWS::DynamoDB::Table', {
    BillingMode: 'PAY_PER_REQUEST',
    PointInTimeRecoverySpecification: {
      PointInTimeRecoveryEnabled: true,
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: 'gsi-by-student-day',
        Projection: { ProjectionType: 'ALL' },
      },
      {
        IndexName: 'gsi-by-class-date',
        Projection: { ProjectionType: 'ALL' },
      },
    ],
  });
  template.hasResourceProperties('AWS::ApiGatewayV2::Api', {
    ProtocolType: 'HTTP',
  });
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: 'nodejs24.x',
  });
  template.hasResourceProperties('AWS::Scheduler::Schedule', {
    ScheduleExpression: 'rate(1 day)',
  });
});

test('el stack no habilita replicación multi-Región', () => {
  const app = new cdk.App();
  const stack = new AdrCrossStack(app, 'TestStack', {
    env: { account: '000000000000', region: 'us-east-1' },
  });
  const template = Template.fromStack(stack);
  const tables = template.findResources('AWS::DynamoDB::Table');

  assert.equal(Object.keys(tables).length, 1);
  assert.equal(
    Object.values(tables).some((resource) =>
      JSON.stringify(resource.Properties).includes('REPLICA'),
    ),
    false,
  );
});
