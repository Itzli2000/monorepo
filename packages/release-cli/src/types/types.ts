import type { CustomQuestion } from "inquirer/dist/cjs/types/types";

export interface ReleaseArgs {
  type?: string;
  issueId?: string;
  scope?: string;
  title?: string;
  body?: string;
  trailers?: string;
  push?: boolean;
  help?: boolean;
}

export interface QuestionsAnswers {
  scope?: string;
  title?: string;
  body?: string;
  trailers?: string;
  addBody?: boolean;
  addTrailers?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IQuestion = CustomQuestion<QuestionsAnswers, Record<string, any>>[]
