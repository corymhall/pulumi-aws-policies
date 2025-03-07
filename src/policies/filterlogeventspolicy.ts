// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as ccapi from '@pulumi/aws-native';
import * as pulumi from '@pulumi/pulumi';

export interface FilterLogEventsPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;

  /**
   * Name of the Log Group
   */
  logGroupName: pulumi.Input<string>;
}

/**
 * Gives permission to filter Log Events from a specified Log Group
 */
export class FilterLogEventsPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: FilterLogEventsPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:FilterLogEventsPolicy', name, args, opts);
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
              'logs:FilterLogEvents',
            ],
            Resource: [
              pulumi.interpolate`arn:${ccapi.getPartitionOutput(opt).partition}:logs:${ccapi.getRegionOutput(opt).region}:${ccapi.getAccountIdOutput(opt).accountId}:log-group:${args.logGroupName}:log-stream:*`,
            ],
          },
        ],
      }
    }, opt);
    this.registerOutputs({});
  }
}