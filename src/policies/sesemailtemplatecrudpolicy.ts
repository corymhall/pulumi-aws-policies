// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as ccapi from '@pulumi/aws-native';
import * as pulumi from '@pulumi/pulumi';

export interface SESEmailTemplateCrudPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;
}

/**
 * Gives permission to create, get, list, update and delete SES Email Templates
 */
export class SESEmailTemplateCrudPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: SESEmailTemplateCrudPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:SESEmailTemplateCrudPolicy', name, args, opts);
    const opt = {
      parent: this,
      ...opts,
    };
    new ccapi.iam.RolePolicy(`${name}-policy`, {
      roleName: args.roleName,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'ses:CreateTemplate',
              'ses:GetTemplate',
              'ses:ListTemplates',
              'ses:UpdateTemplate',
              'ses:DeleteTemplate',
              'ses:TestRenderTemplate',
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