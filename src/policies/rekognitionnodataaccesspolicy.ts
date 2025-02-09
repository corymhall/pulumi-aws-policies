// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface RekognitionNoDataAccessPolicyArgs {
  /**
   * The name of the role to attach the policy to.
   */
  roleName: pulumi.Input<string>;

  /**
   * ID of the collection
   */
  collectionId: pulumi.Input<string>;
}

/**
 * Gives permission to compare and detect faces and labels
 */
export class RekognitionNoDataAccessPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: RekognitionNoDataAccessPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:RekognitionNoDataAccessPolicy', name, args, opts);
    new aws.iam.RolePolicy(`${name}-policy`, {
      role: args.roleName,
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'rekognition:CompareFaces',
              'rekognition:DetectFaces',
              'rekognition:DetectLabels',
              'rekognition:DetectModerationLabels',
            ],
            Resource: [
              pulumi.interpolate`arn:${aws.getPartitionOutput().partition}:rekognition:${aws.getRegionOutput().name}:${aws.getCallerIdentityOutput().accountId}:collection/${args.collectionId}`,
            ],
          },
        ],
      }
    });
    this.registerOutputs({});
  }
}