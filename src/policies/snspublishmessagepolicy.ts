// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface SNSPublishMessagePolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;

  /**
   * Name of the SNS Topic
   */
  topicName: pulumi.Input<string>;
}

/**
 * Gives permission to publish message to SNS Topic
 */
export class SNSPublishMessagePolicy extends pulumi.ComponentResource {
  constructor(name: string, args: SNSPublishMessagePolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:SNSPublishMessagePolicy', name, args, opts);
    new aws.iam.RolePolicy(`${name}-policy`, {
      role: args.roleName,
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'sns:Publish',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput().partition}:sns:${aws.getRegionOutput().name}:${aws.getCallerIdentityOutput().accountId}:${args.topicName}`,
            ],
          },
        ],
      }
    });
    this.registerOutputs({});
  }
}