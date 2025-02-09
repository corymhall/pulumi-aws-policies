// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
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
    new aws.iam.RolePolicy(`${name}-policy`, {
      role: args.roleName,
      policy: {
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
    }, opts);
    this.registerOutputs({});
  }
}