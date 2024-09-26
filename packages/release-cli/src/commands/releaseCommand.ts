import { CommandModule } from 'yargs';
import * as shell from 'shelljs';
import GitService from '../services/gitService';
import VersionService from '../services/versionService';
import ChangelogService from '../services/changelogService';
import PromptService from '../services/promptService';
import logger from '../utils/logger';
import { ReleaseArgs } from '../types/types';

const releaseCommand: CommandModule<object, ReleaseArgs> = {
  command: 'release',
  describe: 'Gestiona el proceso de release en proyectos de Node.js',
  builder: (yargs) => {
    return yargs
      .option('type', {
        alias: 't',
        type: 'string',
        description: 'Tipo de release (patch, minor, major)',
        choices: ['patch', 'minor', 'major'],
      })
      .option('issueId', {
        alias: 'i',
        type: 'string',
        description: 'ID del issue (tarea de Jira)',
      })
      .option('scope', {
        alias: 's',
        type: 'string',
        description: 'Scope del commit',
      })
      .option('title', {
        alias: 'T',
        type: 'string',
        description: 'Título del commit (máximo 50 caracteres)',
      })
      .option('body', {
        alias: 'b',
        type: 'string',
        description: 'Cuerpo del commit',
      })
      .option('trailers', {
        alias: 'r',
        type: 'string',
        description: 'Trailers del commit (formato "clave: valor")',
      })
      .option('push', {
        alias: 'p',
        type: 'boolean',
        description: 'Hacer push directo de la nueva rama',
      })
      .help('help')
      .alias('help', 'h');
  },
  handler: async (argv) => {
    try {
      GitService.checkGitInstalled();

      GitService.ensureCleanWorkingDirectory();

      const releaseType = await PromptService.promptReleaseType(argv.type);

      const issueId = await PromptService.promptIssueId(argv.issueId);

      const commitDetails = await PromptService.promptCommitDetails(argv);

      const pushDirect = await PromptService.promptPushDirect(argv.push);

      const branchName = `release/${releaseType}-${issueId}`;
      GitService.createBranch(branchName);

      VersionService.updateVersion(releaseType, issueId);

      ChangelogService.generateChangelog();

      logger.info('Agregando archivos al commit...');
      if (shell.exec('git add CHANGELOG.md package.json package-lock.json').code !== 0) {
        throw new Error('No se pudieron agregar los archivos al commit.');
      }

      let commitMessage = '';
      if (commitDetails.scope) {
        commitMessage += `(${commitDetails.scope}) `;
      }
      commitMessage += commitDetails.title;

      if (commitDetails.body) {
        commitMessage += `\n\n${commitDetails.body}`;
      }

      if (commitDetails.trailers) {
        commitMessage += `\n\n${commitDetails.trailers}`;
      }

      GitService.commitChanges(commitMessage);

      if (pushDirect) {
        GitService.pushBranch(branchName);
        logger.success(`Rama ${branchName} ha sido creada y push directamente.`);
      } else {
        logger.info(`Rama ${branchName} ha sido creada. Recuerda hacer push cuando estés listo.`);
      }

      logger.success('Proceso de release completado exitosamente.');
    } catch (error: unknown) {
      logger.error('Ocurrió un error durante el proceso de release:', (error as Error).message);
      process.exit(1);
    }
  },
};

export default releaseCommand;
