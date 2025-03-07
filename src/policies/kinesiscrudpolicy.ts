// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface KinesisCrudPolicyArgs {
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
 * Gives permission to create, publish and delete Kinesis Stream
 */
export class KinesisCrudPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: KinesisCrudPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:KinesisCrudPolicy', name, args, opts);
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
              'kinesis:AddTagsToStream',
              'kinesis:CreateStream',
              'kinesis:DecreaseStreamRetentionPeriod',
              'kinesis:DeleteStream',
              'kinesis:DescribeStream',
              'kinesis:DescribeStreamSummary',
              'kinesis:GetShardIterator',
              'kinesis:IncreaseStreamRetentionPeriod',
              'kinesis:ListTagsForStream',
              'kinesis:MergeShards',
              'kinesis:PutRecord',
              'kinesis:PutRecords',
              'kinesis:SplitShard',
              'kinesis:RemoveTagsFromStream',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:kinesis:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:stream/${args.streamName}`,
            ],
          },
        ],
      }
    }, opt);
    this.registerOutputs({});
  }
}