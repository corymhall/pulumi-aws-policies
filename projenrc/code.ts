import camelCase from 'camelcase';
import { Project, SourceCode } from 'projen';
import { PolicyStatement } from './templates';

export interface CodeInfo {
  description: string;
  parameters: {
    [key: string]: { Description: string };
  };
  statements: PolicyStatement[];
}

/**
 *
 */
export class Code extends SourceCode {
  constructor(
    project: Project,
    filePath: string,
    componentName: string,
    info: CodeInfo,
  ) {
    super(project, filePath);
    if (this.marker) {
      this.line(`// ${this.marker}`);
    }
    this.line(`import * as ccapi from '@pulumi/aws-native';`);
    this.line(`import * as pulumi from '@pulumi/pulumi';`);
    this.line();
    this.open(`export interface ${componentName}Args {`);
    this.line('/**');
    this.line(' * The name of the role to attach the policy to.');
    this.line(' */');
    this.line('roleName: pulumi.Input<string>;');
    for (const [key, value] of Object.entries(info.parameters)) {
      this.line();
      this.line('/**');
      this.line(' * ' + value.Description);
      this.line(' */');
      this.line(`${camelCase(key)}: pulumi.Input<string>;`);
    }
    this.close('}');
    this.line();

    this.line('/**');
    this.line(` * ${info.description}`);
    this.line(' */');
    this.open(
      `export class ${componentName} extends pulumi.ComponentResource {`,
    );
    this.open(
      `constructor(name: string, args: ${componentName}Args, opts?: pulumi.ComponentResourceOptions) {`,
    );
    this.line(
      `super('aws-policies:index:${componentName}', name, args, opts);`,
    );
    this.open('const opt = {');
    this.line('parent: this,');
    this.line('...opts,');
    this.close('};');
    this.open('new ccapi.iam.RolePolicy(`${name}-policy`, {');
    this.line('roleName: args.roleName,');
    this.open('policyDocument: {');
    this.line("Version: '2012-10-17',");
    this.open('Statement: [');
    if (info.statements) {
      this.writePolicy(this, info.statements);
    }

    this.close('],');
    this.close('}');
    this.close('}, opt);');

    this.closeCode();
  }

  protected writePolicy(src: SourceCode, statements: PolicyStatement[]) {
    for (const statement of statements) {
      const action = Array.isArray(statement.Action)
        ? statement.Action
        : [statement.Action];
      const resources = Array.isArray(statement.Resource)
        ? statement.Resource
        : [statement.Resource];
      src.open('{');
      src.line(`Effect: '${statement.Effect}',`);
      src.open('Action: [');
      action.forEach((a) => src.line(`'${a}',`));
      src.close('],');
      src.open('Resource: [');
      resources.forEach((res) => {
        src.line(this.replace(`pulumi.interpolate\`${res}\`,`));
      });
      src.close('],');
      if (statement.Condition) {
        src.open('Condition: {');
        src.open('StringEquals: {');
        for (const [key, value] of Object.entries(
          statement.Condition.StringEquals,
        )) {
          src.line(
            `'${key}': ${this.replace(`pulumi.interpolate\`${value}\``)},`,
          );
        }
        src.close('},');
        src.close('},');
      }
      src.close('},');
    }
  }

  protected closeCode(): void {
    this.line('this.registerOutputs({});');
    this.close('}');
    this.close('}');
  }

  protected replace(str: string): string {
    return str
      .replace(/Ref\.(\w+)/g, (_, attr) => {
        return `args.${camelCase(attr)}`;
      })
      .replace('AWS::AccountId', 'ccapi.getAccountIdOutput(opt).accountId')
      .replace('AWS::Region', 'ccapi.getRegionOutput(opt).region')
      .replace('AWS::Partition', 'ccapi.getPartitionOutput(opt).partition');
  }

  protected getReference(resourceType: string, attribute: string): string {
    switch (attribute) {
      case 'ResourceId':
        return 'id';
      case 'Arn':
        switch (resourceType) {
          case 'Function':
            return 'arn';
          case 'PlaceIndex':
            return 'indexArn';
          default:
            return 'arn';
        }
      default:
        return attribute.toLowerCase();
    }
  }
  protected getArgLine(
    typ: string,
    module: string,
    resourceType: string,
  ): string {
    switch (resourceType) {
      case 'Function':
        return `${typ}: aws.lambda.Function;`;
      case 'StateMachine':
        return `${typ}: aws.sfn.StateMachine;`;
      case 'Rule':
        return `${typ}: aws.cloudwatch.EventRule;`;
      case 'EventBus':
        return `${typ}: aws.cloudwatch.EventBus;`;
      default:
        return `${typ}: aws.${module.toLowerCase()}.${resourceType};`;
    }
  }
}
