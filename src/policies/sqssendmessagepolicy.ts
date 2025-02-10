// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface SQSSendMessagePolicyArgs {
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
 * Gives permission to send message to SQS Queue
 */
export class SQSSendMessagePolicy extends pulumi.ComponentResource {
  constructor(name: string, args: SQSSendMessagePolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:SQSSendMessagePolicy', name, args, opts);
    new aws.iam.RolePolicy(`${name}-policy`, {
      role: args.roleName,
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'sqs:SendMessage*',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:sqs:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:${args.queueName}`,
            ],
          },
        ],
      }
    }, opts);
    this.registerOutputs({});
  }
}