import { getInput, setFailed } from '@actions/core'
import setupOF from './commands/setup-of'

const command = getInput('command', { required: true })

switch (command) {
  case 'setup-of':
    setupOF()
    break
  default:
    setFailed(`Unknown command: ${command}`)
    break
}
