import * as shell from 'shelljs';
import logger from '../utils/logger';

class ChangelogService {
  public generateChangelog(releaseType: string): void {
    logger.info('Generando changelog...');
    const command = `npx generate-changelog ${releaseType} -x other,build,ci,chore,refactor,revert`;
    if (shell.exec(command).code !== 0) {
      throw new Error('No se pudo generar el changelog.');
    }
  }
}

export default new ChangelogService();
