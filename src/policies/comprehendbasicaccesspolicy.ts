// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface ComprehendBasicAccessPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;
}

/**
 * Gives access to Amazon Comprehend APIs for detecting entities, key phrases, languages and sentiments
 */
export class ComprehendBasicAccessPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: ComprehendBasicAccessPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:ComprehendBasicAccessPolicy', name, args, opts);
    new aws.iam.RolePolicy(`${name}-policy`, {
      role: args.roleName,
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'comprehend:BatchDetectKeyPhrases',
              'comprehend:DetectDominantLanguage',
              'comprehend:DetectEntities',
              'comprehend:BatchDetectEntities',
              'comprehend:DetectKeyPhrases',
              'comprehend:DetectSentiment',
              'comprehend:BatchDetectDominantLanguage',
              'comprehend:BatchDetectSentiment',
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