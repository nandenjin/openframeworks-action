import { mkdirP } from '@actions/io'
import { join, resolve } from 'path'

export const createTmpDir = async (name: string) => {
  const runnerTemp = process.env.RUNNER_TEMP
  if (!runnerTemp) {
    throw new Error('RUNNER_TEMP not set')
  }

  const tmpDir = join(runnerTemp, name)
  await mkdirP(tmpDir)

  return resolve(tmpDir)
}
