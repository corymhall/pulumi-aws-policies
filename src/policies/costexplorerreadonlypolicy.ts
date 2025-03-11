// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface CostExplorerReadOnlyPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;
}

/**
 * Gives access to the readonly Cost Explorer APIs for billing history
 */
export class CostExplorerReadOnlyPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: CostExplorerReadOnlyPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:CostExplorerReadOnlyPolicy', name, args, opts);
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
              'ce:GetCostAndUsage',
              'ce:GetDimensionValues',
              'ce:GetReservationCoverage',
              'ce:GetReservationPurchaseRecommendation',
              'ce:GetReservationUtilization',
              'ce:GetTags',
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