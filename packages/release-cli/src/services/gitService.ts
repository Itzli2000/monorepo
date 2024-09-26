import * as shell from 'shelljs';
import { exit } from 'process';
import logger from '../utils/logger';

class GitService {
  public checkGitInstalled(): void {
    if (!shell.which('git')) {
      logger.error('Error: Git no está instalado o no está en el PATH.');
      exit(1);
    }
  }

  public isWorkingDirectoryClean(): boolean {
    const status = shell.exec('git status --porcelain', { silent: true }).stdout.trim();
    return status === '';
  }

  public ensureCleanWorkingDirectory(): void {
    if (!this.isWorkingDirectoryClean()) {
      logger.error('Por favor, commitea o stash tus cambios antes de continuar.');
      exit(1);
    }
  }

  public createBranch(branchName: string): void {
    logger.info(`Creando nueva rama: ${branchName}`);
    if (shell.exec(`git checkout -b ${branchName}`).code !== 0) {
      throw new Error('No se pudo crear la nueva rama.');
    }
  }

  public commitChanges(commitMessage: string): void {
    logger.info('Creando commit...');
    if (shell.exec(`git commit -m "${commitMessage}"`).code !== 0) {
      throw new Error('No se pudo crear el commit.');
    }
  }

  public pushBranch(branchName: string): void {
    logger.info(`Haciendo push de la rama ${branchName} al remoto...`);
    if (shell.exec(`git push origin ${branchName}`).code !== 0) {
      throw new Error('No se pudo hacer push de la rama al remoto.');
    }
  }

  public checkoutMainAndUpdate(): void {
    logger.info('Cambiando a la rama main...');
    if (shell.exec('git checkout main').code !== 0) {
      throw new Error('No se pudo cambiar a la rama main.');
    }
    logger.info('Actualizando la rama main...');
    if (shell.exec('git pull origin main').code !== 0) {
      throw new Error('No se pudo actualizar la rama main.');
    }
  }

  public getCurrentBranch(): string {
    return shell.exec('git branch --show-current', { silent: true }).stdout.trim();
  }

  public fetchOrigin(): void {
    shell.exec('git fetch origin');
  }
}

export default new GitService();
