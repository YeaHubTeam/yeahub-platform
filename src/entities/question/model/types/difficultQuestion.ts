import { TopStat } from './question';

export type DifficultQuestionTableRow = Omit<TopStat, 'questionId'> & {
	id: number;
	rowId: number;
};
