// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface Route53ChangeResourceRecordSetsPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;

  /**
   * ID of the hosted zone
   */
  hostedZoneId: pulumi.Input<string>;
}

/**
 * Gives permission to change resource record sets in Route 53
 */
export class Route53ChangeResourceRecordSetsPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: Route53ChangeResourceRecordSetsPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:Route53ChangeResourceRecordSetsPolicy', name, args, opts);
    new aws.iam.RolePolicy(`${name}-policy`, {
      role: args.roleName,
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'route53:ChangeResourceRecordSets',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput().partition}:route53:::hostedzone/${args.hostedZoneId}`,
            ],
          },
        ],
      }
    }, opts);
    this.registerOutputs({});
  }
}