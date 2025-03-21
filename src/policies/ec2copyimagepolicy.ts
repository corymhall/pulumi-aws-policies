// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface EC2CopyImagePolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;

  /**
   * The id of the image
   */
  imageId: pulumi.Input<string>;
}

/**
 * Gives permission top copy EC2 Images
 */
export class EC2CopyImagePolicy extends pulumi.ComponentResource {
  constructor(name: string, args: EC2CopyImagePolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:EC2CopyImagePolicy', name, args, opts);
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
              'ec2:CopyImage',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:ec2:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:image/${args.imageId}`,
            ],
          },
        ],
      }
    }, opt);
    this.registerOutputs({});
  }
}