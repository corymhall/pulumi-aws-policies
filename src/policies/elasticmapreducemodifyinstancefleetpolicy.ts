// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface ElasticMapReduceModifyInstanceFleetPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;

  /**
   * The unique identifier of the cluster
   */
  clusterId: pulumi.Input<string>;
}

/**
 * Gives permission to list details and modify capacities for instance fleets within a cluster
 */
export class ElasticMapReduceModifyInstanceFleetPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: ElasticMapReduceModifyInstanceFleetPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:ElasticMapReduceModifyInstanceFleetPolicy', name, args, opts);
    const opt = {
      parent: this,
      ...opts,
    };
    new aws.iam.RolePolicy(`${name}-policy`, {
      role: args.roleName,
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'elasticmapreduce:ModifyInstanceFleet',
              'elasticmapreduce:ListInstanceFleets',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:elasticmapreduce:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:cluster/${args.clusterId}`,
            ],
          },
        ],
      }
    }, opt);
    this.registerOutputs({});
  }
}