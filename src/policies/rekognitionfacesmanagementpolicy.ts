// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export interface RekognitionFacesManagementPolicyArgs {
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
 * Gives permission to add, delete and search faces in a collection
 */
export class RekognitionFacesManagementPolicy extends pulumi.ComponentResource {
  constructor(name: string, args: RekognitionFacesManagementPolicyArgs, opts?: pulumi.ComponentResourceOptions) {
    super('aws-policies:index:RekognitionFacesManagementPolicy', name, args, opts);
    new aws.iam.RolePolicy(`${name}-policy`, {
      role: args.roleName,
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'rekognition:IndexFaces',
              'rekognition:DeleteFaces',
              'rekognition:SearchFaces',
              'rekognition:SearchFacesByImage',
              'rekognition:ListFaces',
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