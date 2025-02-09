import { JsonPatch, typescript } from 'projen';
import {
  NodePackageManager,
  Transform,
  UpgradeDependenciesSchedule,
} from 'projen/lib/javascript';
import { PoliciesGenerator } from './projenrc';
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'pulumi-aws-policies',
  projenrcTs: true,
  release: true,
  entrypoint: 'src/index.ts',
  releaseToNpm: false,
  githubOptions: {
    mergify: false,
    workflows: true,
    mergeQueue: true,
    mergeQueueOptions: {
      targetBranches: ['main'],
    },
  },
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve'],
      schedule: UpgradeDependenciesSchedule.WEEKLY,
    },
  },
  autoApproveOptions: {
    label: 'auto-approve',
    allowedUsernames: ['corymhall'],
    secret: 'PROJEN_GITHUB_TOKEN',
  },
  prettier: true,
  prettierOptions: {
    settings: {
      singleQuote: true,
    },
  },
  eslintOptions: {
    dirs: [],
    prettier: true,
  },
  packageManager: NodePackageManager.NPM,

  deps: [
    'pulumi-ts-provider@https://gitpkg.vercel.app/mikhailshilkov/comp-as-comp/ts/pulumi-ts-provider?20621b672151ec13b7c384d570e713f765cc83ca',
    '@pulumi/pulumi',
    '@pulumi/aws-native',
    '@pulumi/aws',
  ],
  devDeps: ['@swc/core', '@swc/jest', 'camelcase'],
  jestOptions: {
    configFilePath: 'jest.config.json',
  },
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
const eslint = project.tryFindObjectFile('.eslintrc.json');
// I don't want to show linting errors for things that get auto fixed
eslint?.addOverride('extends', ['plugin:import/typescript']);

const jestConfig = project.tryFindObjectFile('jest.config.json');
jestConfig?.patch(JsonPatch.remove('/preset'));
jestConfig?.patch(JsonPatch.remove('/globals'));
jestConfig?.patch(
  JsonPatch.add('/transform', {
    '^.+\\.(t|j)sx?$': new Transform('@swc/jest'),
  }),
);

new PoliciesGenerator(project, 'policies');

project.synth();
