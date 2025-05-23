// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface DynamoDBWritePolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;

  /**
   * Name of the DynamoDB Table
   */
  tableName: pulumi.Input<string>;
}

/**
 * Gives write only access to a DynamoDB Table
 */
export class DynamoDBWritePolicy extends pulumi.ComponentResource {
  constructor(name: string, args: DynamoDBWritePolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:DynamoDBWritePolicy', name, args, opts);
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
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:BatchWriteItem',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:dynamodb:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:table/${args.tableName}`,
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:dynamodb:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:table/${args.tableName}/index/*`,
            ],
          },
        ],
      }
    }, opt);
    this.registerOutputs({});
  }
}