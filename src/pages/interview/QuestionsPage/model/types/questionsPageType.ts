import { QuestionFilterStatus } from '@/widgets/Question';

export interface QuestionsPageState {
	page?: number;
	title?: string;
	skills?: number[];
	rate?: number[];
	complexity?: number[];
	status: QuestionFilterStatus;
}
