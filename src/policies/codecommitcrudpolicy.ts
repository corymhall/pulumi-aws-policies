// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface CodeCommitCrudPolicyArgs {
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
 * Gives permissions to create/read/update/delete objects within a specific codecommit repository
 */
export class CodeCommitCrudPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: CodeCommitCrudPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:CodeCommitCrudPolicy', name, args, opts);
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
              'codecommit:GitPull',
              'codecommit:GitPush',
              'codecommit:CreateBranch',
              'codecommit:DeleteBranch',
              'codecommit:GetBranch',
              'codecommit:ListBranches',
              'codecommit:MergeBranchesByFastForward',
              'codecommit:MergeBranchesBySquash',
              'codecommit:MergeBranchesByThreeWay',
              'codecommit:UpdateDefaultBranch',
              'codecommit:BatchDescribeMergeConflicts',
              'codecommit:CreateUnreferencedMergeCommit',
              'codecommit:DescribeMergeConflicts',
              'codecommit:GetMergeCommit',
              'codecommit:GetMergeOptions',
              'codecommit:BatchGetPullRequests',
              'codecommit:CreatePullRequest',
              'codecommit:DescribePullRequestEvents',
              'codecommit:GetCommentsForPullRequest',
              'codecommit:GetCommitsFromMergeBase',
              'codecommit:GetMergeConflicts',
              'codecommit:GetPullRequest',
              'codecommit:ListPullRequests',
              'codecommit:MergePullRequestByFastForward',
              'codecommit:MergePullRequestBySquash',
              'codecommit:MergePullRequestByThreeWay',
              'codecommit:PostCommentForPullRequest',
              'codecommit:UpdatePullRequestDescription',
              'codecommit:UpdatePullRequestStatus',
              'codecommit:UpdatePullRequestTitle',
              'codecommit:DeleteFile',
              'codecommit:GetBlob',
              'codecommit:GetFile',
              'codecommit:GetFolder',
              'codecommit:PutFile',
              'codecommit:DeleteCommentContent',
              'codecommit:GetComment',
              'codecommit:GetCommentsForComparedCommit',
              'codecommit:PostCommentForComparedCommit',
              'codecommit:PostCommentReply',
              'codecommit:UpdateComment',
              'codecommit:BatchGetCommits',
              'codecommit:CreateCommit',
              'codecommit:GetCommit',
              'codecommit:GetCommitHistory',
              'codecommit:GetDifferences',
              'codecommit:GetObjectIdentifier',
              'codecommit:GetReferences',
              'codecommit:GetTree',
              'codecommit:GetRepository',
              'codecommit:UpdateRepositoryDescription',
              'codecommit:ListTagsForResource',
              'codecommit:TagResource',
              'codecommit:UntagResource',
              'codecommit:GetRepositoryTriggers',
              'codecommit:PutRepositoryTriggers',
              'codecommit:TestRepositoryTriggers',
              'codecommit:GetBranch',
              'codecommit:GetCommit',
              'codecommit:UploadArchive',
              'codecommit:GetUploadArchiveStatus',
              'codecommit:CancelUploadArchive',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:codecommit:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:${args.repositoryName}`,
            ],
          },
        ],
      }
    }, opt);
    this.registerOutputs({});
  }
}