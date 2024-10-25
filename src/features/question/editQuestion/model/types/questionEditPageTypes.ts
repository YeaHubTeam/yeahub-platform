import * as yup from 'yup';

import { Question } from '@/entities/question';

import { questionEditSchema } from '../lib/validation/questionEditSchema';

export type QuestionEditFormValues = Question;
export type QuestionEditSchema = yup.InferType<typeof questionEditSchema>;
