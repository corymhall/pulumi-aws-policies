// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface DynamoDBStreamReadPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;

  /**
   * Name of DynamoDB Stream
   */
  streamName: pulumi.Input<string>;

  /**
   * Name of DynamoDB Table
   */
  tableName: pulumi.Input<string>;
}

/**
 * Gives permission to describe and read a DynamoDB Stream and Records
 */
export class DynamoDBStreamReadPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: DynamoDBStreamReadPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:DynamoDBStreamReadPolicy', name, args, opts);
    new aws.iam.RolePolicy(`${name}-policy`, {
      role: args.roleName,
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:DescribeStream',
              'dynamodb:GetRecords',
              'dynamodb:GetShardIterator',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:dynamodb:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:table/${args.tableName}/stream/${args.streamName}`,
            ],
          },
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:ListStreams',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:dynamodb:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:table/${args.tableName}/stream/*`,
            ],
          },
        ],
      }
    }, opts);
    this.registerOutputs({});
  }
}