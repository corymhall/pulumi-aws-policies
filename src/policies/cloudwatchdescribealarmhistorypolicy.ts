// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as ccapi from '@pulumi/aws-native';
import * as pulumi from '@pulumi/pulumi';

export interface CloudWatchDescribeAlarmHistoryPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;
}

/**
 * Gives permissions to describe CloudWatch alarm history
 */
export class CloudWatchDescribeAlarmHistoryPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: CloudWatchDescribeAlarmHistoryPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:CloudWatchDescribeAlarmHistoryPolicy', name, args, opts);
    const opt = {
      parent: this,
      ...opts,
    };
    new ccapi.iam.RolePolicy(`${name}-policy`, {
      roleName: args.roleName,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'cloudwatch:DescribeAlarmHistory',
            ],
            Resource: [
              pulumi.interpolate`*`,
            ],
          },
        ],
      }
    }, opt);
    this.registerOutputs({});
  }
}