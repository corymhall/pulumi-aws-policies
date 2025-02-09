// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface StepFunctionsExecutionPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;

  /**
   * The name of the state machine to execute.
   */
  stateMachineName: pulumi.Input<string>;
}

/**
 * Gives permission to start a Step Functions state machine execution
 */
export class StepFunctionsExecutionPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: StepFunctionsExecutionPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:StepFunctionsExecutionPolicy', name, args, opts);
    new aws.iam.RolePolicy(`${name}-policy`, {
      role: args.roleName,
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'states:StartExecution',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput().partition}:states:${aws.getRegionOutput().name}:${aws.getCallerIdentityOutput().accountId}:stateMachine:${args.stateMachineName}`,
            ],
          },
        ],
      }
    }, opts);
    this.registerOutputs({});
  }
}