import { getInput, setFailed } from '@actions/core'
import setupOF from './commands/setup-of'
import projectGenerator from './commands/projectgenerator'

const command = getInput('command', { required: true })

switch (command) {
  case 'setup-of':
    setupOF()
    break
  case 'projectgenerator':
    projectGenerator()
    break
  default:
    setFailed(`Unknown command: ${command}`)
    break
}
