# Pulumi AWS Policies Component Library

This is a Pulumi Component Library for creating AWS IAM Role Policies based on
the [SAM policy templates](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-policy-templates.html).

> This project was created with [@hallcor/pulumi-projen-project-types](https://github.com/corymhall/pulumi-projen-project-types)
> You can create your own with `npx projen new --from @hallcor/pulumi-projen-project-types type_script_project`

## Getting Started

To add this component to your Pulumi app run `pulumi package add`

```console
$ pulumi package add https://github.com/corymhall/pulumi-aws-policies
```

## Example

Below is an example of using the `S3CrudPolicy` to grant an IAM Role CRUD access
to an S3 Bucket.

```ts
import * as aws from '@pulumi/aws';
import * as policies from '@pulumi/aws-policies';

const bucket =  new aws.s3.BucketV2('my-bucket');

const role = new aws.iam.Role('lambda-role', {
  assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal(
    aws.iam.Principals.LambdaPrincipal,
  ),
});

new policies.S3CrudPolicy('s3-policy', {
  bucketName: bucket.bucketName,
  roleName: role.name,
});
```
