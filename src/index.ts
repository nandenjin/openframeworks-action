import { getInput, setFailed } from '@actions/core'
import setupOF from './commands/setup-of'
import projectGenerator from './commands/projectgenerator'
import build from './commands/build'

const command = getInput('command', { required: true })

switch (command) {
  case 'setup-of':
    setupOF()
    break
  case 'projectgenerator':
    projectGenerator()
    break
  case 'build':
    build()
    break
  default:
    setFailed(`Unknown command: ${command}`)
    break
}
