import { QuestionFilterStatus } from '@/widgets/question/QuestionsFilterPanel';

export interface QuestionsPageState {
	page?: number;
	title?: string;
	skills?: number[];
	rate?: number[];
	complexity?: number[];
	status: QuestionFilterStatus;
}
