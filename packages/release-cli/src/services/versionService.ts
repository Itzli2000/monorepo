import * as shell from 'shelljs';
import logger from '../utils/logger';

class VersionService {
  public updateVersion(releaseType: string): void {
    logger.info(`Actualizando versión con tipo: ${releaseType}`);
    const command = `yarn version --new-version ${releaseType} --no-git-tag-version`;
    if (shell.exec(command).code !== 0) {
      throw new Error('No se pudo actualizar la versión.');
    }
  }
}

export default new VersionService();
