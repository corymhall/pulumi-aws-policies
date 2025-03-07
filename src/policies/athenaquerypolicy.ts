// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as ccapi from '@pulumi/aws-native';
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
              pulumi.interpolate`arn:${ccapi.getPartitionOutput(opt).partition}:athena:${ccapi.getRegionOutput(opt).region}:${ccapi.getAccountIdOutput(opt).accountId}:workgroup/${args.workGroupName}`,
            ],
          },
        ],
      }
    }, opt);
    this.registerOutputs({});
  }
}