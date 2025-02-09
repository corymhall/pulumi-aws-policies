// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface ServerlessRepoReadWriteAccessPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;
}

/**
 * Gives access permissions to create and list applications in the AWS Serverless Application Repository service
 */
export class ServerlessRepoReadWriteAccessPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: ServerlessRepoReadWriteAccessPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:ServerlessRepoReadWriteAccessPolicy', name, args, opts);
    new aws.iam.RolePolicy(`${name}-policy`, {
      role: args.roleName,
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'serverlessrepo:CreateApplication',
              'serverlessrepo:CreateApplicationVersion',
              'serverlessrepo:UpdateApplication',
              'serverlessrepo:GetApplication',
              'serverlessrepo:ListApplications',
              'serverlessrepo:ListApplicationVersions',
              'serverlessrepo:ListApplicationDependencies',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput().partition}:serverlessrepo:${aws.getRegionOutput().name}:${aws.getCallerIdentityOutput().accountId}:applications/*`,
            ],
          },
        ],
      }
    });
    this.registerOutputs({});
  }
}