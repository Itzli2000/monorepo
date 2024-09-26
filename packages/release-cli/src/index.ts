#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import releaseCommand from './commands/releaseCommand';

yargs(hideBin(process.argv))
  .scriptName('release-cli')
  .usage('$0 <command> [options]')
  .command(releaseCommand)
  .demandCommand(1, 'Necesitas especificar un comando.')
  .help()
  .alias('help', 'h')
  .parse();
