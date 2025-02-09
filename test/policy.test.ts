import { parseTemplates } from '../projenrc/templates';

test('snapshot', () => {
  const templates = parseTemplates();
  expect(templates).toMatchSnapshot();
});
