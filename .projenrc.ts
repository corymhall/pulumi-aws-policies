import {
  GithubCredentials,
  PulumiEscSetup,
  TypeScriptComponent,
} from '@hallcor/pulumi-projen-project-types';
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
    workflowOptions: {
      branches: ['main'],
      labels: ['auto-approve'],
      schedule: UpgradeDependenciesSchedule.WEEKLY,
    },
  },
  autoApproveOptions: {
    label: 'auto-approve',
    allowedUsernames: ['corymhall', 'hallcor-projen-app[bot]'],
  },
  projenCredentials: GithubCredentials.fromApp({
    pulumiEscSetup: PulumiEscSetup.fromOidcAuth({
      environment: 'github/public',
      organization: 'corymhall',
    }),
  }),
  packageManager: NodePackageManager.NPM,
  deps: ['@pulumi/pulumi', '@pulumi/aws-native', '@pulumi/aws'],
  devDeps: ['camelcase', '@hallcor/pulumi-projen-project-types'],
});

new PoliciesGenerator(project, 'policies');

project.synth();
