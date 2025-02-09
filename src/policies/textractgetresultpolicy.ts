// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface TextractGetResultPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;
}

/**
 * Gives access to get detected and analyzed documents from Textract
 */
export class TextractGetResultPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: TextractGetResultPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:TextractGetResultPolicy', name, args, opts);
    new aws.iam.RolePolicy(`${name}-policy`, {
      role: args.roleName,
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'textract:GetDocumentTextDetection',
              'textract:GetDocumentAnalysis',
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