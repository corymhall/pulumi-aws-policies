// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface TextractPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;
}

/**
 * Gives full access to Textract
 */
export class TextractPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: TextractPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:TextractPolicy', name, args, opts);
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
              'textract:*',
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