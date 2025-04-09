import { QuestionModeType } from '@/entities/quiz';

export interface CreatePublicQuizPageState {
	skills?: number[];
	complexity?: number[];
	limit?: number;
	mode?: QuestionModeType;
}
