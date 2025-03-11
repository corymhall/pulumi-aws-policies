// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface DynamoDBRestoreFromBackupPolicyArgs {
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
 * Gives permissions to restore a table from backup
 */
export class DynamoDBRestoreFromBackupPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: DynamoDBRestoreFromBackupPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:DynamoDBRestoreFromBackupPolicy', name, args, opts);
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
              'dynamodb:RestoreTableFromBackup',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:dynamodb:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:table/${args.tableName}/backup/*`,
            ],
          },
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem',
              'dynamodb:GetItem',
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:BatchWriteItem',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:dynamodb:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:table/${args.tableName}`,
            ],
          },
        ],
      }
    }, opt);
    this.registerOutputs({});
  }
}