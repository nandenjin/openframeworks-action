import { getInput, info } from '@actions/core'
import { downloadTool, extractZip, extractTar } from '@actions/tool-cache'
import { cp, mkdirP } from '@actions/io'
import { isLinux, isMacOS, isWindows } from '../util/platform'
import { createTmpDir } from '../util/actions'
import { join, resolve } from 'path'
import { readdir } from 'fs/promises'

export default async function main() {
  const OF_ROOT = getInput('root') || process.cwd()
  const OF_VERSION = getInput('version') || '0.12.0'

  let platform: string, ext: string

  if (isMacOS) {
    platform = 'osx'
    ext = 'zip'
  } else if (isWindows) {
    platform = 'vs'
    ext = 'zip'
  } else if (isLinux) {
    platform = 'linux64gcc6'
    ext = 'tar.gz'
  } else {
    throw new Error(`Unsupported platform`)
  }

  const downloadUrl = `https://github.com/openframeworks/openFrameworks/releases/download/${OF_VERSION}/of_v${OF_VERSION}_${platform}_release.${ext}`

  const zipPath = await downloadTool(downloadUrl)
  info(`Downloaded ${downloadUrl} to ${zipPath}`)

  const tmpDir = await createTmpDir('of-' + Date.now())
  console.log(`tmpDir: ${tmpDir}`)

  if (downloadUrl.endsWith('.zip')) {
    await extractZip(zipPath, tmpDir)
  } else if (downloadUrl.endsWith('.tar.gz')) {
    await extractTar(zipPath, tmpDir)
  } else {
    throw new Error(`Unsupported archive format`)
  }

  info(`Extracted ${zipPath} to ${tmpDir}`)

  await mkdirP(OF_ROOT)

  const extractedRoot = join(tmpDir, `of_v${OF_VERSION}_${platform}_release`)
  const files = await readdir(extractedRoot)
  for (const file of files) {
    await cp(join(extractedRoot, file), resolve(OF_ROOT, file), {
      recursive: true,
    })
  }
}
