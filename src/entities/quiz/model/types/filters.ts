import { QuestionModeType } from './quiz';

export interface CreateQuizFilterParams {
	skills?: number[];
	specialization?: number;
	complexity?: number[];
	count?: number;
	mode?: QuestionModeType;
}
