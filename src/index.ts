import * as core from '@actions/core';
import * as installer from './installer';
import { isGitCommitHash } from './release';

async function run() {
  try {
    const version = core.getInput('flutter-version') || '';
    const channel = core.getInput('channel') || 'stable';
    const platforms = core.getInput('platforms').split(',')

    if (channel == 'master' && version != '' && !isGitCommitHash(version)) {
      core.setFailed(
        '`flutter-version` must be a specific SHA1 git hash or be ommitted for the master channel.'
      );

      return;
    }

    await installer.getFlutter(version, channel, platforms);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
