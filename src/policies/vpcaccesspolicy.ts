// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface VPCAccessPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;
}

/**
 * Gives access to create, delete, describe and detach ENIs
 */
export class VPCAccessPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: VPCAccessPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:VPCAccessPolicy', name, args, opts);
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
              'ec2:CreateNetworkInterface',
              'ec2:DeleteNetworkInterface',
              'ec2:DescribeNetworkInterfaces',
              'ec2:DetachNetworkInterface',
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