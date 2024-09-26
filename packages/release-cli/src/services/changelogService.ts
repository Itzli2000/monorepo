import * as shell from 'shelljs';
import logger from '../utils/logger';

class ChangelogService {
  public generateChangelog(): void {
    logger.info('Generando changelog...');
    const command = `npx conventional-changelog -p angular -i CHANGELOG.md -s`;
    if (shell.exec(command).code !== 0) {
      throw new Error('No se pudo generar el changelog.');
    }
  }
}

export default new ChangelogService();
