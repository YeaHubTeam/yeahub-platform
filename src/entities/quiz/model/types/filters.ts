import { QuestionModeType } from '@/entities/quiz';

export interface CreateQuizFilterParams {
	skills?: number[];
	specialization?: number;
	complexity?: number[];
	count?: number;
	mode?: QuestionModeType;
}
