import { getInput, info } from '@actions/core'
import { exec } from '@actions/exec'
import { basename, resolve } from 'path'
import { isWindows } from '../util/platform'

export default async function main() {
  const OF_ROOT = resolve(process.cwd(), getInput('ofRoot', { required: true }))
  const PROJECT_ROOT = resolve(
    OF_ROOT,
    getInput('projectRoot', { required: true })
  )

  info(`Building project at ${PROJECT_ROOT}`)

  if (isWindows) {
    const solutionPath = resolve(PROJECT_ROOT, basename(PROJECT_ROOT) + '.sln')
    await exec(
      'msbuild',
      [solutionPath, '/p:configuration=release', '/p:platform=x64'],
      {
        cwd: PROJECT_ROOT,
      }
    )
  } else {
    await exec('make', [], { cwd: PROJECT_ROOT })
  }
}
