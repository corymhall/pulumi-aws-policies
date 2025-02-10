// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface SESBulkTemplatedCrudPolicy_v2Args {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;

  /**
   * Identity to give permissions to
   */
  identityName: pulumi.Input<string>;

  /**
   * Name of the email template
   */
  templateName: pulumi.Input<string>;
}

/**
 * Gives permission to send email, templated email, templated bulk emails and verify identity
 */
export class SESBulkTemplatedCrudPolicy_v2 extends pulumi.ComponentResource {
  constructor(name: string, args: SESBulkTemplatedCrudPolicy_v2Args, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:SESBulkTemplatedCrudPolicy_v2', name, args, opts);
    new aws.iam.RolePolicy(`${name}-policy`, {
      role: args.roleName,
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'ses:SendEmail',
              'ses:SendRawEmail',
              'ses:SendTemplatedEmail',
              'ses:SendBulkTemplatedEmail',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:ses:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:identity/${args.identityName}`,
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:ses:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:template/${args.templateName}`,
            ],
          },
          {
            Effect: 'Allow',
            Action: [
              'ses:GetIdentityVerificationAttributes',
              'ses:VerifyEmailIdentity',
            ],
            Resource: [
              pulumi.interpolate`*`,
            ],
          },
        ],
      }
    }, opts);
    this.registerOutputs({});
  }
}