const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const wf = fs.readFileSync(path.join(__dirname, '..', '.github', 'workflows', 'deploy.yml'), 'utf8');

test('the pages artifact is uploaded in the build job, not in the deploy job', () => {
  const build = wf.slice(wf.indexOf('  build:'), wf.indexOf('  deploy:'));
  const deploy = wf.slice(wf.indexOf('  deploy:'));
  assert.match(build, /actions\/upload-pages-artifact@/);
  assert.doesNotMatch(deploy, /upload-pages-artifact|upload-artifact|download-artifact/);
  assert.match(deploy, /actions\/deploy-pages@/);
});
