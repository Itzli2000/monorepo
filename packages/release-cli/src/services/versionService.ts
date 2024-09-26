import * as shell from 'shelljs';
import logger from '../utils/logger';

class VersionService {
  public updateVersion(releaseType: string, issueId: string): void {
    logger.info(`Actualizando versión con tipo: ${releaseType}`);
    const command = `npm version ${releaseType} -m "chore(release): %s [${issueId}]"`;
    if (shell.exec(command).code !== 0) {
      throw new Error('No se pudo actualizar la versión.');
    }
  }
}

export default new VersionService();
