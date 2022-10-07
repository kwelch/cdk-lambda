#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkLambdaStack } from '../lib/cdk-lambda-stack';

export const lambdaApiStackName = "CDKSimpleLambdaApiStack"
export const lambdaFunctionName = "CDKSimpleFunction"

const app = new cdk.App();
new CdkLambdaStack(app, lambdaApiStackName, {
	functionName: lambdaFunctionName,
})
