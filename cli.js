#!/usr/bin/env node
'use strict'
const chalk = require('chalk')
const log = console.log
const args = process.argv
const word = args[2]
const ora = require('ora')
const rae = require('rae')
const translate = require('google-translate-api')

const usage = () => {
  log(chalk.green.underline.bold('Usage'))
  log('  $ mean-of {palabra}')
}

log('\n' + chalk.blue.underline.bold('mean-of') + ' : get meaning of spanish word')

if (word) {
  const client = rae.create()
  const spinner = ora(`Fetching RAE information`).start()
  client.search(word).then((match) => {
    spinner.stop()
    let mean = ''
    for (let i = 0; i < match.items.length - 1; i++) {
      mean = mean + match.items[i].match + '\n'
    }
    const spinner2 = ora(`Translating`).start()
    translate(mean, { to: 'en', from: 'es' }).then((result) => {
      spinner2.stop()
      log(chalk.green(result.text))
    }).catch((error) => {
      spinner2.stop()
      log(chalk.red(chalk`{bold Error} ${error}`))
    })
  }).catch((error) => {
    spinner.stop()
    log(chalk.red(chalk`{bold Error} ${error}`))
  })
} else {
  usage()
}
