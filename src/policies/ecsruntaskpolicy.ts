// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface EcsRunTaskPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;

  /**
   * The family and revision (family:revision) of the task definition
   */
  taskDefinition: pulumi.Input<string>;
}

/**
 * Gives permission to start a new task for a task definition
 */
export class EcsRunTaskPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: EcsRunTaskPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:EcsRunTaskPolicy', name, args, opts);
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
              'ecs:RunTask',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:ecs:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:task-definition/${args.taskDefinition}`,
            ],
          },
        ],
      }
    }, opt);
    this.registerOutputs({});
  }
}