import * as fs from 'fs';
import * as path from 'path';

type FnSubWithArgs = [string, { [key: string]: { Ref: string } }];
type FnSub = string | FnSubWithArgs;
type Resource = string | { 'Fn::Sub': FnSub };

export interface PolicyStatement extends InitialPolicyStatement {
  Resource: string | string[];
  Condition?: {
    StringEquals: {
      [key: string]: string;
    };
  };
}

interface InitialPolicyStatement {
  Action: string | string[];
  Effect: string;
  Resource: Resource | Resource[];
  Condition?: {
    StringEquals: {
      [key: string]:
        | {
            'Fn::Sub': FnSubWithArgs;
          }
        | string;
    };
  };
}

export interface PolicyTemplate extends InitialPolicyTemplate {
  Definition: {
    Statement: PolicyStatement[];
  };
}

interface InitialPolicyTemplate {
  Definition: {
    Statement: InitialPolicyStatement[];
  };
  Description: string;
  Parameters: {
    [key: string]: {
      Description: string;
    };
  };
}

export interface PolicyTemplates extends InitialPolicyTemplates {
  Templates: {
    [key: string]: PolicyTemplate;
  };
}

interface InitialPolicyTemplates {
  Templates: {
    [key: string]: InitialPolicyTemplate;
  };
  Version: string;
}

function parseFnSub(fnSub: FnSub): string {
  if (typeof fnSub === 'string') {
    return fnSub;
  }

  const [template, replacements] = fnSub;
  return template.replace(
    /\${(\w+)}/g,
    (_, key) => `\${Ref.${replacements[key].Ref}}`,
  );
}

function transformStatement(
  statement: InitialPolicyStatement,
): InitialPolicyStatement {
  if (Array.isArray(statement.Resource)) {
    for (let i = 0; i < statement.Resource.length; i++) {
      const res = statement.Resource[i];
      if (typeof res === 'object' && 'Fn::Sub' in res) {
        statement.Resource[i] = parseFnSub(res['Fn::Sub']);
      }
    }
  } else {
    if (
      typeof statement.Resource === 'object' &&
      'Fn::Sub' in statement.Resource
    ) {
      statement.Resource = parseFnSub(statement.Resource['Fn::Sub']);
    }
  }

  if (statement.Condition && statement.Condition.StringEquals) {
    for (const key in statement.Condition.StringEquals) {
      const se = statement.Condition.StringEquals[key];
      if (typeof se === 'object' && 'Fn::Sub' in se) {
        statement.Condition.StringEquals[key] = parseFnSub(se['Fn::Sub']);
      }
    }
  }

  return statement;
}

export function parseTemplates(): PolicyTemplates {
  const contents = fs.readFileSync(
    path.join(__dirname, '../schemas/policy_templates.json'),
    {
      encoding: 'utf-8',
    },
  );

  const profiles: InitialPolicyTemplates = JSON.parse(contents);
  for (const templateKey in profiles.Templates) {
    const template = profiles.Templates[templateKey];
    template.Definition.Statement =
      template.Definition.Statement.map(transformStatement);
  }

  return profiles as PolicyTemplates;
}
