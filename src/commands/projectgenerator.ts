import { debug, getInput } from '@actions/core'
import { isLinux, isMacOS, isWindows } from '../util/platform'
import { join, resolve } from 'path'
import { exec } from '@actions/exec'

export default async function main() {
  const OF_ROOT = resolve(process.cwd(), getInput('ofRoot', { required: true }))
  const PROJECT_GENERATOR_DIR = resolve(
    OF_ROOT,
    getInput('projectGeneratorDir') || 'projectGenerator'
  )
  const PROJECT_ROOT = resolve(
    process.cwd(),
    getInput('projectRoot', { required: true })
  )

  debug(`OF_ROOT: ${OF_ROOT}`)
  debug(`PROJECT_GENERATOR_DIR: ${PROJECT_GENERATOR_DIR}`)
  debug(`PROJECT_ROOT: ${PROJECT_ROOT}`)

  await exec(
    getExecutable(PROJECT_GENERATOR_DIR),
    getArgs(OF_ROOT, PROJECT_ROOT)
  )
}

function getExecutable(pgDirPath: string) {
  if (isWindows) {
    return join(pgDirPath, 'projectGenerator.exe')
  } else if (isMacOS) {
    return join(
      pgDirPath,
      'projectGenerator.app/Contents/Resources/app/app/projectGenerator'
    )
  } else if (isLinux) {
    return join(pgDirPath, 'projectGenerator')
  }
  throw new Error('Unsupported platform')
}

function getArgs(ofRoot: string, projectRoot: string) {
  if (isWindows) {
    return [`/ofPath=` + ofRoot, '/verbose', projectRoot]
  } else {
    return [`--ofPath=` + ofRoot, '--verbose', projectRoot]
  }
}
