export type LearnQuestionResponse = boolean;

export interface LearnQuestionParams {
	profileId: string | number;
	questionId: string | number;
	isLearned: boolean;
}
