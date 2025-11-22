import { resolve } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import z from 'zod';
import { manifestSchema, versionsSchema, versionSchema } from './schema';
import type { Manifest, MinAppVersion, Version } from './schema';

async function main() {
  const manifest = await readManifest();
  const targetVersion = await z.parseAsync(versionSchema, process.env.npm_package_version ?? '0.1.0');
  const { minAppVersion } = manifest;

  await updateManifestVersion(manifest, targetVersion as MinAppVersion);
  await updateVersions(minAppVersion, targetVersion);
}

async function readManifest(): Promise<Manifest> {
  const readManifestFile = await readFile(resolve(__dirname, '../manifest.json'), 'utf8');
  return await z.parseAsync(manifestSchema, JSON.parse(readManifestFile));
}

async function updateManifestVersion(manifest: Manifest, minAppVersion: MinAppVersion): Promise<void> {
  const newManifest: Manifest = { ...manifest, minAppVersion };
  await writeFile(resolve(__dirname, '../manifest.json'), JSON.stringify(newManifest, null, 2));
}

async function updateVersions(minAppVersion: MinAppVersion, targetVersion: Version): Promise<void> {
  const readVersionsFile = await readFile(resolve(__dirname, '../versions.json'), 'utf8');
  const versions = await z.parseAsync(versionsSchema, JSON.parse(readVersionsFile));

  if (Object.values(versions).includes(minAppVersion)) {
    return;
  }

  const newVersions = { ...versions, [`${targetVersion}`]: minAppVersion };
  await writeFile(resolve(__dirname, '../versions.json'), JSON.stringify(newVersions, null, 2));
}

main().then().catch().finally();
