// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface EventBridgePutEventsPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;

  /**
   * Name of the EventBridge EventBus
   */
  eventBusName: pulumi.Input<string>;
}

/**
 * Gives permissions to send events to EventBridge
 */
export class EventBridgePutEventsPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: EventBridgePutEventsPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:EventBridgePutEventsPolicy', name, args, opts);
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
              'events:PutEvents',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput({}, opts).partition}:events:${aws.getRegionOutput({}, opts).name}:${aws.getCallerIdentityOutput({}, opts).accountId}:event-bus/${args.eventBusName}`,
            ],
          },
        ],
      }
    }, opt);
    this.registerOutputs({});
  }
}