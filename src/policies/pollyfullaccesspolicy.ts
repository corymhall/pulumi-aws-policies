// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface PollyFullAccessPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;

  /**
   * Name of the Lexicon
   */
  lexiconName: pulumi.Input<string>;
}

/**
 * Gives full access permissions to Polly lexicon resources
 */
export class PollyFullAccessPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: PollyFullAccessPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:PollyFullAccessPolicy', name, args, opts);
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
              'polly:GetLexicon',
              'polly:DeleteLexicon',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:polly:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:lexicon/${args.lexiconName}`,
            ],
          },
          {
            Effect: 'Allow',
            Action: [
              'polly:DescribeVoices',
              'polly:ListLexicons',
              'polly:PutLexicon',
              'polly:SynthesizeSpeech',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:polly:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:lexicon/*`,
            ],
          },
        ],
      }
    }, opt);
    this.registerOutputs({});
  }
}