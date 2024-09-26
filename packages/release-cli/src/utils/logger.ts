import chalk from 'chalk';

class Logger {
  public info(message: string): void {
    console.log(chalk.blue('INFO:'), message);
  }

  public success(message: string): void {
    console.log(chalk.green('SUCCESS:'), message);
  }

  public error(message: string, error?: string): void {
    console.error(chalk.red('ERROR:'), message);
    if (error) {
      console.error(chalk.red(error));
    }
  }
}

export default new Logger();
