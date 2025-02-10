// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface DynamoDBBackupFullAccessPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;

  /**
   * Name of DynamoDB Table
   */
  tableName: pulumi.Input<string>;
}

/**
 * Gives read/write permissions to DynamoDB on-demand backups for a table
 */
export class DynamoDBBackupFullAccessPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: DynamoDBBackupFullAccessPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:DynamoDBBackupFullAccessPolicy', name, args, opts);
    new aws.iam.RolePolicy(`${name}-policy`, {
      role: args.roleName,
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:CreateBackup',
              'dynamodb:DescribeContinuousBackups',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:dynamodb:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:table/${args.tableName}`,
            ],
          },
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:DeleteBackup',
              'dynamodb:DescribeBackup',
              'dynamodb:ListBackups',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:dynamodb:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:table/${args.tableName}/backup/*`,
            ],
          },
        ],
      }
    }, opts);
    this.registerOutputs({});
  }
}