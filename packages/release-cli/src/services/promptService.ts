import inquirer from 'inquirer';
import { IQuestion, QuestionsAnswers, ReleaseArgs } from '../types/types';

class PromptService {
  public async promptReleaseType(predefinedType?: string): Promise<string> {
    const releaseTypeChoices = ['patch', 'minor', 'major'];
    if (predefinedType && releaseTypeChoices.includes(predefinedType)) {
      return predefinedType;
    }
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'releaseType',
        message: 'Selecciona el tipo de release:',
        choices: releaseTypeChoices,
        default: 'patch',
      },
    ]);
    return answer.releaseType;
  }

  public async promptIssueId(predefinedIssueId?: string): Promise<string> {
    if (predefinedIssueId) {
      return predefinedIssueId;
    }
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'issueId',
        message: 'Ingresa el ID del issue (tarea de Jira):',
        validate: (input: string) =>
          input ? true : 'El ID del issue es requerido.',
      },
    ]);
    return answer.issueId;
  }

  public async promptCommitDetails(args: ReleaseArgs): Promise<{
    scope?: string;
    title?: string;
    body?: string;
    trailers?: string;
  }> {
    const questions: IQuestion = [];

    if (!args.scope) {
      questions.push({
        type: 'input',
        name: 'scope',
        message: 'Ingresa el scope del commit (opcional):',
      });
    }

    if (!args.title) {
      questions.push({
        type: 'input',
        name: 'title',
        message: 'Ingresa el título del commit (máximo 50 caracteres):',
        validate: (input: string) =>
          input.length > 0 && input.length <= 50
            ? true
            : 'El título debe tener entre 1 y 50 caracteres.',
      });
    }

    if (!args.body || !args.trailers) {
      questions.push(
        {
          type: 'confirm',
          name: 'addBody',
          message: '¿Quieres agregar un cuerpo al commit?',
          default: false,
        },
        {
          type: 'input',
          name: 'body',
          message: 'Ingresa el cuerpo del commit:',
          when: (answers) => answers.addBody,
        },
        {
          type: 'confirm',
          name: 'addTrailers',
          message: '¿Quieres agregar trailers al commit?',
          default: false,
        },
        {
          type: 'input',
          name: 'trailers',
          message: 'Ingresa los trailers del commit (formato clave: valor):',
          when: (answers) => answers.addTrailers,
          validate: (input: string) => {
            const regex = /^[a-zA-Z-]+:\s.+$/;
            return regex.test(input)
              ? true
              : 'Los trailers deben tener el formato "clave: valor".';
          },
        }
      );
    }

    const answers = await inquirer.prompt<QuestionsAnswers>(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      questions as any
    );
    return {
      scope: args.scope || answers.scope,
      title: args.title || answers.title,
      body: args.body || answers.body,
      trailers: args.trailers || answers.trailers,
    };
  }

  public async promptPushDirect(predefinedPush?: boolean): Promise<boolean> {
    if (typeof predefinedPush === 'boolean') {
      return predefinedPush;
    }
    const answer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'pushDirect',
        message: '¿Quieres hacer push directo de la nueva rama?',
        default: false,
      },
    ]);
    return answer.pushDirect;
  }
}

export default new PromptService();
