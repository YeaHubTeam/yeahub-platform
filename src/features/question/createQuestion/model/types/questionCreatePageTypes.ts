import * as yup from 'yup';

import { Skill } from '@/entities/skill';
import { Specialization } from '@/entities/specialization';

import { questionCreateSchema } from '../lib/validation/questionCreateSchema';

export interface QuestionCreateFormValues {
	title: string;
	description: string;
	rate: number;
	complexity: number;
	status?: string;
	questionSpecializations?: Specialization[];
	questionSkills?: Skill[];
	keywords?: string[];
	shortAnswer?: string;
	longAnswer?: string;
}

export type QuestionCreateSchema = yup.InferType<typeof questionCreateSchema>;
