// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as ccapi from '@pulumi/aws-native';
import * as pulumi from '@pulumi/pulumi';

export interface CodeCommitReadPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;

  /**
   * Name of the CodeCommit Repository
   */
  repositoryName: pulumi.Input<string>;
}

/**
 * Gives permissions to read objects within a specific codecommit repository
 */
export class CodeCommitReadPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: CodeCommitReadPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:CodeCommitReadPolicy', name, args, opts);
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
              'codecommit:GitPull',
              'codecommit:GetBranch',
              'codecommit:ListBranches',
              'codecommit:BatchDescribeMergeConflicts',
              'codecommit:DescribeMergeConflicts',
              'codecommit:GetMergeCommit',
              'codecommit:GetMergeOptions',
              'codecommit:BatchGetPullRequests',
              'codecommit:DescribePullRequestEvents',
              'codecommit:GetCommentsForPullRequest',
              'codecommit:GetCommitsFromMergeBase',
              'codecommit:GetMergeConflicts',
              'codecommit:GetPullRequest',
              'codecommit:ListPullRequests',
              'codecommit:GetBlob',
              'codecommit:GetFile',
              'codecommit:GetFolder',
              'codecommit:GetComment',
              'codecommit:GetCommentsForComparedCommit',
              'codecommit:BatchGetCommits',
              'codecommit:GetCommit',
              'codecommit:GetCommitHistory',
              'codecommit:GetDifferences',
              'codecommit:GetObjectIdentifier',
              'codecommit:GetReferences',
              'codecommit:GetTree',
              'codecommit:GetRepository',
              'codecommit:ListTagsForResource',
              'codecommit:GetRepositoryTriggers',
              'codecommit:TestRepositoryTriggers',
              'codecommit:GetBranch',
              'codecommit:GetCommit',
              'codecommit:GetUploadArchiveStatus',
            ],
            Resource: [
              pulumi.interpolate`arn:${ccapi.getPartitionOutput(opt).partition}:codecommit:${ccapi.getRegionOutput(opt).region}:${ccapi.getAccountIdOutput(opt).accountId}:${args.repositoryName}`,
            ],
          },
        ],
      }
    }, opt);
    this.registerOutputs({});
  }
}