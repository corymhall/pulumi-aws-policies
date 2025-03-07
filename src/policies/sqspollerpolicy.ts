// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface SQSPollerPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;

  /**
   * Name of the SQS Queue
   */
  queueName: pulumi.Input<string>;
}

/**
 * Gives permissions to poll an SQS Queue
 */
export class SQSPollerPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: SQSPollerPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:SQSPollerPolicy', name, args, opts);
    const opt = {
      parent: this,
      ...opts,
    };
    new aws.iam.RolePolicy(`${name}-policy`, {
      role: args.roleName,
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'sqs:ChangeMessageVisibility',
              'sqs:ChangeMessageVisibilityBatch',
              'sqs:DeleteMessage',
              'sqs:DeleteMessageBatch',
              'sqs:GetQueueAttributes',
              'sqs:ReceiveMessage',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:sqs:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:${args.queueName}`,
            ],
          },
        ],
      }
    }, opt);
    this.registerOutputs({});
  }
}