// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface SNSCrudPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;

  /**
   * Name of the SNS topic
   */
  topicName: pulumi.Input<string>;
}

/**
 * Gives permissions to create, publish and subscribe to SNS topics
 */
export class SNSCrudPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: SNSCrudPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:SNSCrudPolicy', name, args, opts);
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
              'sns:ListSubscriptionsByTopic',
              'sns:CreateTopic',
              'sns:SetTopicAttributes',
              'sns:Subscribe',
              'sns:Publish',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:sns:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:${args.topicName}*`,
            ],
          },
        ],
      }
    }, opt);
    this.registerOutputs({});
  }
}