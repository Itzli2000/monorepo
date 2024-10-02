import kleur from 'kleur';

class Logger {
  public info(message: string): void {
    console.log(kleur.blue('\nINFO:'), message);
  }

  public success(message: string): void {
    console.log(kleur.green('\nSUCCESS:'), message);
  }

  public error(message: string, error?: string): void {
    console.error(kleur.red('\nERROR:'), message);
    if (error) {
      console.error(kleur.red(error));
    }
  }
}

export default new Logger();