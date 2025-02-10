// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface SESCrudPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;

  /**
   * Identity to give permissions to
   */
  identityName: pulumi.Input<string>;
}

/**
 * Gives permission to send email and verify identity
 */
export class SESCrudPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: SESCrudPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:SESCrudPolicy', name, args, opts);
    new aws.iam.RolePolicy(`${name}-policy`, {
      role: args.roleName,
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'ses:GetIdentityVerificationAttributes',
              'ses:SendEmail',
              'ses:SendRawEmail',
              'ses:VerifyEmailIdentity',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:ses:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:identity/${args.identityName}`,
            ],
          },
        ],
      }
    }, opts);
    this.registerOutputs({});
  }
}