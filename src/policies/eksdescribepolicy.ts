// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface EKSDescribePolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;
}

/**
 * Gives permission to describe or list Amazon EKS clusters
 */
export class EKSDescribePolicy extends pulumi.ComponentResource {
  constructor(name: string, args: EKSDescribePolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:EKSDescribePolicy', name, args, opts);
    new aws.iam.RolePolicy(`${name}-policy`, {
      role: args.roleName,
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'eks:DescribeCluster',
              'eks:ListClusters',
            ],
            Resource: [
              pulumi.interpolate`*`,
            ],
          },
        ],
      }
    });
    this.registerOutputs({});
  }
}