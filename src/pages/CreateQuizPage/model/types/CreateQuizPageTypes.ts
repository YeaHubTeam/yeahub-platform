import { QuestionModeType } from '@/entities/quiz';

export interface CreateQuizPageState {
	profileId?: string;
	skills?: number[];
	complexity?: number[];
	limit?: number;
	mode?: QuestionModeType;
}
