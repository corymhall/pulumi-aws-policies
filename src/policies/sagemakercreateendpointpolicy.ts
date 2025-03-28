// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface SageMakerCreateEndpointPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;

  /**
   * Name of the SageMaker endpoint
   */
  endpointName: pulumi.Input<string>;
}

/**
 * Gives permission to create an endpoint in SageMaker
 */
export class SageMakerCreateEndpointPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: SageMakerCreateEndpointPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:SageMakerCreateEndpointPolicy', name, args, opts);
    const opt = {
      parent: this,
    };
    new aws.iam.RolePolicy(`${name}-policy`, {
      role: args.roleName,
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'sagemaker:CreateEndpoint',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:sagemaker:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:endpoint/${args.endpointName}`,
            ],
          },
        ],
      }
    }, opt);
    this.registerOutputs({});
  }
}