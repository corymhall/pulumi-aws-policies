// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface MobileAnalyticsWriteOnlyAccessPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;
}

/**
 * Gives write only permissions to put event data for all application resources
 */
export class MobileAnalyticsWriteOnlyAccessPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: MobileAnalyticsWriteOnlyAccessPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:MobileAnalyticsWriteOnlyAccessPolicy', name, args, opts);
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
              'mobileanalytics:PutEvents',
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