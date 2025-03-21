// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface AthenaQueryPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;

  /**
   * Name of the Athena Workgroup
   */
  workGroupName: pulumi.Input<string>;
}

/**
 * Gives permissions to execute Athena queries
 */
export class AthenaQueryPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: AthenaQueryPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:AthenaQueryPolicy', name, args, opts);
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
              'athena:ListWorkGroups',
              'athena:GetExecutionEngine',
              'athena:GetExecutionEngines',
              'athena:GetNamespace',
              'athena:GetCatalogs',
              'athena:GetNamespaces',
              'athena:GetTables',
              'athena:GetTable',
            ],
            Resource: [
              pulumi.interpolate`*`,
            ],
          },
          {
            Effect: 'Allow',
            Action: [
              'athena:StartQueryExecution',
              'athena:GetQueryResults',
              'athena:DeleteNamedQuery',
              'athena:GetNamedQuery',
              'athena:ListQueryExecutions',
              'athena:StopQueryExecution',
              'athena:GetQueryResultsStream',
              'athena:ListNamedQueries',
              'athena:CreateNamedQuery',
              'athena:GetQueryExecution',
              'athena:BatchGetNamedQuery',
              'athena:BatchGetQueryExecution',
              'athena:GetWorkGroup',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:athena:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:workgroup/${args.workGroupName}`,
            ],
          },
        ],
      }
    }, opt);
    this.registerOutputs({});
  }
}