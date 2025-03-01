import { TypeScriptComponent } from '@hallcor/pulumi-projen-project-types';
import {
  NodePackageManager,
  UpgradeDependenciesSchedule,
} from 'projen/lib/javascript';
import { PoliciesGenerator } from './projenrc';

const project = new TypeScriptComponent({
  defaultReleaseBranch: 'main',
  name: 'aws-policies',
  projenrcTs: true,
  depsUpgradeOptions: {
    include: ['projen'],
    workflowOptions: {
      branches: ['main'],
      labels: ['auto-approve'],
      schedule: UpgradeDependenciesSchedule.WEEKLY,
    },
  },
  autoApproveOptions: {
    label: 'auto-approve',
    allowedUsernames: ['corymhall', 'renovate[bot]'],
  },
  packageManager: NodePackageManager.NPM,
  deps: ['@pulumi/pulumi', '@pulumi/aws-native', '@pulumi/aws'],
  devDeps: ['camelcase', '@hallcor/pulumi-projen-project-types'],
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});

new PoliciesGenerator(project, 'policies');

project.synth();
