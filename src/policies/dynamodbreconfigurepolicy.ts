// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface DynamoDBReconfigurePolicyArgs {
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
 * Gives access reconfigure to a DynamoDB Table
 */
export class DynamoDBReconfigurePolicy extends pulumi.ComponentResource {
  constructor(name: string, args: DynamoDBReconfigurePolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:DynamoDBReconfigurePolicy', name, args, opts);
    new aws.iam.RolePolicy(`${name}-policy`, {
      role: args.roleName,
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:UpdateTable',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput().partition}:dynamodb:${aws.getRegionOutput().name}:${aws.getCallerIdentityOutput().accountId}:table/${args.tableName}`,
            ],
          },
        ],
      }
    }, opts);
    this.registerOutputs({});
  }
}