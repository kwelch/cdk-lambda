import { LambdaIntegration, MethodLoggingLevel, RestApi } from "aws-cdk-lib/aws-apigateway"
import { Function, Runtime, AssetCode } from "aws-cdk-lib/aws-lambda"
import { Duration, Stack, StackProps } from "aws-cdk-lib"
import { Construct } from "constructs"

interface LambdaApiStackProps extends StackProps {
	functionName: string
}

export class CdkLambdaStack extends Stack {
	private restApi: RestApi
	private lambdaFunction: Function

	constructor(scope: Construct, id: string, props: LambdaApiStackProps) {
			super(scope, id, props)

			this.restApi = new RestApi(this, this.stackName + "RestApi", {
					deployOptions: {
							stageName: "beta",
							metricsEnabled: true,
							loggingLevel: MethodLoggingLevel.INFO,
							dataTraceEnabled: true,
					},
			})

			this.lambdaFunction = new Function(this, props.functionName, {
					functionName: props.functionName,
					handler: "handler.handler",
					runtime: Runtime.NODEJS_16_X,
					code: new AssetCode(`./src`),
					memorySize: 512,
					timeout: Duration.seconds(10),
					environment: {
					},
					initialPolicy: [],
			})

			this.restApi.root.addMethod("GET", new LambdaIntegration(this.lambdaFunction, {}))
	}
}
