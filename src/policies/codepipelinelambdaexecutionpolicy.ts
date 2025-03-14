// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface CodePipelineLambdaExecutionPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;
}

/**
 * Gives permission for a Lambda function invoked by AWS CodePipeline to report back status of the job
 */
export class CodePipelineLambdaExecutionPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: CodePipelineLambdaExecutionPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:CodePipelineLambdaExecutionPolicy', name, args, opts);
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
              'codepipeline:PutJobSuccessResult',
              'codepipeline:PutJobFailureResult',
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