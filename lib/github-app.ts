import { createAppAuth } from '@octokit/auth-app';
import { Octokit } from '@octokit/rest';

let cached: { octokit: Octokit; expiresAt: number } | null = null;

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/**
 * Private keys are stored in env with literal \n escapes (PEM files can't
 * hold real newlines in most .env / dashboard env-var inputs).
 */
function normalizePrivateKey(key: string): string {
  return key.includes('\\n') ? key.replace(/\\n/g, '\n') : key;
}

export async function getInstallationOctokit(): Promise<Octokit> {
  if (cached && cached.expiresAt > Date.now() + 60_000) {
    return cached.octokit;
  }

  const appId = requiredEnv('GITHUB_APP_ID');
  const privateKey = normalizePrivateKey(requiredEnv('GITHUB_APP_PRIVATE_KEY'));
  const installationId = requiredEnv('GITHUB_APP_INSTALLATION_ID');

  const auth = createAppAuth({ appId, privateKey, installationId });
  const { token, expiresAt } = await auth({ type: 'installation' });

  const octokit = new Octokit({ auth: token });
  cached = { octokit, expiresAt: new Date(expiresAt).getTime() };
  return octokit;
}

export function getRepoTarget(): { owner: string; repo: string } {
  return {
    owner: requiredEnv('GITHUB_REPO_OWNER'),
    repo: requiredEnv('GITHUB_REPO_NAME'),
  };
}
