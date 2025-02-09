import * as path from 'path';
import { Construct } from 'constructs';
import { Project } from 'projen';
import { Code } from './code';
import { parseTemplates, PolicyTemplates } from './templates';

export class PoliciesGenerator extends Construct {
  private policies: PolicyTemplates;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.policies = parseTemplates();

    for (const [name, template] of Object.entries(this.policies.Templates)) {
      new Code(
        Project.of(this),
        path.join(`src/policies/${name.toLowerCase()}.ts`),
        name,
        {
          description: template.Description,
          parameters: template.Parameters,
          statements: template.Definition.Statement,
        },
      );
    }
  }
}
