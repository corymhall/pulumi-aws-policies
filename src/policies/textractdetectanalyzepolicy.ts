// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface TextractDetectAnalyzePolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;
}

/**
 * Gives access to detect and analyze documents with Textract
 */
export class TextractDetectAnalyzePolicy extends pulumi.ComponentResource {
  constructor(name: string, args: TextractDetectAnalyzePolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:TextractDetectAnalyzePolicy', name, args, opts);
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
              'textract:DetectDocumentText',
              'textract:StartDocumentTextDetection',
              'textract:StartDocumentAnalysis',
              'textract:AnalyzeDocument',
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