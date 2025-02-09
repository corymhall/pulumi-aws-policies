// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface StepFunctionsCallbackPolicyArgs {
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
 * Gives permission to implement callback tasks in Step Functions
 */
export class StepFunctionsCallbackPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: StepFunctionsCallbackPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:StepFunctionsCallbackPolicy', name, args, opts);
    new aws.iam.RolePolicy(`${name}-policy`, {
      role: args.roleName,
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'states:SendTaskFailure',
              'states:SendTaskHeartbeat',
              'states:SendTaskSuccess',
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