import kleur from 'kleur';

class Logger {
  public info(message: string): void {
    console.log(kleur.blue('INFO:'), message);
  }

  public success(message: string): void {
    console.log(kleur.green('SUCCESS:'), message);
  }

  public error(message: string, error?: string): void {
    console.error(kleur.red('ERROR:'), message);
    if (error) {
      console.error(kleur.red(error));
    }
  }
}

export default new Logger();