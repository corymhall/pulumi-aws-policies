// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface KinesisStreamReadPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;

  /**
   * Name of Kinesis Stream
   */
  streamName: pulumi.Input<string>;
}

/**
 * Gives permission to list and read a Kinesis stream
 */
export class KinesisStreamReadPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: KinesisStreamReadPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:KinesisStreamReadPolicy', name, args, opts);
    new aws.iam.RolePolicy(`${name}-policy`, {
      role: args.roleName,
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'kinesis:ListStreams',
              'kinesis:DescribeLimits',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput().partition}:kinesis:${aws.getRegionOutput().name}:${aws.getCallerIdentityOutput().accountId}:stream/*`,
            ],
          },
          {
            Effect: 'Allow',
            Action: [
              'kinesis:DescribeStream',
              'kinesis:DescribeStreamSummary',
              'kinesis:GetRecords',
              'kinesis:GetShardIterator',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput().partition}:kinesis:${aws.getRegionOutput().name}:${aws.getCallerIdentityOutput().accountId}:stream/${args.streamName}`,
            ],
          },
        ],
      }
    }, opts);
    this.registerOutputs({});
  }
}