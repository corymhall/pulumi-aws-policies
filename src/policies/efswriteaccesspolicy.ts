// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface EFSWriteAccessPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;

  /**
   * Resource ID of the Elastic File System Access Point
   */
  accessPoint: pulumi.Input<string>;

  /**
   * Resource ID of the Elastic File System
   */
  fileSystem: pulumi.Input<string>;
}

/**
 * Gives permission to mount an Elastic File System with write access
 */
export class EFSWriteAccessPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: EFSWriteAccessPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:EFSWriteAccessPolicy', name, args, opts);
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
              'elasticfilesystem:ClientMount',
              'elasticfilesystem:ClientWrite',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:elasticfilesystem:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:file-system/${args.fileSystem}`,
            ],
            Condition: {
              StringEquals: {
                'elasticfilesystem:AccessPointArn': pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:elasticfilesystem:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:access-point/${args.accessPoint}`,
              },
            },
          },
        ],
      }
    }, opt);
    this.registerOutputs({});
  }
}