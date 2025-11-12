import { TopStat } from '@/entities/question';

export interface DifficultQuestionsPageState {
	selectedSpecialization?: number;
}

export type DifficultQuestionTableRow = Omit<TopStat, 'questionId'> & {
	id: number;
	rowId: number;
};
